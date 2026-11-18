const DEFAULT_SEARCHES = [
  { id: "post-shopify-need", category: "Direct buying intent", surface: "content", query: '"looking for a Shopify developer"', purpose: "Find founders explicitly asking for Shopify development help." },
  { id: "post-shopify-recommend", category: "Direct buying intent", surface: "content", query: '"recommend a Shopify developer"', purpose: "Find public requests for developer recommendations." },
  { id: "post-web-dev-need", category: "Direct buying intent", surface: "content", query: '"need a web developer" OR "looking for a web developer"', purpose: "Find businesses actively seeking web development." },
  { id: "post-website-redesign", category: "Direct buying intent", surface: "content", query: '"looking for a website redesign" OR "need a website redesign"', purpose: "Find stated redesign projects." },
  { id: "post-development-partner", category: "Agency partnerships", surface: "content", query: '"looking for a development partner" OR "white label development"', purpose: "Find agencies seeking delivery partners or overflow capacity." },
  { id: "post-custom-dashboard", category: "Custom software", surface: "content", query: '"need a custom dashboard" OR "looking for a dashboard developer"', purpose: "Find explicit custom application and dashboard needs." },
  { id: "post-crm-integration", category: "Integrations", surface: "content", query: '"looking for CRM integration" OR "need to integrate CRM"', purpose: "Find businesses describing integration work." },
  { id: "post-app-development", category: "Custom software", surface: "content", query: '"looking for app development" OR "need a web application"', purpose: "Find companies seeking a web application." },
  { id: "post-agency-overflow", category: "Agency partnerships", surface: "content", query: '"overflow development work" OR "need freelance developers"', purpose: "Find agencies with capacity constraints." },
  { id: "post-ai-automation", category: "Automation", surface: "content", query: '"looking for AI automation" OR "need workflow automation"', purpose: "Find businesses explicitly seeking automation implementation." },
  { id: "post-custom-crm", category: "Custom software", surface: "content", query: '"looking for a custom CRM" OR "need an internal dashboard"', purpose: "Find stated internal-tool and CRM projects." },
  { id: "post-booking-system", category: "Business systems", surface: "content", query: '"need a booking system" OR "looking for booking integration"', purpose: "Find service businesses seeking booking and scheduling implementation." },
  { id: "post-api-integration", category: "Integrations", surface: "content", query: '"need API integration" OR "looking for integration developer"', purpose: "Find businesses with a stated integration requirement." },
  { id: "post-contract-developer", category: "Direct buying intent", surface: "content", query: '"looking for contract developer" OR "seeking freelance full stack developer"', purpose: "Find explicit contract development needs rather than internal hiring alone." },
  { id: "people-ecommerce-founders", category: "Buyer discovery", surface: "people", query: "Founder OR Owner ecommerce Shopify brand", purpose: "Find decision-makers at ecommerce businesses for deeper qualification." },
  { id: "people-agency-owners", category: "Buyer discovery", surface: "people", query: "Founder OR Owner digital agency web development", purpose: "Find agency owners who may need implementation partners." },
  { id: "people-saas-founders", category: "Buyer discovery", surface: "people", query: "Founder OR Co-Founder SaaS startup software", purpose: "Find startup decision-makers with potential custom software needs." },
  { id: "people-service-business-owners", category: "Buyer discovery", surface: "people", query: "Founder OR Owner professional services company", purpose: "Find established service-business decision-makers." },
  { id: "people-technology-leaders", category: "Buyer discovery", surface: "people", query: "CTO OR Head of Engineering startup digital product", purpose: "Find technical decision-makers where external delivery support may be relevant." }
];

function buildLinkedInSearches(profile = {}) {
  const customServices = Array.isArray(profile.serviceLines) ? profile.serviceLines.filter(Boolean) : [];
  const customRoles = Array.isArray(profile.targetRoles) ? profile.targetRoles.filter(Boolean) : [];
  const searches = DEFAULT_SEARCHES.map((item) => ({ ...item }));
  if (customServices.length) {
    const phrase = customServices.slice(0, 3).join(" OR ");
    searches.push({
      id: "custom-service-need",
      category: "Custom service search",
      surface: "content",
      query: `"looking for" (${phrase})`,
      purpose: "Find public LinkedIn requests that match the configured services."
    });
  }
  if (customRoles.length) {
    searches.push({
      id: "custom-buyer-roles",
      category: "Custom buyer search",
      surface: "people",
      query: customRoles.join(" OR "),
      purpose: "Find configured decision-maker roles."
    });
  }
  return searches.map((item) => {
    const path = item.surface === "people" ? "people" : "content";
    const url = new URL(`https://www.linkedin.com/search/results/${path}/`);
    url.searchParams.set("keywords", item.query);
    url.searchParams.set("origin", "GLOBAL_SEARCH_HEADER");
    return { ...item, url: url.toString() };
  });
}

module.exports = { buildLinkedInSearches, DEFAULT_SEARCHES };
