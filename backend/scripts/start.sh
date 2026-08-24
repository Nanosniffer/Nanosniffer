#!/bin/bash
set -e

echo "❖ Starting AI-Powered Criminal Network Analysis System Backend..."

# Activate virtualenv if present
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Run database seed script if database doesn't exist
if [ ! -f "criminal_intel.db" ]; then
    echo "  → Seeding database with initial syndicates, agents, cases, and alerts..."
    python scripts/seed_data.py
fi

# Start FastAPI server via Uvicorn
echo "  → Launching Uvicorn server on http://0.0.0.0:8000..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
