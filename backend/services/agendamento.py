agendamentos = []


def criar_agendamento(data):
    novo = data.model_dump()
    novo["id"] = len(agendamentos) + 1

    agendamentos.append(novo)

    return novo


def listar_agendamentos():
    return agendamentos


def atualizar_agendamento(id, data):
    for item in agendamentos:
        if item["id"] == id:
            item.update(data.dict())
            return item

    return None


def deletar_agendamento(id):
    for i, item in enumerate(agendamentos):
        if item["id"] == id:
            agendamentos.pop(i)
            return True

    return False
