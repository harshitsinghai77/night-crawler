# import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from nemo.router.route import query_route
from nemo.config.database import close_db_connection

app = FastAPI(title="Hello World")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
def shutdown():
    """Disconnect to database on shutdown."""
    print("Shutting down connection")
    close_db_connection()


app.include_router(query_route, prefix="/query")
