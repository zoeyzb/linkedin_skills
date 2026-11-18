# Claude setup: sources

Read 2026-10-29. Anthropic pages first.

## Anthropic: skills

- Agent Skills overview. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview. Frontmatter rules, progressive disclosure (about 100 tokens metadata, body under 5k), surfaces, sharing scope, security.
- Skill authoring best practices. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices. Concise, third-person descriptions, under 500 lines, references one level deep, evaluations first, fully qualified MCP tool names.
- Create custom skills (claude.com docs). https://claude.com/docs/skills/how-to. Folder name must match `name`; ZIP with the folder at top level; description up to 1,024; Customize > Skills; skill-creator to measure.
- Use skills in Claude (help center). https://support.claude.com/en/articles/12512180-using-skills-in-claude. Settings > Capabilities code execution switch; Customize > Skills > "+" > Create skill > Upload a skill; plans; sync to Claude Code v2.1.273+.
- Creating custom skills (help center). https://support.claude.com/en/articles/12512198-creating-custom-skills. Description up to 200 characters (conflicts with the 1,024 spec); skills cannot reference each other.
- Skills in Claude Code. https://code.claude.com/docs/en/skills. `~/.claude/skills/`, `.claude/skills/`, precedence, live reload, 1,536-character listing cut, skills vs CLAUDE.md.
- Engineering blog, "Equipping agents for the real world with Agent Skills". https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills. Background on the design.

## Anthropic: memory, instructions, projects, artifacts

- Manage memory (help center). https://support.claude.com/en/articles/11817273. Topics, toggles, Pause, Reset (irreversible, includes project memories), per-project memory, incognito, deleting chats does not delete memories.
- Understanding Claude's personalization features. https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features. Instructions for Claude (all chats), project instructions, skills.
- Create and manage projects. https://support.claude.com/en/articles/9519177. Knowledge vs instructions, five projects on Free, retrieval mode, own memory.
- Artifacts. https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them. Sidebar Artifacts section, private by default, sharing, plans.
- Claude Code memory. https://code.claude.com/docs/en/memory. Contradictions picked arbitrarily, under 200 lines, adherence drops with length, auto memory location and 200 lines / 25KB load, `/memory`, `/doctor prompt-audit`.
- Effective context engineering for AI agents. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. Context rot, attention budget, smallest high-signal set, no laundry lists.

## Anthropic: connectors

- Custom connectors using remote MCP. https://support.claude.com/en/articles/11175166. Customize > Connectors > Add custom connector; Team/Enterprise owner flow; Free limited to one; per-chat toggle; Allow always.
- Claude Code MCP. https://code.claude.com/docs/en/mcp. `claude mcp add --transport http <name> <url>`, scopes, `/mcp` sign-in.

## Studies

- Distyl AI, "How Many Instructions Can LLMs Follow at Once?" (IFScale), arXiv 2507.11538, NeurIPS 2025. https://arxiv.org/abs/2507.11538. 68% at 500 instructions for the best models; bias toward earlier instructions.
- "ConInstruct: Evaluating Large Language Models on Conflict Detection and Resolution in Instructions", AAAI 2026, arXiv 2511.14342. https://arxiv.org/abs/2511.14342. Models rarely tell users about conflicts.
- Hong, Troynikov, Huber, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", Chroma, 2025. https://research.trychroma.com/context-rot. Reliability falls with input length; similar distractors hurt more.

## BeReach

- `https://bereach.ai/llms.txt`: every client's setup steps, read by the agent given the one line `set up bereach - https://bereach.ai/llms.txt`; no BeReach page gives them itself.
- The connector's memory tools: `bereach_memory_list`, `bereach_memory_save` (types user-profile, offering, playbook; `remove: true` deletes).
