from fastapi import APIRouter, HTTPException
import re
from schemas.auth import LoginRequest

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(data: LoginRequest):
    usuario = data.usuario
    senha = data.senha

    #admin
    if senha == "IA2026#":
        return {
            "tipo": "admin",
            "usuario": usuario
        }
    #aluno
    if re.fullmatch(r"\d{10}", usuario):
        return {
            "tipo": "aluno",
            "rgm": usuario
        }
    
    #inválido
    raise HTTPException(status_code=401, detail="Credenciais inválidas")