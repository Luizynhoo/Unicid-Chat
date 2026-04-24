import '../../styles/admin/MetricCard.css';

export default function MetricCard({ title, value, accent, icon }) {
  return (
    <div className={`metric-card${accent ? ` metric-card--${accent}` : ''}`}>
      <div className="metric-card__top">
        {icon && <span className="metric-card__icon" aria-hidden="true">{icon}</span>}
        <span className="metric-card__title">{title}</span>
      </div>
      <p className="metric-card__value">{value}</p>
      <span className="metric-card__bar" aria-hidden="true" />
    </div>
  );
}