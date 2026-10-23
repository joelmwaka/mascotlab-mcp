#!/usr/bin/env node
// Runs the hosted MascotLab MCP server as a local stdio server.
//
// MascotLab lives at https://mascotlab.io/mcp and speaks Streamable HTTP with
// OAuth. Clients that understand remote servers connect to it directly, and
// should: see configs/ for those. This command exists for the rest, the
// clients that can only start a local process and talk to it over stdio. It
// bridges that process to the hosted server, carrying the OAuth sign-in
// through a browser window the first time, and forwards everything else
// unchanged. Nothing is generated locally; the server is the hosted one.
//
// Any extra arguments are passed on to the bridge, so its own flags (for
// example --auth-timeout, or --device-code for a machine with no browser)
// work here too.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const ENDPOINT = "https://mascotlab.io/mcp";

const require = createRequire(import.meta.url);
const proxy = require.resolve("mcp-remote/dist/proxy.js");

const child = spawn(
  process.execPath,
  [proxy, ENDPOINT, "--transport", "http-only", ...process.argv.slice(2)],
  { stdio: "inherit" },
);

// Signals from the client reach the bridge, so a client that stops also
// stops the process it started.
for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
child.on("error", (error) => {
  console.error(`mascotlab-mcp: could not start the bridge: ${error.message}`);
  process.exit(1);
});
