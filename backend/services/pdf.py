from PyPDF2 import PdfReader
from datetime import datetime

pdfs = []
contador_id = 1

async def upload_pdf(file, tipo: str):
    global contador_id

    reader = PdfReader(file.file)

    texto = ''
    for page in reader.pages:
        texto += page.extract_text() or ''

    novo_pdf = {
        "id": contador_id,
        "nome": file.filename,
        "tipo": tipo,
        "data_upload": datetime.now().strftime("%d/%m/%Y"),
        "conteudo": texto
    }

    pdfs.append(novo_pdf)
    contador_id += 1

    return {"message": "PDF carregado com sucesso"}

def listar_pdfs():
    return pdfs

def deletar_pdf(id: int):
    global pdfs

    for pdf in pdfs:
        if pdf["id"] == id:
            pdfs.remove(pdf)
            return {"message": "PDF removido com sucesso"}
        
    return None


def quantidade_pdfs():
    return {"total_pdfs": len(pdfs)}