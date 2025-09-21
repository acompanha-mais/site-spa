import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoCompromisso } from "../../types/appointmentTypes";
import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";


export default function CuidadorProfile() {
    const navigate = useNavigate();
    const[compromissos, setCompromissos] = useState<TipoCompromisso[]>([]);



    useEffect(() => {
        const logado = sessionStorage.getItem("logado");
        if (logado !== "true") {
            navigate("/login");
        }

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
            <section className="text-center mb-30">
                <h1 className="mb-5">Bem vindo, {usuario.nome || "Usuário"}!</h1>
                <h2 className="font-light">Confira seus compromissos na tabela abaixo!</h2> 
            </section>

            <section>
                <h2>Meus compromissos:</h2>
                <AppointmentTable compromissos={compromissos}/>
            </section>
        </main>
    );
}