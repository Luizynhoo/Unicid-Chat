import { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
    const [visible, setVisible] = useState(false);
    const [words, setWords] = useState([false, false, false, false]);
    const [barGrow, setBarGrow] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const t = (fn, ms) => setTimeout(fn, ms);

        t(() => setVisible(true), 50);
        t(() => setWords([true, false, false, false]), 300);
        t(() => setWords([true, true, false, false]), 520);
        t(() => setWords([true, true, true, false]), 740);
        t(() => setWords([true, true, true, true]), 960);
        t(() => setBarGrow(true), 1200);
        t(() => setFadeOut(true), 2800);
        t(() => onFinish(), 3400);

        return () => { };
    }, []);

    const labels = ["Bem", "Vindo", "ao", "Unicid Chat"];

    return (
        <div className={`splash ${visible ? "splash--visible" : ""} ${fadeOut ? "splash--out" : ""}`}>
            <h1 className="splash__title">
                {labels.map((word, i) => (
                    <span
                        key={word}
                        className={`splash__word ${i === 3 ? "splash__word--accent" : ""} ${words[i] ? "splash__word--show" : ""}`}
                    >
                        {word}
                    </span>
                ))}
            </h1>
            <div className={`splash__bar ${barGrow ? "splash__bar--grow" : ""}`} />
        </div>
    );
}