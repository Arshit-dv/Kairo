# Kairo App (Public Surface)

The public-facing full-stack product for the **Kairo Career Intelligence Engine** (Phases 1 & 2).

## Structure
- `frontend/`: Interactive Claymorphism + Glassmorphism UI dashboard:
  - Career Profile Hub
  - **Career Knowledge Graph Visualizer** (Phase 2)
  - JD Matcher & Project Ranker
  - Tailored Resume Studio
  - ATS Diagnostics Breakdown
  - **Growth Velocity & Upskilling Roadmap** (Phase 2)
- `api/`: FastAPI backend with `/profile` (with Kaggle sync & graph), `/jobs`, `/resume`, and `/growth` REST routes.
- `integrations/`: Parsers and external profile connectors.

## Quickstart
```bash
# Run backend API & Static UI
python api/main.py
```
Or open `frontend/index.html` directly in any web browser for offline demo mode.
