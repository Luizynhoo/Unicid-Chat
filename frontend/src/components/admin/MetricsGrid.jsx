import MetricCard from './MetricCard.jsx';
import '../../styles/admin/MetricsGrid.css';

export default function MetricsGrid({ data }) {
  const taxaSucesso = data.total_conversas > 0
    ? ((data.chat_ajudou / data.total_conversas) * 100).toFixed(1)
    : '0.0';

  const successNum = parseFloat(taxaSucesso);
  const successAccent = successNum >= 70 ? 'success' : successNum >= 40 ? 'warning' : 'danger';

  return (
    <div className="metrics-grid">
      <MetricCard
        title="Total de Conversas"
        value={data.total_conversas}
        accent="neutral"
      />
      <MetricCard
        title="Chat Ajudou"
        value={data.chat_ajudou}
        icon="👍"
        accent="success"
      />
      <MetricCard
        title="Chat Não Ajudou"
        value={data.chat_nao_ajudou}
        icon="👎"
        accent="danger"
      />
      <MetricCard
        title="Taxa de Sucesso"
        value={`${taxaSucesso}%`}
        accent={successAccent}
      />
    </div>
  );
}