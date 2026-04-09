import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import '../styles/pages/LoginPage.css';
import SplashScreen from "../components/shared/SplashScreen";

import logo from "../assets/logo-negativo_17.svg";

export default function LoginPage() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [destino, setDestino] = useState("/chat");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!usuario || !senha) {
            alert("Por favor, preencha ambos os campos.");
            return;
        }
        setLoading(true);
        try {
            const data = await login(usuario, senha);
            localStorage.setItem("tipo", data.tipo);

            const rota = data.tipo === "admin" ? "/admin" : "/chat";
            setDestino(rota);
            setShowSplash(true);
        } catch (error) {
            alert("Falha no login. Verifique suas credenciais.");
            console.error(error);
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };


    return (
        <>

            {showSplash && (
                <SplashScreen onFinish={() => navigate(destino)} />
            )}

            <div className="login-root">

                <div className="login-panel">
                    <div className="login-panel-inner-circle" />

                    <img src={logo} alt="Logo UNICID" className="panel-logo" />

                    <div className="panel-body">
                        <div className="panel-tag">Portal Acadêmico</div>
                        <div className="panel-divider" />
                        <h1 className="panel-headline">
                            Bem-vindo de<br />volta à <span>UNICID</span>
                        </h1>
                        <p className="panel-description">
                            Acesse o assistente inteligente da universidade e explore recursos acadêmicos com facilidade.
                        </p>
                    </div>

                    <p className="panel-footer">© {new Date().getFullYear()} UNICID · Todos os direitos reservados</p>
                </div>

                <div className="login-form-side">
                    <div className="login-form-box">
                        <div className="form-accent-line" />
                        <h2 className="form-heading">Entrar na conta</h2>
                        <p className="form-subheading">Use suas credenciais institucionais para continuar</p>

                        <div className="form-group">
                            <label className="form-label" htmlFor="usuario">Usuário</label>
                            <input
                                id="usuario"
                                type="text"
                                placeholder="Digite seu usuário"
                                className="form-input"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            className="login-btn"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            <span className="btn-content">
                                {loading && <span className="spinner" />}
                                {loading ? "Entrando..." : "Entrar"}
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}