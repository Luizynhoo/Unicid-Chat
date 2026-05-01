# Importa o roteador do FastAPI para organizar as rotas
# HTTPException serve para tratar erros HTTP (ex: 404, 400, etc.)
from fastapi import APIRouter, HTTPException

# Importa o schema que define o formato dos dados de agendamento
from schemas.agendamento import AgendamentoSchema

# Importa o serviço responsável pela lógica de negócio dos agendamentos
from services import agendamento as agendamento_service

# Serviço de IA (não está sendo usado neste arquivo, mas foi importado)
from services.ai import perguntar_ia

# Importa schemas relacionados ao chat (também não utilizados aqui)
from schemas.chat import ChatRequest, ChatResponse


# Cria um roteador específico para agrupar rotas de agendamento
router = APIRouter(
    tags=["Agendamento"]  # Define uma tag para organização na documentação (Swagger)
)


# =========================
# ROTA: CRIAR AGENDAMENTO
# =========================
@router.post("/agendamentos")
def criar(data: AgendamentoSchema):
    """
    Cria um novo agendamento.

    Parâmetros:
    - data: objeto do tipo AgendamentoSchema contendo os dados do agendamento

    Retorno:
    - Resultado da criação do agendamento (geralmente o objeto criado ou mensagem)
    """
    return agendamento_service.criar_agendamento(data)


# =========================
# ROTA: LISTAR AGENDAMENTOS
# =========================
@router.get("/agendamentos")
def listar():
    """
    Lista todos os agendamentos cadastrados.

    Retorno:
    - Lista de agendamentos
    """
    return agendamento_service.listar_agendamentos()


# =========================
# ROTA: ATUALIZAR AGENDAMENTO
# =========================
@router.put("/agendamentos/{id}")
def atualizar(id: int, data: AgendamentoSchema):
    """
    Atualiza um agendamento existente.

    Parâmetros:
    - id: identificador do agendamento
    - data: novos dados do agendamento

    Retorno:
    - Resultado da atualização
    """
    return agendamento_service.atualizar_agendamento(id, data)


# =========================
# ROTA: DELETAR AGENDAMENTO
# =========================
@router.delete("/agendamentos/{id}")
def deletar(id: int):
    """
    Remove um agendamento pelo ID.

    Parâmetros:
    - id: identificador do agendamento

    Retorno:
    - Mensagem de confirmação
    """
    agendamento_service.deletar_agendamento(id)
    return {"msg": "Deletado"}