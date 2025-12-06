import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Serverless-optimized configuration for AWS Lambda
// - max: 1 connection per Lambda instance to avoid exhausting DB connections
// - idle_timeout: Close idle connections quickly to free up resources
// - max_lifetime: Rotate connections to avoid stale connections
// - connect_timeout: Fail fast if DB is unreachable
export const client = postgres(connectionString, {
  prepare: false,
  max: 2, // 2 connections per Lambda instance
  idle_timeout: 20, // Close idle connections after 20 seconds
  max_lifetime: 60 * 30, // Rotate connections every 30 minutes
  connect_timeout: 10, // Timeout after 10 seconds if can't connect
});

export const db = drizzle(client, { schema });