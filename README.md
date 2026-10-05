# Kairo App (Public Surface)

The public-facing full-stack product for the **Kairo Career Intelligence Engine**.

## Structure
- `frontend/`: Interactive Claymorphism + Glassmorphism UI dashboard (Career Profile, JD Matcher, Tailored Resume Studio, ATS Diagnostics, Growth Velocity).
- `api/`: FastAPI backend with `/profile`, `/jobs`, `/resume`, `/growth` REST routes.
- `integrations/`: Parsers and external profile connectors.

## Quickstart
```bash
# Run backend API & Static UI
python api/main.py
```
Or open `frontend/index.html` directly in any web browser for offline demo mode.
