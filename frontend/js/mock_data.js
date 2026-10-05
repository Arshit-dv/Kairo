/**
 * Kairo Frontend — Mock Datasets & Offline Demo Engine (Phases 1, 2, & 3)
 */

const DEFAULT_PROFILE = {
  user_id: "usr_alex_chen",
  full_name: "Alex Chen",
  headline: "Full-Stack AI & Machine Learning Engineer",
  email: "alex.chen@example.com",
  phone: "+1 (555) 489-3210",
  location: "San Francisco, CA (Open to Remote)",
  summary: "AI Engineer with 3+ years building high-throughput ML pipelines, LLM-powered RAG systems, and distributed backend services in Python and TypeScript. Proven track record deploying production AI systems with sub-100ms latency and rigorous evaluation suites.",
  github_username: "github.com/alexchen-ai",
  portfolio_url: "https://alexchen.dev",
  kaggle_profile: {
    username: "alexchen_ml",
    tier: "Kaggle Master",
    rank: 412,
    total_notebooks: 34,
    total_datasets: 6,
    total_competitions: 8,
    total_upvotes: 520,
    featured_notebooks: [
      { title: "Hybrid RAG with Dense Vector Embeddings", upvotes: 142, medal: "Gold", tags: ["NLP", "RAG", "Vector Search"] },
      { title: "Fraud Anomaly Detection with GNNs", upvotes: 98, medal: "Silver", tags: ["Tabular", "LightGBM", "PyTorch"] },
      { title: "Optimizing pgvector HNSW Indexing", upvotes: 64, medal: "Bronze", tags: ["PostgreSQL", "pgvector"] }
    ],
    competitions: [
      { name: "IEEE-CIS Fraud Detection Benchmark", rank: "Top 4% (Silver Medal)", tier_medal: "Silver" },
      { name: "Feedback Prize - Evaluating Student Writing", rank: "Top 8% (Bronze Medal)", tier_medal: "Bronze" }
    ]
  },
  leetcode_profile: {
    username: "alexchen_dev",
    ranking: 8420,
    rating: 2145,
    tier_badge: "Guardian (Top 1.2%)",
    total_solved: 520,
    easy_solved: 160,
    medium_solved: 280,
    hard_solved: 80,
    top_topics: [
      { topic: "Dynamic Programming", solved: 78 },
      { topic: "Graph Algorithms & Trees", solved: 94 },
      { topic: "Heaps & Tries", solved: 86 }
    ]
  },
  codeforces_profile: {
    handle: "alexchen",
    current_rating: 1840,
    max_rating: 1912,
    rank: "Candidate Master",
    contests_participated: 38
  },
  huggingface_profile: {
    username: "alexchen-ai",
    models_count: 2,
    total_downloads: 24500,
    featured_models: [
      { model_id: "alexchen-ai/bge-reranker-hybrid-financial", downloads: 18200, likes: 210, type: "Reranker / Cross-Encoder" },
      { model_id: "alexchen-ai/rag-guardrail-llama3-8b", downloads: 6300, likes: 85, type: "LLM Guardrail" }
    ]
  },
  verified_certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      credential_id: "AWS-SAA-83921049",
      date: "Nov 2024",
      skills: ["AWS", "Cloud Architecture", "Docker", "PostgreSQL"]
    },
    {
      name: "DeepLearning.AI Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      credential_id: "DLAI-TF-991204",
      date: "Aug 2024",
      skills: ["PyTorch", "TensorFlow", "Neural Networks", "NLP"]
    }
  ],
  skills: [
    { name: "Python", category: "Programming Languages", level: "Expert", years_experience: 4.0, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/rag-research-assistant"] },
    { name: "FastAPI", category: "Frameworks & AI/ML", level: "Advanced", years_experience: 3.0, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/kairo-api"] },
    { name: "PyTorch", category: "Frameworks & AI/ML", level: "Advanced", years_experience: 2.5, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/neural-reranker"] },
    { name: "RAG", category: "Frameworks & AI/ML", level: "Advanced", years_experience: 2.0, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/rag-research-assistant"] },
    { name: "PostgreSQL", category: "Tools & Cloud Infra", level: "Advanced", years_experience: 3.0, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/fraud-detection-engine"] },
    { name: "pgvector", category: "Tools & Cloud Infra", level: "Intermediate", years_experience: 1.5, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/rag-research-assistant"] },
    { name: "Docker", category: "Tools & Cloud Infra", level: "Advanced", years_experience: 2.5, evidence_status: "VERIFIED", evidence_sources: ["AWS Certified Solutions Architect"] },
    { name: "TypeScript", category: "Programming Languages", level: "Advanced", years_experience: 2.5, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/portfolio-v2"] },
    { name: "Next.js", category: "Frameworks & AI/ML", level: "Advanced", years_experience: 2.0, evidence_status: "VERIFIED", evidence_sources: ["github.com/alexchen-ai/portfolio-v2"] },
    { name: "AWS", category: "Tools & Cloud Infra", level: "Advanced", years_experience: 2.0, evidence_status: "VERIFIED", evidence_sources: ["AWS Certified Solutions Architect (AWS-SAA-83921049)"] },
    { name: "System Design", category: "Core Competencies", level: "Advanced", years_experience: 2.5, evidence_status: "SUPPORTED", evidence_sources: ["Work Experience at Lumina AI"] },
    { name: "LightGBM", category: "Machine Learning & Data Science", level: "Advanced", years_experience: 2.0, evidence_status: "VERIFIED", evidence_sources: ["Kaggle Master Notebooks"] },
    { name: "Data Structures & Algorithms", category: "Core Computer Science", level: "Expert", years_experience: 3.5, evidence_status: "VERIFIED", evidence_sources: ["LeetCode Guardian (Rating: 2,145 • 520 Solved)", "Codeforces Candidate Master"] },
    { name: "Model Fine-Tuning & Evaluation", category: "Machine Learning & AI", level: "Expert", years_experience: 2.5, evidence_status: "VERIFIED", evidence_sources: ["Hugging Face @alexchen-ai (24,500 downloads)"] }
  ],
  projects: [
    {
      id: "proj_rag_assistant",
      title: "RAG Research Assistant",
      summary: "Autonomous research copilot with hybrid BM25 + dense embedding vector retrieval over 500k+ research papers.",
      skills_used: ["Python", "FastAPI", "PyTorch", "RAG", "pgvector", "PostgreSQL"],
      bullets: [
        "Architected a scalable RAG engine querying 500,000+ technical papers with sub-180ms p95 latency.",
        "Implemented hybrid dense-sparse reranking improving answer retrieval precision (NDCG@10) by 34%.",
        "Integrated hallucination guardrails and automated citation verification with 99.2% grounding accuracy."
      ],
      github_url: "https://github.com/alexchen-ai/rag-research-assistant",
      evidence_status: "VERIFIED",
      evidence_sources: ["github.com/alexchen-ai/rag-research-assistant (42 commits, 180 stars)"],
      metrics: ["34% NDCG@10 gain", "180ms p95 latency", "99.2% grounding accuracy"]
    },
    {
      id: "proj_fraud_engine",
      title: "Real-Time Fraud Detection Engine",
      summary: "Streaming anomaly detection and graph-based fraud scoring processing 12k events/sec.",
      skills_used: ["Python", "FastAPI", "PostgreSQL", "Docker", "LightGBM"],
      bullets: [
        "Engineered real-time anomaly detection pipeline handling 12,000 requests/sec with Kafka and FastAPI.",
        "Trained LightGBM and Graph Neural Network models achieving 96.4% AUC-ROC on synthetic financial transactions.",
        "Containerized microservices using Docker Compose with automated integration tests in GitHub Actions."
      ],
      github_url: "https://github.com/alexchen-ai/fraud-detection-engine",
      evidence_status: "VERIFIED",
      evidence_sources: ["github.com/alexchen-ai/fraud-detection-engine (58 commits)"],
      metrics: ["12k req/sec", "96.4% AUC-ROC"]
    },
    {
      id: "proj_portfolio",
      title: "Modern Developer Portfolio & Interactive Sandbox",
      summary: "Next.js 14 interactive showcase with dynamic dark mode, 3D Canvas visualizers, and blog system.",
      skills_used: ["TypeScript", "Next.js", "React", "TailwindCSS"],
      bullets: [
        "Built responsive developer portfolio utilizing Next.js App Router and Server Components with 100/100 Lighthouse performance score.",
        "Implemented interactive AI model token visualizer and live API benchmark playground."
      ],
      github_url: "https://github.com/alexchen-ai/portfolio-v2",
      evidence_status: "VERIFIED",
      evidence_sources: ["github.com/alexchen-ai/portfolio-v2"],
      metrics: ["100/100 Lighthouse score"]
    }
  ],
  experience: [
    {
      company: "Lumina AI",
      role: "Machine Learning Engineer",
      start_date: "Jan 2024",
      end_date: "Present",
      location: "San Francisco, CA",
      highlights: [
        "Designed and deployed enterprise RAG pipeline serving 40k daily active users with 99.9% uptime.",
        "Reduced vector embedding latency by 45% through batch vectorization and pgvector HNSW index tuning.",
        "Collaborated with product designers and frontend teams to ship automated career insights dashboard."
      ],
      technologies: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "pgvector", "Docker"],
      evidence_status: "SUPPORTED"
    },
    {
      company: "DataPulse Labs",
      role: "Software Engineer Intern",
      start_date: "Jun 2023",
      end_date: "Dec 2023",
      location: "Remote",
      highlights: [
        "Developed ETL data ingestion microservices processing 2.5TB weekly analytics data into PostgreSQL.",
        "Authored automated unit and regression test suites increasing CI coverage from 62% to 89%."
      ],
      technologies: ["Python", "PostgreSQL", "FastAPI", "Docker", "Git"],
      evidence_status: "SUPPORTED"
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S.",
      field_of_study: "Computer Science & Data Science",
      grad_year: "2024",
      gpa: "3.85 / 4.0",
      highlights: ["Dean's Honor List", "President of AI & Robotics Student Association"]
    }
  ]
};

const SAMPLE_JDS = [
  {
    id: "jd_mle",
    title: "Machine Learning Engineer - Retrieval & AI Systems",
    company: "Nexus AI Labs",
    location: "San Francisco, CA / Remote",
    raw_text: `Nexus AI Labs is seeking a Machine Learning Engineer to scale our next-generation retrieval and LLM intelligence infrastructure.

Key Responsibilities:
• Architect, benchmark, and deploy low-latency RAG pipelines and dense vector retrieval systems.
• Develop production microservices using Python, FastAPI, and PostgreSQL / pgvector.
• Build evaluation suites and guardrails to measure hallucination, grounding, and answer quality.
• Collaborate with cross-functional engineering teams to optimize inference performance.

Qualifications & Requirements:
• 2+ years of production experience in Python, PyTorch, and machine learning systems.
• Strong background in vector search, RAG architectures, and database modeling with PostgreSQL.
• Experience containerizing microservices with Docker and managing CI/CD pipelines.
• Excellent communication skills and a passion for evidence-backed AI development.

Preferred Qualifications:
• Experience with TypeScript / React / Next.js for building internal developer tools.
• Familiarity with AWS cloud deployment and scalable vector search indices (HNSW).`
  },
  {
    id: "jd_fullstack",
    title: "Full Stack AI Applications Engineer",
    company: "Veloce Financial Technologies",
    location: "New York, NY / Remote",
    raw_text: `Veloce Financial is looking for a versatile Full Stack AI Engineer to build intuitive web interfaces and real-time fraud detection tooling.

Key Responsibilities:
• Build modern, high-performance web applications using TypeScript, React, and Next.js.
• Develop robust backend APIs in Python and FastAPI interacting with PostgreSQL databases.
• Integrate machine learning anomaly detection models into real-time user-facing dashboards.
• Implement clean UI/UX with responsive design and interactive data visualizers.

Requirements:
• Strong proficiency in TypeScript, React, Next.js, and modern CSS.
• Solid understanding of Python, REST APIs, and SQL databases.
• Experience working with Docker and Git in agile team workflows.

Preferred:
• Familiarity with machine learning concepts and fraud prevention pipelines.
• Knowledge of AWS infrastructure and serverless deployments.`
  }
];
