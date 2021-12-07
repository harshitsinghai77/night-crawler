import psycopg2

DATABASE_URL = f"postgresql://nemo:password@localhost:5432/nemo"

# Connect to your postgres DB
conn = psycopg2.connect(DATABASE_URL)

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a query
cur.execute("SELECT * FROM weapon")

records = cur.fetchall()
# for row in records:
#     print(row)
for deptno, dname in records:
    print("dname: ", dname)
    print("deptno: ", deptno)

cur.close()
conn.close()
