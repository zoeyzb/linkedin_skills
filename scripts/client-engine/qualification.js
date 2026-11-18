const SCORE_WEIGHTS = Object.freeze({
  need: 300,
  service_fit: 250,
  authority: 150,
  timing: 150,
  reachability: 100,
  capacity: 50
});

const NON_BUYING_SIGNALS = new Set(["", "none", "unknown", "profile_only", "role_only", "generic_profile", "company_exists", "funding", "growth"]);
const BUYING_SIGNALS = new Set([
  "explicit_request",
  "hiring_need",
  "launch",
  "expansion",
  "website_gap",
  "integration_need",
  "agency_overflow",
  "other"
]);
const STRONG_SIGNAL_STRENGTHS = new Set(["explicit", "strong"]);
const VALID_CONTACT_PATHS = new Set(["connection_request_note", "first_degree_dm", "open_profile_dm", "inmail"]);

function validHttpsUrl(value) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch (_) {
    return false;
  }
}

function validLinkedInProfileUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return /(^|\.)linkedin\.com$/i.test(url.hostname) && /^\/in\/[^/]+\/?$/i.test(url.pathname);
  } catch (_) {
    return false;
  }
}

function validLinkedInEvidenceUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && /(^|\.)linkedin\.com$/i.test(url.hostname);
  } catch (_) {
    return false;
  }
}

function parseDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return null;
  const date = new Date(String(value) + "T00:00:00.000Z");
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== String(value)) return null;
  return date;
}

function evaluateLead(lead, options = {}) {
  const now = options.now ? new Date(options.now) : new Date();
  const maxSignalAgeDays = Number.isInteger(options.maxSignalAgeDays) ? options.maxSignalAgeDays : 30;
  const threshold = Number.isInteger(options.threshold) ? options.threshold : 800;
  const input = lead || {};
  const supplied = input.score_breakdown || {};
  const scoreBreakdown = {};

  for (const [key, max] of Object.entries(SCORE_WEIGHTS)) {
    const value = supplied[key] === undefined || supplied[key] === null || supplied[key] === "" ? 0 : Number(supplied[key]);
    if (!Number.isInteger(value) || value < 0 || value > max) {
      throw new RangeError(`score_breakdown.${key} must be an integer from 0 to ${max}`);
    }
    scoreBreakdown[key] = value;
  }

  const score = Object.values(scoreBreakdown).reduce((sum, value) => sum + value, 0);
  const suppliedEvidence = input.score_evidence && typeof input.score_evidence === "object" ? input.score_evidence : {};
  const scoreEvidence = {};
  const reasons = [];
  const signalType = String(input.signal_type || "").trim().toLowerCase();
  const signalStrength = String(input.signal_strength || "weak").trim().toLowerCase();
  const contactPath = String(input.contact_path || "unavailable").trim().toLowerCase();

  if (input.hard_disqualifier === true) {
    return {
      score,
      score_breakdown: scoreBreakdown,
      score_evidence: suppliedEvidence,
      qualification_status: "rejected",
      reasons: ["hard disqualifier recorded"]
    };
  }

  for (const [key, points] of Object.entries(scoreBreakdown)) {
    const evidence = String(suppliedEvidence[key] || "").trim();
    scoreEvidence[key] = evidence;
    if (points > 0 && evidence.length < 12) {
      reasons.push(`score evidence for ${key} is missing or too vague`);
    }
  }

  if (!validLinkedInProfileUrl(input.linkedin_url)) {
    reasons.push("valid LinkedIn person profile URL is missing");
  }
  if (!validHttpsUrl(input.source_url)) {
    reasons.push("source evidence URL is missing or invalid");
  } else if (!validLinkedInEvidenceUrl(input.source_url)) {
    reasons.push("source evidence must be a LinkedIn URL");
  }
  if (String(input.evidence_status || "").toLowerCase() !== "verified") {
    reasons.push("evidence is not marked verified");
  }
  if (String(input.signal_summary || "").trim().length < 20) {
    reasons.push("specific evidence summary is missing");
  }
  if (!BUYING_SIGNALS.has(signalType) || NON_BUYING_SIGNALS.has(signalType)) {
    reasons.push("a concrete buying signal is not established");
  }
  if (!STRONG_SIGNAL_STRENGTHS.has(signalStrength)) {
    reasons.push("buying-signal strength is not strong enough");
  }
  if (signalType === "hiring_need" && input.external_support_signal !== true) {
    reasons.push("hiring activity does not prove external development support is needed");
  }
  if (!VALID_CONTACT_PATHS.has(contactPath)) {
    reasons.push("a verified LinkedIn contact path is unavailable");
  }
  if (scoreBreakdown.need < 180) {
    reasons.push("need evidence score is below the minimum 180 points");
  }
  if (scoreBreakdown.service_fit < 150) {
    reasons.push("service-fit evidence score is below the minimum 150 points");
  }
  if (scoreBreakdown.reachability < 25) {
    reasons.push("LinkedIn reachability score is below the minimum 25 points");
  }

  const signalDate = parseDate(input.signal_date);
  if (!signalDate) {
    reasons.push("buying-signal date is missing or invalid");
  } else {
    const ageDays = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - signalDate.getTime()) / 86400000);
    if (ageDays < -1) reasons.push("buying-signal date is in the future");
    if (ageDays > maxSignalAgeDays) reasons.push(`buying signal is stale (older than ${maxSignalAgeDays} days)`);
  }

  if (score < threshold) {
    reasons.push(`score ${score} is below the ${threshold} qualification threshold`);
  }

  return {
    score,
    score_breakdown: scoreBreakdown,
    score_evidence: scoreEvidence,
    qualification_status: reasons.length ? "needs_review" : "qualified",
    reasons
  };
}

module.exports = {
  SCORE_WEIGHTS,
  BUYING_SIGNALS,
  evaluateLead,
  validHttpsUrl,
  validLinkedInProfileUrl,
  validLinkedInEvidenceUrl
};
