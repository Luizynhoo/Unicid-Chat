import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, tipoPermitido }) {
    const tipo = localStorage.getItem("tipo");

    // 🚫 não logado
    if (!tipo) {
        return <Navigate to="/login" />;
    }

    // 🚫 tipo errado
    if (tipoPermitido && tipo !== tipoPermitido) {
        return <Navigate to="/login" />;
    }

    return children;
}