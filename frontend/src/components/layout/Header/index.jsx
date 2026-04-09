import "./Header.css";
import logo from '../../../assets/logo-negativo_17.svg';
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('tipo');
        navigate('/login');
    }

    return (
        <header className="container-header">
            <div className="header-logo">
                <img src={logo} alt="Logo da UNICID" />
            </div>
            <div>
                <Button onClick={handleLogout}>
                    Sair
                </Button>

            </div>
        </header>
    )
}