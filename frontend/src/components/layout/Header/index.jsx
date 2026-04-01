import "./Header.css";
import logo from '../../../assets/logo-negativo_17.svg';
import Button from "../../ui/Button";

export default function Header() {
    return (
        <header className="container-header">
            <div className="header-logo">
                <img src={logo} alt="Logo da UNICID" />
            </div>
            <div>
                <Button/>
            </div>
        </header>
    )
}