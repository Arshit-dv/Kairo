"""
Kairo App - Career Growth API Routes
"""
from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter(prefix="/growth", tags=["Growth"])

@router.get("/snapshots")
def get_career_snapshots():
    """Retrieve historical career snapshots to compare skill & evidence velocity over time."""
    return {
        "snapshots": [
            {
                "period": "January 2026",
                "verified_skills": 7,
                "github_repos": 7,
                "ml_projects": 1,
                "cp_problems": 180,
                "role_readiness_mle": 71
            },
            {
                "period": "October 2026",
                "verified_skills": 15,
                "github_repos": 18,
                "ml_projects": 5,
                "cp_problems": 520,
                "role_readiness_mle": 91
            }
        ],
        "top_role_trajectories": [
            {"role": "Machine Learning Engineer", "readiness": 91, "delta": "+20%"},
            {"role": "AI Engineer (RAG/Agents)", "readiness": 88, "delta": "+24%"},
            {"role": "Full Stack AI Engineer", "readiness": 84, "delta": "+12%"},
            {"role": "Data Engineer", "readiness": 76, "delta": "+8%"}
        ],
        "recommended_skill_upskills": [
            {"skill": "Docker & Container Orchestration", "gap_type": "Moderate", "recommendation": "Deploy a multi-container compose stack with automated health checks."},
            {"skill": "MLOps / Continuous Evaluation", "gap_type": "High Priority", "recommendation": "Integrate automated grounding benchmarks into GitHub Actions CI pipeline."}
        ]
    }
