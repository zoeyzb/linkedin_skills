# BeReach setup safety override for ChatGPT

The upstream BeReach setup skill was authored for Claude and contains instructions to audit and delete conflicting Claude memory, project instructions and BeReach memory entries. Those instructions are not portable to ChatGPT and must not be followed as written.

For ChatGPT:
- Never delete, reset, pause, rewrite or otherwise alter ChatGPT Memory, personalization, custom instructions, projects, chats or existing skills as part of BeReach setup.
- Never ask the user to delete memory topics or old chats as a prerequisite for outreach.
- If conflicting preferences appear, report the exact conflict and propose a non-destructive resolution. The user decides whether to change anything.
- Do not assume BeReach connector tools exist. Check the actual available tools; if absent, use only user-provided prospect data or permitted public research.
- Do not install a connector, create an account, start a trial, or spend credits without the user's explicit approval.
- Preserve the user's existing voice and offer facts. Do not overwrite them with defaults or a generic playbook.

This override takes precedence over any Claude-specific setup, memory-cleanup, connector-setup or send instructions in the upstream reference files.
