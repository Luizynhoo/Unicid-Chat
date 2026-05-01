# Importa a classe principal do FastAPI
from fastapi import FastAPI

# Middleware para permitir comunicação entre front-end e back-end
from fastapi.middleware.cors import CORSMiddleware


# Importa os roteadores de cada módulo do sistema
from routes.chat import router as chat_router
from routes.auth import router as auth_router
from routes.agendamento import router as agendamento_router
from routes.metricas import router as metricas_router
from routes.pdf import router as pdf_router


# =========================
# CRIAÇÃO DA APLICAÇÃO
# =========================
app = FastAPI()


# =========================
# REGISTRO DAS ROTAS
# =========================
# Cada router representa um conjunto de endpoints organizados por funcionalidade

app.include_router(metricas_router)     # Rotas de métricas
app.include_router(chat_router)         # Rotas de chat com IA
app.include_router(auth_router)         # Rotas de autenticação
app.include_router(agendamento_router)  # Rotas de agendamento
app.include_router(pdf_router)          # Rotas de manipulação de PDFs


# =========================
# CONFIGURAÇÃO DE CORS
# =========================
# Permite que o front-end (ex: React) acesse a API

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Permite qualquer origem (liberado geral)
    allow_credentials=True,
    allow_methods=["*"],        # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"]         # Permite todos os headers
)