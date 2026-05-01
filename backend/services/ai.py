# Biblioteca para fazer requisições HTTP
import requests

# Biblioteca para acessar variáveis de ambiente
import os

# Carrega variáveis do arquivo .env
from dotenv import load_dotenv

# Função que lista PDFs disponíveis no sistema
from services.pdf import listar_pdfs


# Carrega as variáveis do .env
load_dotenv()

# Obtém a chave da API do OpenRouter
API_KEY = os.getenv("OPENROUTER_API_KEY")


# =========================
# FUNÇÃO: RESUMIR TEXTO
# =========================
def resumir_texto(texto, limite=300):
    """
    Resume um texto para um tamanho máximo.

    Regras:
    - Remove quebras de linha
    - Limita o tamanho do texto
    - Tenta cortar no final de uma frase

    Parâmetros:
    - texto: conteúdo original
    - limite: quantidade máxima de caracteres

    Retorno:
    - Texto resumido
    """

    # Remove quebras de linha e espaços extras
    texto = texto.replace("\n", " ").strip()

    # Se já estiver dentro do limite, retorna direto
    if len(texto) <= limite:
        return texto

    # Corta no limite definido
    corte = texto[:limite]

    # Tenta finalizar no último ponto (frase completa)
    if "." in corte:
        corte = corte.rsplit(".", 1)[0] + "."

    return corte


# =========================
# FUNÇÃO: GERAR CONTEXTO
# =========================
def gerar_contexto():
    """
    Monta um contexto baseado nos PDFs disponíveis.

    Estratégia:
    - Pega até 2 PDFs
    - Resume cada um
    - Junta tudo em um único texto

    Retorno:
    - String com o contexto para IA
    """

    contexto = ""

    # Pega no máximo 2 PDFs (controle de tamanho/token)
    pdfs = listar_pdfs()[:2] 

    for pdf in pdfs:
        # Resume o conteúdo
        resumo = resumir_texto(pdf["conteudo"], 300)

        # Monta estrutura do contexto
        contexto += f"\n[{pdf['tipo'].upper()} - {pdf['nome']}]\n"
        contexto += resumo + "\n"

    return contexto


# =========================
# FUNÇÃO: PERGUNTAR IA
# =========================
def perguntar_ia(prompt: str) -> str:
    """
    Envia uma pergunta para a IA usando OpenRouter.

    Estratégia:
    - Gera contexto com base em PDFs
    - Tenta múltiplos modelos (fallback)
    - Retorna a primeira resposta válida

    Parâmetros:
    - prompt: pergunta do usuário

    Retorno:
    - Resposta gerada pela IA
    """

    url = "https://openrouter.ai/api/v1/chat/completions"

    # Headers da requisição
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    # Gera contexto dinâmico
    contexto = gerar_contexto()

    # Lista de modelos (fallback automático)
    models = [
        "mistralai/mistral-7b-instruct",
        "meta-llama/llama-3-8b-instruct",
        "google/gemma-7b-it"
    ]

    # Tenta cada modelo até obter sucesso
    for model in models:
        data = {
            "model": model,
            "temperature": 0.3,  # respostas mais controladas
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
    - Se não souber, diga que não sabe e sugere para a pessoa fazer um agendamento educadamente.
    - Se a pergunta for fora do contexto, informe que não possui essa informação e sugira agendamento.

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
            # Faz requisição para a API
            response = requests.post(url, headers=headers, json=data, timeout=10)

            # Verifica sucesso
            if response.status_code == 200:
                result = response.json()

                if "choices" in result:
                    print(f"Resposta via modelo: {model}")
                    return result["choices"][0]["message"]["content"]

            else:
                print(f"Erro {model}:", response.text)

        except Exception as e:
            print(f"Erro {model}:", str(e))

    # Caso todos os modelos falhem
    return "Todos os modelos falharam no momento."