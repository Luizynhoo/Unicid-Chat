import { useEffect, useState } from 'react';
import { getMetricas } from '../../services/metricas.js';
import MetricsGrid from './MetricsGrid.jsx';
import '../../styles/admin/Dashboard.css';
import AgendamentosTable from './AgendamentosTable';
import PdfManager from './PdfManager.jsx';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await getMetricas();
            setData(res);
        } catch (error) {
            console.log('Erro ao buscar métricas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <p>Carregando métricas...</p>;
    }

    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Painel Administrativo</h1>

            {data && <MetricsGrid data={data} />}

            <AgendamentosTable />
            <PdfManager />
        </div>
    );
}