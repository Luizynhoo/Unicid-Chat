from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router
from routes.auth import router as auth_router
from routes.agendamento import router as agendamento_router

app = FastAPI()


app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(agendamento_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
