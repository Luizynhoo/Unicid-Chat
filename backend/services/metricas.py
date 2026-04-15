total_conversas = 0
chat_ajudou = 0
chat_nao_ajudou = 0

def criar_conversa():
    global total_conversas
    total_conversas += 1

    return {"mensagem": "Conversa criada com sucesso"}


def registrar_feedback(ajudou: bool):
    global chat_ajudou, chat_nao_ajudou

    if ajudou:
        chat_ajudou += 1
    else:
        chat_nao_ajudou += 1

    return {"mensagem": "Feedback registrado"}


def obter_metricas():
    return {
        "total_conversas": total_conversas,
        "chat_ajudou": chat_ajudou,
        "chat_nao_ajudou": chat_nao_ajudou
    }