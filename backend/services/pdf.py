# Biblioteca para leitura de arquivos PDF
from PyPDF2 import PdfReader

# Usada para registrar data de upload
from datetime import datetime


# "Banco de dados" em memória para armazenar PDFs
pdfs = []

# Controle de ID incremental
contador_id = 1


# =========================
# FUNÇÃO: UPLOAD DE PDF
# =========================
async def upload_pdf(file, tipo: str):
    """
    Realiza o upload de um arquivo PDF e extrai seu conteúdo.

    Parâmetros:
    - file: arquivo enviado pelo usuário
    - tipo: categoria do PDF (ex: manual, regulamento, etc.)

    Retorno:
    - Mensagem de sucesso
    """

    global contador_id

    # Lê o arquivo PDF
    reader = PdfReader(file.file)

    # Extrai o texto de todas as páginas
    texto = ''
    for page in reader.pages:
        texto += page.extract_text() or ''

    # Cria o objeto do PDF
    novo_pdf = {
        "id": contador_id,
        "nome": file.filename,
        "tipo": tipo,
        "data_upload": datetime.now().strftime("%d/%m/%Y"),
        "conteudo": texto
    }

    # Armazena em memória
    pdfs.append(novo_pdf)
    contador_id += 1

    return {"message": "PDF carregado com sucesso"}


# =========================
# FUNÇÃO: LISTAR PDFs
# =========================
def listar_pdfs():
    """
    Retorna todos os PDFs armazenados.
    """
    return pdfs


# =========================
# FUNÇÃO: DELETAR PDF
# =========================
def deletar_pdf(id: int):
    """
    Remove um PDF pelo ID.

    Parâmetros:
    - id: identificador do PDF

    Retorno:
    - Mensagem de sucesso ou None se não encontrado
    """

    global pdfs

    for pdf in pdfs:
        if pdf["id"] == id:
            pdfs.remove(pdf)
            return {"message": "PDF removido com sucesso"}
        
    return None


# =========================
# FUNÇÃO: QUANTIDADE DE PDFs
# =========================
def quantidade_pdfs():
    """
    Retorna o total de PDFs armazenados.
    """
    return {"total_pdfs": len(pdfs)}