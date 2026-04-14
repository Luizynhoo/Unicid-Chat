from pydantic import BaseModel, Field

# O que o frontend envia
class ChatRequest(BaseModel):
    mensagem: str = Field(..., min_length=1, example="Quantos minutos tem um dia?")

# O que o frontend recebe
class ChatResponse(BaseModel):
    resposta: str = Field(..., example="Um dia tem 1440 minutos.")  


