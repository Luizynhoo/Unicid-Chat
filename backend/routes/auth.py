# Importa o APIRouter para criação de rotas
# HTTPException é usado para retornar erros HTTP personalizados
from fastapi import APIRouter, HTTPException

# Biblioteca padrão do Python para trabalhar com expressões regulares
import re

# Schema que define o formato esperado dos dados de login
from schemas.auth import LoginRequest


# Cria o roteador com prefixo "/auth"
# Isso significa que todas as rotas aqui começarão com /auth
router = APIRouter(prefix="/auth", tags=["auth"])


# =========================
# ROTA: LOGIN
# =========================
@router.post("/login")
def login(data: LoginRequest):
    """
    Realiza a autenticação do usuário.

    Parâmetros:
    - data: objeto contendo usuario e senha

    Regras:
    - Se a senha for igual a "IA2026#", o usuário é considerado admin
    - Se o usuário for um número de 10 dígitos, é considerado aluno
    - Caso contrário, retorna erro de autenticação

    Retorno:
    - Tipo de usuário autenticado (admin ou aluno)
    """

    # Extrai os dados do corpo da requisição
    usuario = data.usuario
    senha = data.senha

    # =========================
    # VERIFICAÇÃO: ADMIN
    # =========================
    # Se a senha for exatamente "IA2026#", considera como administrador
    if senha == "IA2026#":
        return {
            "tipo": "admin",
            "usuario": usuario
        }

    # =========================
    # VERIFICAÇÃO: ALUNO
    # =========================
    # Valida se o usuário possui exatamente 10 dígitos numéricos (ex: RGM)
    if re.fullmatch(r"\d{10}", usuario):
        return {
            "tipo": "aluno",
            "rgm": usuario
        }

    # =========================
    # CASO INVÁLIDO
    # =========================
    # Se nenhuma condição for atendida, retorna erro 401 (não autorizado)
    raise HTTPException(status_code=401, detail="Credenciais inválidas")