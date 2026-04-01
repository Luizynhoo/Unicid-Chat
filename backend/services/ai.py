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
        "model": "stepfun/step-3.5-flash:free",
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
        response = requests.post(url, headers=headers, json=data, timeout=15)

        if response.status_code != 200:
            raise Exception(f"Erro na IA: {response.text}")

        result = response.json()

        return result["choices"][0]["message"]["content"]

    except requests.exceptions.Timeout:
        raise Exception("A IA demorou para responder.")

    except Exception as e:
        raise Exception(f"Erro ao comunicar com IA: {str(e)}")