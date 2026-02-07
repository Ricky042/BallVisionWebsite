from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database, auth

app = FastAPI()

# --- CORS for frontend dev ---
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(auth.router)

# --- Create tables ---
models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def root():
    return {"message": "Backend is running"}
