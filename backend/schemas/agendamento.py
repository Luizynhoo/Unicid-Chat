from pydantic import BaseModel

# Estrutura dos agendamentos


class AgendamentoSchema(BaseModel):
    nome: str
    rgm: str
    data: str
    hora: str
