import { useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import '../../styles/ui/Toast.css';

export default function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`toast toast--${type}`}>
            {type === 'success' ? (
                <CheckCircle2 size={16} />
            ) : (
                <AlertCircle size={16} />
            )}
            <span>{message}</span>
        </div>
    );
}