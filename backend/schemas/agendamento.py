# Importa o BaseModel do Pydantic para criação de schemas (modelos de dados)
# field_validator é usado para validar campos específicos
from pydantic import BaseModel, field_validator

# Importa o tipo time para trabalhar com horários
from datetime import time


# =========================
# SCHEMA: AGENDAMENTO
# =========================
class AgendamentoSchema(BaseModel):
    """
    Define a estrutura e validação dos dados de um agendamento.

    Campos:
    - nome: nome do usuário
    - rgm: identificador do aluno
    - data: data do agendamento (string)
    - hora: horário do agendamento (string no formato HH:MM)
    """

    nome: str
    rgm: str
    data: str
    hora: str


    # =========================
    # VALIDAÇÃO PERSONALIZADA
    # =========================
    @field_validator("hora")
    @classmethod
    def validar_horario(cls, value):
        """
        Valida o campo 'hora'.

        Regras:
        - Deve estar no formato HH:MM
        - Deve estar entre 08:00 e 20:00

        Retorno:
        - Retorna o valor se estiver válido
        - Lança erro se inválido
        """

        try:
            # Separa hora e minuto e converte para inteiro
            h, m = map(int, value.split(":"))

            # Cria um objeto time para facilitar a comparação
            horario = time(h, m)

        except:
            # Caso o formato seja inválido (ex: "abc", "25:99", etc.)
            raise ValueError("Hora inválida")

        # Verifica se está dentro do horário permitido
        if horario < time(8, 0) or horario > time(20, 0):
            raise ValueError("Agendamentos só podem ser feitos entre 08:00 e 20:00")

        # Retorna o valor validado
        return value