import { useState } from "react";

import { listaLogins } from "../../data/loginList";

export default function Login(){
    const[cpf, setCpf] = useState("");
    const[senha, setSenha] = useState("");
    
    
    function verificarLogin(){
        const usuario = listaLogins.find(u => u.cpf === cpf && u.senha === senha);

        if (!usuario){
            alert("CPF ou senha incorretos!");
            return;
        }

        if (usuario.tipo === "paciente"){

        }
    }


    
    return(
        <main>
            <h2>Login</h2>

            <input 
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={e=> setCpf(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Senha" 
                value={senha}
                onChange={e=> setSenha(e.target.value)}
            />
        </main>
    );
}