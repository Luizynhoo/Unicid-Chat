import requests
import os
from dotenv import load_dotenv
from services.pdf import listar_pdfs

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def resumir_texto(texto, limite=300):
    texto = texto.replace("\n", " ").strip()

    if len(texto) <= limite:
        return texto

    corte = texto[:limite]

    if "." in corte:
        corte = corte.rsplit(".", 1)[0] + "."

    return corte


def gerar_contexto():
    contexto = ""

    pdfs = listar_pdfs()[:2] 

    for pdf in pdfs:
        resumo = resumir_texto(pdf["conteudo"], 300)

        contexto += f"\n[{pdf['tipo'].upper()} - {pdf['nome']}]\n"
        contexto += resumo + "\n"

    return contexto


def perguntar_ia(prompt: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    contexto = gerar_contexto()

    models = [
        "mistralai/mistral-7b-instruct",
        "meta-llama/llama-3-8b-instruct",
        "google/gemma-7b-it"
    ]

    for model in models:
        data = {
            "model": model,
            "temperature": 0.3,
            "max_tokens": 250,
            "messages": [
                {
                    "role": "system",
                    "content": f"""
Você é um assistente da UNICID.

Use o CONTEXTO para responder.

Regras:
    - Seja direto e claro
    - Responda com base no contexto abaixo. Você pode interpretar as informações, mas NÃO invente dados que não estejam presentes.
    - Se não souber, diga que não sabe e segere para a pessoa fazer um agendamento educadamente.
    - se a pergunta for sobre um assunto que não esteja no contexto, diga que não tem essa informação e sugira fazer um agendamento educadamente.

CONTEXTO:
{contexto}
"""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }

        try:
            response = requests.post(url, headers=headers, json=data, timeout=10)

            if response.status_code == 200:
                result = response.json()

                if "choices" in result:
                    print(f"Resposta via modelo: {model}")
                    return result["choices"][0]["message"]["content"]

            else:
                print(f"Erro {model}:", response.text)

        except Exception as e:
            print(f"Erro {model}:", str(e))

    return "Todos os modelos falharam no momento."