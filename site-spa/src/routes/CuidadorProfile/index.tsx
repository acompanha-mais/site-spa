import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function CuidadorProfile() {
    const navigate = useNavigate();

    useEffect(() => {
        const logado = sessionStorage.getItem("logado");
        if (logado !== "true") {
            navigate("/login");
        }
    }, [navigate]);
    
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "[]");

    return(
        <main>
            <h1>Bem vindo, {usuario.nome || "Usuário"}!</h1>
        </main>
    );
}