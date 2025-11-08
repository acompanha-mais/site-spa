import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoCompromisso } from "../../types/appointmentTypes";
import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";


export default function CuidadorProfile() {
    useEffect(() => {
        document.title = "Meu perfil - Acompanha+"
    }, []);

    const navigate = useNavigate();
    const[compromissos, setCompromissos] = useState<TipoCompromisso[]>([]);

    useEffect(() => {
        const logado = sessionStorage.getItem("logado");
        if (logado !== "true") {
            navigate("/login");
            return;
        }
        
        const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "{}");

        const cuidadorId = usuario.id;
        if (!cuidadorId) {
            console.error("ID do cuidador não encontrado no sessionStorage.");
            return;
        }
        
        const fetchData = async () => {
            try {
                const response = await fetch(`https://acompanhamaisjava.onrender.com/consultas/cuidador/${cuidadorId}`);

            if (!response.ok) {
                throw new Error("Erro ao buscar compromissos");
            }

            const data: TipoCompromisso[] = await response.json();

            setCompromissos(data);
            } catch (error) {
                console.error("Erro ao carregar compromissos:", error);
            }
        };

        fetchData();

    }, [navigate]);

    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "{}");
    
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