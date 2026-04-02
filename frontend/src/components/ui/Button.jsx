import "../../styles/ui/Button.css";

export default function Button({ onClick, children }) {
    return (
        <button className="btn-sair" onClick={onClick}>
            {children}
        </button>
    )
}