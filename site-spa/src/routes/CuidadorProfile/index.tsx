import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoCompromisso } from "../../types/appointmentTypes";


export default function CuidadorProfile() {
    const navigate = useNavigate();
    const[compromissos, setCompromissos] = useState<TipoCompromisso[]>([]);



    useEffect(() => {
        const logado = sessionStorage.getItem("logado");
        if (logado !== "true") {
            navigate("/login");
        }

        const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "[]");

        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/compromissos");
            const data:TipoCompromisso[] = await response.json();
            setCompromissos(data);
        }
        
        fetchData();
        
    }, [navigate]);
    
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "[]");

    return(
        <main>
            <h1 className="text-center">Bem vindo, {usuario.nome || "Usuário"}!</h1>

            <section>
                <h2>Meus compromissos:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>PACIENTE</th>
                            <th>DATA</th>
                            <th>ENDEREÇO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {compromissos.map((compromisso, indice) => (
                            <tr key={indice}>
                                <td>{compromisso.nomePaciente}</td>
                                <td>{compromisso.data} às {compromisso.hora}</td>
                                <td>{compromisso.endereco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}