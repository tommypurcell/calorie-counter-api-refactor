import pg from 'pg'
const { Pool } = pg
import { DBURL } from './secrets.js'

// Database connection parameters
const db = new Pool({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: DBURL
})

export default db
