const pgp = require("pg-promise")();
require("dotenv").config();

const {
  DATABASE_URL,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
  PG_SSL,
} = process.env;

// https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
// Prefer DATABASE_URL when provided. Otherwise, fall back to discrete PG_* vars.
// Some managed Postgres providers (e.g., Neon) require TLS. Enable SSL when either
// using a URL (always) or when PG_SSL is truthy ("true"/"1").
const shouldUseManualSsl =
  String(PG_SSL || "").toLowerCase() === "true" || PG_SSL === "1";

const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
      ...(shouldUseManualSsl
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    };

// alt from express docs
// var db = pgp('postgres://username:password@host:port/database')

const db = pgp(cn);

module.exports = db;
