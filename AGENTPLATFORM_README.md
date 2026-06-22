# AgentOS — Enterprise AI Agent Platform

> Production-grade multi-agent orchestration for engineering teams.
> Version 3.0 · MIT License · 48k GitHub stars

---

## What is AgentOS?

AgentOS is an open-source framework for building, deploying, and governing fleets of AI agents in production. It handles routing, memory, tool execution, observability, and cost control — so your team can focus on agent logic, not plumbing.

**One-line install:** `pip install agentos`

---

## Architecture

AgentOS follows a three-layer architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        CONTROL PLANE                        │
│   ┌─────────────┐   ┌──────────────┐   ┌────────────────┐  │
│   │  Scheduler  │   │  Router      │   │  Policy Engine │  │
│   │  (priority  │   │  (intent →   │   │  (rate limits, │  │
│   │   queues)   │   │   agent map) │   │   cost caps)   │  │
│   └─────────────┘   └──────────────┘   └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                        AGENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ CodeAgent│  │DataAgent │  │VoiceAgent│  │SearchAgent│  │
│  │  (write, │  │ (query,  │  │ (STT/TTS │  │(web,docs,│   │
│  │  review) │  │  model)  │  │  ,call)  │  │  vector) │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                       MEMORY & TOOLS                        │
│   ┌──────────────┐   ┌─────────────┐   ┌───────────────┐   │
│   │ Short-term   │   │  Long-term  │   │  Tool Registry│   │
│   │ (Redis, 1h)  │   │  (Postgres  │   │  (500+ tools, │   │
│   │              │   │  + pgvector)│   │   sandboxed)  │   │
│   └──────────────┘   └─────────────┘   └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key architectural decisions:**
- Stateless agent pods — horizontal scaling with no sticky sessions
- Memory is external — swap Redis/Postgres for any compatible store
- Tool execution runs in isolated sandboxes (gVisor) for security

---

## Agent Execution Flow

Every task goes through a 6-step pipeline:

```
User / API Request
       │
       ▼
  1. INTAKE
  Parse intent, validate auth, assign task ID
       │
       ▼
  2. ROUTE
  Router matches intent → best-fit agent type
  (uses embedding similarity + capability manifest)
       │
       ▼
  3. CONTEXT LOAD
  Fetch short-term memory (Redis) + relevant long-term chunks (pgvector)
  Inject tool manifest, user preferences, org policies
       │
       ▼
  4. EXECUTE
  Agent calls LLM with full context window
  LLM emits tool calls → Tool Registry executes in sandbox
  Loop until done or max_steps reached
       │
       ▼
  5. PERSIST
  Write outcome to long-term memory
  Emit structured log → Observability pipeline
       │
       ▼
  6. RESPOND
  Return result to caller
  Update cost ledger, trigger any downstream webhooks
```

**Typical latency breakdown:**
- Intake + Route: 12ms
- Context Load: 45ms
- First LLM call: 800ms
- Tool execution (avg 2 calls): 300ms
- Persist + Respond: 20ms
- **Total p50: 1.2s · p99: 4.1s**

---

## Timeline: AgentOS Roadmap

### ✅ v1.0 — January 2024 — Foundation
- Single-agent execution engine
- 50 built-in tools (web search, code run, file I/O)
- Basic Redis memory
- REST API + Python SDK

### ✅ v2.0 — August 2024 — Multi-Agent
- Agent-to-agent messaging (pub/sub)
- Parallel agent fan-out with result aggregation
- LangGraph integration
- Cost tracking per task

### ✅ v3.0 — March 2025 — Enterprise
- Control Plane with policy engine
- gVisor sandboxed tool execution
- SOC2 Type II compliant audit logs
- SSO / RBAC / org-level cost caps
- 99.95% SLA

### 🔄 v3.5 — Q3 2025 — Intelligence
- Adaptive routing (learns from task outcomes)
- Cross-agent shared memory pools
- Agent-authored tool registration

### 🔮 v4.0 — Q1 2026 — Autonomy
- Self-healing agents (detect + recover from failures)
- Budget-aware planning (agent chooses cheapest path to goal)
- Federated deployment (run across cloud + on-prem)

---

## Comparison: AgentOS vs Alternatives

| Feature | AgentOS | LangChain | CrewAI | AutoGen |
|---|---|---|---|---|
| Multi-agent orchestration | ✅ Native | ⚠️ Via LangGraph | ✅ Native | ✅ Native |
| Production memory (persistent) | ✅ pgvector | ❌ DIY | ❌ DIY | ❌ DIY |
| Sandboxed tool execution | ✅ gVisor | ❌ No | ❌ No | ⚠️ Docker |
| Cost tracking per task | ✅ Built-in | ❌ DIY | ❌ DIY | ❌ DIY |
| SOC2 / audit logs | ✅ v3.0+ | ❌ No | ❌ No | ❌ No |
| Horizontal scaling | ✅ Stateless | ⚠️ Complex | ❌ Limited | ⚠️ Complex |
| Open source | ✅ MIT | ✅ MIT | ✅ MIT | ✅ MIT |
| Managed cloud | ✅ AgentOS Cloud | ✅ LangSmith | ❌ No | ❌ No |

---

## Key Numbers

- **500+** tools in registry
- **48k** GitHub stars
- **1.2s** median task latency (p50)
- **99.95%** uptime SLA (v3.0+)
- **$0.003** average cost per task at scale
- **10M+** tasks executed per month on AgentOS Cloud

---

## Who uses AgentOS?

- **Stripe** — automated dispute resolution (80% handled without human)
- **Notion** — AI writing assistant backend (12M users)
- **GitHub** — Copilot Workspace orchestration layer
- **Moderna** — clinical trial data extraction pipelines

---

## Getting Started

```bash
pip install agentos
agentos init my-project
cd my-project
agentos run --agent code --task "review this PR and flag security issues"
```

Full docs: https://docs.agentos.dev
