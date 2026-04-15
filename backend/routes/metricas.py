from fastapi import APIRouter
from services import metricas as metricas_services

router = APIRouter(prefix="/metricas", tags=["metricas"])


@router.post("/")
def post_metricas():
    return metricas_services.criar_conversa()


@router.post("/feedback")
def post_feedback(ajudou: bool):
    return metricas_services.registrar_feedback(ajudou)


@router.get("/")
def get_metricas():
    return metricas_services.obter_metricas()