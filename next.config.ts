import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable automatic generation of AGENTS.md and CLAUDE.md files
  // @ts-ignore
  agentRules: false,
};

export default nextConfig;
