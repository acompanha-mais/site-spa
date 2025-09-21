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

        navigate("/perfil-cuidador");
        window.location.reload();
    }

    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-20 text-center">Login</h1>
            <form onSubmit={verificarLogin} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="password"
                    placeholder="Senha" 
                    value={senha}
                    onChange={e=> setSenha(e.target.value)}
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Entrar</button>
            </form>
        </main>
    );
}