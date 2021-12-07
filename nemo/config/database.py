import psycopg2

DATABASE_URL = f"postgresql://nemo:password@localhost:5432/nemo"

# Connect to your postgres DB
conn = psycopg2.connect(DATABASE_URL)


def close_db_connection():
    conn.close()
