from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services import pdf as pdf_services

router = APIRouter(prefix='/pdf', tags=['PDF'])


# 📤 Upload
@router.post('/')
async def upload_pdf(
    file: UploadFile = File(...),
    tipo: str = Form(...)
):
    return await pdf_services.upload_pdf(file, tipo)


# 📄 Listar
@router.get('/')
def listar():
    return pdf_services.listar_pdfs()


# ❌ Deletar
@router.delete('/{id}')
def deletar(id: int):
    resultado = pdf_services.deletar_pdf(id)

    if not resultado:
        raise HTTPException(status_code=404, detail="PDF não encontrado")

    return resultado


# 📊 Quantidade
@router.get('/quantidade')
def quantidade():
    return pdf_services.quantidade_pdfs()