import { neon } from "@neondatabase/serverless";

let sql;

try {
  const { DATABASE_URL } = process.env;

  // Validate the environment variable
  if (!DATABASE_URL) {
    throw new Error(
      "❌ DATABASE_URL is missing. Please add it to your .env file."
    );
  }

  // Initialize the Neon SQL client
  sql = neon(DATABASE_URL);

  console.log("✅ Connected to Neon database successfully.");
} catch (error) {
  console.error("⚠️ Failed to connect to Neon database.");
  console.error("Reason:", error.message);
  // Optional: exit if DB connection is critical for the app
  process.exit(1);
}

export default sql;
