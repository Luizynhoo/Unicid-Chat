import requests
import os
from dotenv import load_dotenv
from services.pdf import listar_pdfs

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def perguntar_ia(prompt: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    contexto = ""

    for pdf in listar_pdfs():
        contexto += f"\n[{pdf['tipo'].upper()} - {pdf['nome']}]\n"
        contexto += pdf["conteudo"][:1000].rsplit('.', 1)[0]

    contexto += f"\n[{pdf['tipo'].upper()} - {pdf['nome']} - {pdf['data']}]\n"

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": f"""
                Você é um assistente da universidade UNICID.

                Use o contexto abaixo para responder as perguntas dos alunos:

                CONTEXTO:
                {contexto}

                Regras:
                - Seja direto e claro
                - Responda com base no contexto abaixo. Você pode interpretar as informações, mas NÃO invente dados que não estejam presentes.
                - Se não souber, diga que não sabe e segere para a pessoa fazer um agendamento educadamente.
                - se a pergunta for sobre um assunto que não esteja no contexto, diga que não tem essa informação e sugira fazer um agendamento educadamente.
                """
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=15)

        print("STATUS:", response.status_code)
        print("RESPOSTA:", response.text)

        if response.status_code != 200:
            return "Erro ao consultar IA"

        result = response.json()

        if "error" in result:
            print("Erro da API:", result["error"])
            return "Erro na API de IA"

        if "choices" in result and len(result["choices"]) > 0:
            choice = result["choices"][0]

            if "message" in choice and "content" in choice["message"]:
                return choice["message"]["content"]

            if "text" in choice:
                return choice["text"]

        print("Formato inesperado:", result)
        return "Erro ao processar resposta da IA"

    except requests.exceptions.Timeout:
        return "A IA demorou para responder."

    except Exception as e:
        print("ERRO:", str(e))
        return "Erro interno ao comunicar com IA"