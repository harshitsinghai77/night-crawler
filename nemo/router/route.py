from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor

from nemo.config.database import conn
from nemo.schemas.query import Query1, Query2, Query3, Query4, Query5
from nemo.dbms.query import query_1, query_2, query_3, query_4, query_5

query_route = APIRouter()


@query_route.post("/query1")
def get_query_1(query: Query1):
    area_code = query.area_code
    if not area_code:
        raise HTTPException(status_code=400, detail="No area_code found.")
    query = query_1(area_code)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records


@query_route.post("/query2")
def get_query_2(query: Query2):
    bureau = query.bureau
    bureau = str(tuple(bureau))
    if not bureau:
        raise HTTPException(status_code=400, detail="No bureau found.")
    query = query_2(bureau)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records


@query_route.post("/query3")
def get_query_3(query: Query3):
    ethnicity = query.ethnicity
    crime_codes = str(tuple(query.crime_codes))
    if not (ethnicity and crime_codes):
        raise HTTPException(
            status_code=400, detail="No ethnicity or crime_codes found."
        )
    query = query_3(ethnicity, crime_codes)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records


@query_route.post("/query4")
def get_query_4(query: Query4):
    age_range = query.age_range
    year = query.year
    if not (age_range and year):
        raise HTTPException(status_code=400, detail="No query found.")
    query = query_4(age_range, year)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records


@query_route.post("/query5")
def get_query_5(query: Query5):
    year_range = query.year_range
    if not year_range:
        raise HTTPException(status_code=400, detail="No query found.")
    query = query_5(year_range)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records


@query_route.get("/get-incident-rows")
def get_incident_table_rows_count():
    query = "SELECT COUNT(*) from incidents"
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            records = cursor.fetchone()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Query {e}")
    if not records:
        raise HTTPException(status_code=400, detail="No records found.")
    return records
