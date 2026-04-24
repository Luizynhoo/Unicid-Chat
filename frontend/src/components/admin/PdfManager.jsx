import { useEffect, useRef, useState } from 'react';
import { FileText, CloudUpload, CheckCircle2, AlertCircle, X, Tag, Trash2 } from 'lucide-react';
import { listarPdf, getPdfs, getPdfCount, deletarPdf } from '../../services/pdf';
import '../../styles/admin/pdf.css';

function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`pdf-toast pdf-toast--${type}`}>
      {type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
      {message}
    </div>
  );
}

function TipoModal({ file, onConfirm, onCancel }) {
  const [tipo, setTipo] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tipo.trim()) onConfirm(tipo.trim());
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Tipo do documento">

        <div className="modal__header">
          <div className="modal__header-left">
            <span className="modal__header-icon"><Tag size={15} /></span>
            <h3 className="modal__title">Tipo do documento</h3>
          </div>
          <button className="modal__close" onClick={onCancel} aria-label="Cancelar">
            <X size={15} />
          </button>
        </div>

        <div className="modal__body">
          <div className="pdf-modal__file-preview">
            <span className="pdf-modal__file-icon"><FileText size={15} /></span>
            <span className="pdf-modal__file-name">{file.name}</span>
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="pdf-tipo">Informe o tipo do documento</label>
            <input
              id="pdf-tipo"
              ref={inputRef}
              className="modal__input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: academico, financeiro, geral…"
              autoComplete="off"
            />
            <p className="pdf-modal__field-hint">
              Será enviado como <code>tipo</code> na requisição.
            </p>
          </div>
        </div>

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>Cancelar</button>
          <button
            className="modal__btn modal__btn--save"
            onClick={() => onConfirm(tipo.trim())}
            disabled={!tipo.trim()}
          >
            Enviar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PdfManager() {
  const [pdfs, setPdfs] = useState([]);
  const [count, setCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);

  const fetchData = async () => {
    const [list, c] = await Promise.all([getPdfs(), getPdfCount()]);
    setPdfs(list);
    setCount(c);
  };

  useEffect(() => { fetchData(); }, []);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleDelete = async (id, nome) => {
    setDeletingId(id);
    try {
      await deletarPdf(id);
      await fetchData();
      showToast(`"${nome}" removido com sucesso.`);
    } catch {
      showToast('Erro ao remover o documento.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const pickFile = (file) => {
    if (!file || file.type !== 'application/pdf') {
      showToast('Apenas arquivos .pdf são aceitos.', 'error');
      return;
    }
    setPendingFile(file);
  };

  const handleConfirm = async (tipo) => {
    const file = pendingFile;
    setPendingFile(null);
    setUploading(true);
    try {
      await listarPdf(file, tipo);
      await fetchData();
      showToast(`"${file.name}" enviado com sucesso!`);
    } catch {
      showToast('Erro ao enviar o arquivo. Tente novamente.', 'error');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setPendingFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) pickFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) pickFile(file);
  };

  return (
    <section className="pdf-manager">

      <div className="pdf-manager__header">
        <div className="pdf-manager__header-left">
          <span className="pdf-manager__header-icon"><FileText size={18} /></span>
          <div>
            <h2 className="pdf-manager__title">Base de Conhecimento</h2>
            <p className="pdf-manager__subtitle">
              Indexação de documentos.
            </p>
          </div>
        </div>
      </div>

      <div className="pdf-manager__grid">

        {/* Upload */}
        <div className="pdf-manager__upload-panel">
          <p className="pdf-manager__field-label">Enviar documento</p>
          <div
            className={`pdf-manager__dropzone${dragging ? ' pdf-manager__dropzone--over' : ''}${uploading ? ' pdf-manager__dropzone--uploading' : ''}`}
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            aria-label="Clique ou arraste um PDF para enviar"
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={onFileInput}
              style={{ display: 'none' }}
              aria-hidden="true"
            />
            <span className={`pdf-manager__dropzone-icon${dragging ? ' pdf-manager__dropzone-icon--over' : ''}`}>
              {uploading
                ? <span className="pdf-manager__spinner" aria-label="Enviando…" />
                : <CloudUpload size={28} />}
            </span>
            <p className="pdf-manager__dropzone-title">
              {uploading ? 'Enviando documento…' : dragging ? 'Solte para enviar' : 'Arraste um PDF aqui'}
            </p>
            <p className="pdf-manager__dropzone-hint">
              {uploading ? '' : 'ou clique para selecionar · somente .pdf'}
            </p>
          </div>
        </div>

        {/* Lista */}
        <div className="pdf-manager__list-panel">
          <p className="pdf-manager__field-label">Documentos enviados</p>
          {pdfs.length === 0 ? (
            <div className="pdf-manager__empty">
              <FileText size={28} className="pdf-manager__empty-icon" />
              <p>Nenhum documento ainda.<br />Envie o primeiro PDF ao lado.</p>
            </div>
          ) : (
            <ul className="pdf-manager__list" aria-label="Lista de PDFs">
              {pdfs.map((pdf, i) => {
                const nome = pdf.nome ?? pdf.filename ?? `Documento ${i + 1}`;
                const isDeleting = deletingId === (pdf.id ?? i);
                return (
                  <li
                    key={pdf.id ?? i}
                    className={`pdf-manager__item${isDeleting ? ' pdf-manager__item--deleting' : ''}`}
                    style={{ '--i': i }}
                  >
                    <span className="pdf-manager__item-icon"><FileText size={15} /></span>
                    <div className="pdf-manager__item-info">
                      <span className="pdf-manager__item-name">{nome}</span>
                      <span className="pdf-manager__item-tipo">{pdf.tipo}</span>
                    </div>
                    <button
                      className="pdf-manager__delete-btn"
                      onClick={() => handleDelete(pdf.id, nome)}
                      disabled={isDeleting}
                      aria-label={`Remover ${nome}`}
                    >
                      {isDeleting
                        ? <span className="pdf-manager__spinner pdf-manager__spinner--sm" />
                        : <Trash2 size={14} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {pendingFile && (
        <TipoModal file={pendingFile} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
      )}
    </section>
  );
}