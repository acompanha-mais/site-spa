import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    
    
    function verificarLogin(e:React.FormEvent) {
        e.preventDefault();
        
        const listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios") || "[]");

        const usuario = listaUsuarios.find(
            (u:any) => u.email === email && u.senha === senha
        );

        if (!usuario){
            alert("E-mail ou senha incorretos!");
            return;
        }

        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario))
        sessionStorage.setItem("logado", "true");

        alert("Login realizado com sucesso!")
        navigate("");
    }

    return(
        <main>
            <h2>Login</h2>
            
            


            <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
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