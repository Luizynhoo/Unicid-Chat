import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def perguntar_ia(prompt: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {
                "role": "system", 
                "content": "Responda de forma direta, clara e resumida. Evite textos longos."
            },
            {
                "role": "user", 
                "content": prompt
            }
        ]
    }

    try:
        print("API KEY:", API_KEY) 

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

        print("Formato inesperado da resposta:", result)
        return "Erro ao processar resposta da IA"

    except requests.exceptions.Timeout:
        return "A IA demorou para responder."

    except Exception as e:
        print("ERRO:", str(e))
        return "Erro interno ao comunicar com IA"