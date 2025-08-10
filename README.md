# capstone-backend

Notes
- Removed temporary `/health/db` diagnostics route.
- Kept SSL database configuration update (Neon): prefers `DATABASE_URL`, supports `PG_*` with `PG_SSL=true`.