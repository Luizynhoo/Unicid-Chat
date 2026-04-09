from fastapi import APIRouter, HTTPException

router = APIRouter(prefix= "/metricas", tags= ["metricas"])


total_conversas = 0



def criar_conversa():
    global total_conversas
    total_conversas += 1

    return {"mensagem": "Conversa criada com sucesso"}


def obter_metricas():
    return {
        "total_conversas": total_conversas
    }



@router.post("/")
def post_metricas():
    return criar_conversa()

@router.get("/")
def get_metricas():
    return obter_metricas()
