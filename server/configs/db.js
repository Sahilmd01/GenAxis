import { neon } from '@neondatabase/serverless';

class Database {
  constructor() {
    this.validateEnv();
    this.sql = neon(process.env.DATABASE_URL);
  }

  validateEnv() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    try {
      new URL(process.env.DATABASE_URL);
    } catch (error) {
      throw new Error('Invalid DATABASE_URL format');
    }
  }

  async healthCheck() {
    try {
      await this.sql`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error.message);
      return false;
    }
  }

  // Enhanced query method with error handling
  async query(text, params = []) {
    try {
      return await this.sql(text, params);
    } catch (error) {
      console.error('Database query error:', { text, params, error: error.message });
      throw new Error(`Database operation failed: ${error.message}`);
    }
  }
}

const db = new Database();
export default db;