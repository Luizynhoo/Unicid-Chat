import "./header.css";
import logo from '../../../assets/logo-negativo_17.svg';
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tipo');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="app-header__logo">
        <img src={logo} alt="UNICID" />
      </div>

      <button className="app-header__logout" onClick={handleLogout} aria-label="Sair da conta">
        <LogOut size={14} />
        <span>Sair</span>
      </button>
    </header>
  );
}