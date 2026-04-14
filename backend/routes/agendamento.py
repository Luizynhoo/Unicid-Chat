from fastapi import APIRouter, HTTPException
from schemas.agendamento import AgendamentoSchema
from services import agendamento as agendamento_service
from services.ai import perguntar_ia
from schemas.chat import ChatRequest, ChatResponse

router = APIRouter(
    tags=["Agendamento"]
)


@router.post("/agendamentos")
def criar(data: AgendamentoSchema):
    return agendamento_service.criar_agendamento(data)


@router.get("/agendamentos")
def listar():
    return agendamento_service.listar_agendamentos()


@router.put("/agendamentos/{id}")
def atualizar(id: int, data: AgendamentoSchema):
    resultado = agendamento_service.atualizar_agendamento(id, data)

    if not resultado:
        raise HTTPException(status_code=404, detail="Não encontrado")

    return resultado


@router.delete("/agendamentos/{id}")
def deletar(id: int):
    resultado = agendamento_service.deletar_agendamento(id)

    if not resultado:
        raise HTTPException(status_code=404, detail="Não encontrado")

    return {"msg": "Deletado"}
