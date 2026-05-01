# Importa exceções HTTP para tratamento de erros
from fastapi import HTTPException


# "Banco de dados" em memória (lista de agendamentos)
agendamentos = []

# Controle de ID incremental
next_id = 1


# =========================
# FUNÇÃO AUXILIAR
# =========================
def contar_por_horario(data, hora, ignorar_id=None):
    """
    Conta quantos agendamentos existem em um mesmo horário.

    Parâmetros:
    - data: data do agendamento
    - hora: horário do agendamento
    - ignorar_id: usado ao editar (ignora o próprio registro)

    Retorno:
    - Quantidade de agendamentos naquele horário
    """

    return sum(
        1 for a in agendamentos
        if a["data"] == data
        and a["hora"] == hora
        and a["id"] != ignorar_id
    )


# =========================
# CRIAR AGENDAMENTO
# =========================
def criar_agendamento(novo):
    """
    Cria um novo agendamento.

    Regras:
    - Máximo de 10 agendamentos por horário

    Parâmetros:
    - novo: objeto do tipo AgendamentoSchema

    Retorno:
    - Agendamento criado
    """

    global next_id

    # Conta quantos já existem nesse horário
    quantidade = contar_por_horario(novo.data, novo.hora)

    # Validação de limite
    if quantidade >= 10:
        raise HTTPException(
            status_code=400,
            detail="Limite de 10 agendamentos por horário atingido"
        )

    # Cria o objeto de agendamento
    agendamento = {
        "id": next_id,
        "nome": novo.nome,
        "rgm": novo.rgm,
        "data": novo.data,
        "hora": novo.hora
    }

    # Incrementa ID e salva
    next_id += 1
    agendamentos.append(agendamento)

    return agendamento


# =========================
# LISTAR AGENDAMENTOS
# =========================
def listar_agendamentos():
    """
    Retorna todos os agendamentos cadastrados.
    """
    return agendamentos


# =========================
# ATUALIZAR AGENDAMENTO
# =========================
def atualizar_agendamento(id, data):
    """
    Atualiza um agendamento existente.

    Regras:
    - Mantém o limite de 10 por horário (mesmo ao editar)

    Parâmetros:
    - id: identificador do agendamento
    - data: novos dados

    Retorno:
    - Agendamento atualizado
    """

    for item in agendamentos:
        if item["id"] == id:

            # 🔥 Validação importante ao editar
            quantidade = contar_por_horario(
                data.data,
                data.hora,
                ignorar_id=id
            )

            if quantidade >= 10:
                raise HTTPException(
                    status_code=400,
                    detail="Este horário já está lotado"
                )

            # Atualiza os dados
            item.update(data.dict())
            return item

    # Caso não encontre o ID
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")


# =========================
# DELETAR AGENDAMENTO
# =========================
def deletar_agendamento(id):
    """
    Remove um agendamento pelo ID.

    Parâmetros:
    - id: identificador do agendamento

    Retorno:
    - True se removido com sucesso
    """

    for i, item in enumerate(agendamentos):
        if item["id"] == id:
            agendamentos.pop(i)
            return True

    # Caso não encontre
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")