# LinkedIn Lead Exporter — ChatGPT Skill

A ChatGPT-ready adaptation of https://github.com/Mahitej28/LinkedIn_Bot.

- Skill name: linkedin-lead-exporter
- Primary use: turn supplied LinkedIn profile/search results and public professional research into a deduplicated, source-backed CSV/XLSX lead sheet.
- Upstream license: MIT (the original license is included).
- Reviewed upstream commit: 95d47ed1c81073f30129276777ac8393d23a6d04.

## Why this is an adaptation

The upstream repository contains a Python Selenium script that signs into LinkedIn, searches, paginates through profile results, visits profiles, and writes name/title/location/URL fields to CSV. It does not contain a SKILL.md or a ChatGPT integration.

This package converts the useful research-and-export concept into instructions that ChatGPT can use with its available search, browser, and file-generation capabilities. It does not run the original scraper, request LinkedIn credentials, crawl profiles in bulk, or send outreach.

See references/upstream-review.md for the implementation review and references/lead-export-template.csv for the blank export schema.
