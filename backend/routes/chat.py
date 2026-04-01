from fastapi import APIRouter, HTTPException
from services.ai import perguntar_ia
from schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat",  )

# Endpoint POST para receber a mensagem do usuário e retornar a resposta da IA
@router.post("/",response_model=ChatResponse)
def chat(req: ChatRequest):
    # Validação mensagem vazia (extra, já que Pydantic já garante min_length)
    if not req.mensagem.strip():
        raise HTTPException(
            status_code=400,
            detail="A mensagem não pode estar vazia."
        )

    try:
        resposta = perguntar_ia(req.mensagem)

        # Validação resposta vazia (caso a IA não retorne nada)
        if not resposta:
            raise HTTPException(
                status_code=500,
                detail="A IA não retornou resposta."
            )

        return ChatResponse(resposta=resposta)

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno no servidor: {str(e)}"
        )