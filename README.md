# MascotLab MCP

Generate your app's mascot from Claude Code, Cursor, or any other MCP client,
and have the files land in your repository.

MascotLab is a hosted [Model Context Protocol](https://modelcontextprotocol.io)
server. You describe a character once, and every later image is generated
against that locked design rather than from the description again, so the
mascot on your empty state and the mascot on your error page are the same
character.

- Endpoint: `https://mascotlab.io/mcp`
- Site: [mascotlab.io](https://mascotlab.io)

No API key. The first request answers with a sign-in challenge, your client
opens a browser, and you approve the connection there.

---

## Claude Code

Two commands. The first registers the server at user scope so it is available
in every project; the second opens a browser to authorise it.

```bash
claude mcp add --transport http --scope user mascotlab https://mascotlab.io/mcp
```

```bash
claude mcp login mascotlab
```

Run both from a terminal. The login step opens a browser window, and the
desktop app's MCP panel is a different surface that does not carry the flow
through.

## Cursor

Save [`configs/cursor.json`](configs/cursor.json) as `~/.cursor/mcp.json` to
use MascotLab in every project, or as `.cursor/mcp.json` inside one project.

```json
{
  "mcpServers": {
    "mascotlab": {
      "url": "https://mascotlab.io/mcp"
    }
  }
}
```

Then open Cursor Settings, then MCP. The `mascotlab` row shows **Needs login**.
Click it, approve in the browser, and the row turns green.

## Any other MCP client

Any client that speaks Streamable HTTP can connect. Give it the endpoint:

```
https://mascotlab.io/mcp
```

Clients that register themselves need nothing else.

---

## Asking for artwork

Ask in plain language. The agent picks the tools; you do not need to name
them.

```
Create a mascot for this app: a cheerful robot barista. Then a coffee cup
prop and a pose holding it, and save the images to assets/mascot/.
```

More examples in [`examples/prompts.md`](examples/prompts.md).

### Describe the character, not the change

The one piece of prompt advice that actually matters, and the least obvious.

A mascot's description becomes its identity: it is sent again, unchanged, as
the character description on every pose and animation generated from it. A
mascot described as *"a blue version of the other one"* carries no appearance
in words at all, so every later image has only the reference picture to work
from, and drifts.

Describe what the character looks like, even when what you want is a variant.

### Generations are asynchronous

Every `create_*` tool returns a `generation_id` immediately rather than
blocking. Images take roughly 10 to 40 seconds, animations one to three
minutes, so the agent polls `check_generation` until it settles. A tool call
that held the connection open for two minutes would time out in most clients.

---

## Tools

| Tool | What it does |
| --- | --- |
| `get_account` | Credit balance, subscription state, per-generation cost |
| `list_projects` | Your projects and which one is active |
| `select_project` | Switch the active project |
| `create_project` | New project, made active |
| `get_board` | Everything in a project, with the ids other tools take |
| `create_mascot` | A new character, optionally built on an existing one |
| `create_prop` | A standalone object the mascot can hold |
| `create_pose` | The mascot performing an action, with up to two characters |
| `create_animation` | A short silent MP4, optionally looping |
| `check_generation` | Poll a generation to completion |
| `download_artifact` | A short-lived download URL for a finished artifact |

## Notes

- Artwork you generate is yours, including commercially. Exports are free and
  unwatermarked.
- Nothing is charged for a generation that fails.
- Animations need an active subscription; images run on credits.
- Everything also appears on your board at
  [mascotlab.io](https://mascotlab.io).

## Guides

- [Generating mascots in Claude Code](https://mascotlab.io/mascot-generator-for-claude-code)
- [Keeping a character consistent across images](https://mascotlab.io/consistent-ai-characters)
- [How to describe a mascot](https://mascotlab.io/how-to-describe-a-mascot)
- [Animating a mascot for your UI](https://mascotlab.io/mascot-animation-for-apps)
- [Commercial use and licensing](https://mascotlab.io/ai-mascot-commercial-use)

## License

The contents of this repository are MIT licensed. It holds configuration and
documentation, not the service itself.
