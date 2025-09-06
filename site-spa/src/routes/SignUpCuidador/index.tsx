import { useState } from "react";

export default function SignUpCuidador(){
    const[nome, setNome] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[sexo, setSexo] = useState("");
    const[cep, setCep] = useState("");
    const[cpf, setCpf] = useState("");
    const[telefone, setTelefone] = useState("");
    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");

    return(
        <main>
            <h2>Cadastre-se, Cuidador</h2>

            <input 
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={e=> setNome(e.target.value)} 
            />
            <input 
                type="date"
                placeholder="Data de nascimento"
                value={nascimento}
                onChange={e=> setNascimento(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Sexo"
                value={sexo}
                onChange={e=> setSexo(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="CEP"
                value={cep}
                onChange={e=> setCep(e.target.value)} 
            />
            <input 
                type="text"
                placeholder="CPF" 
                value={cpf}
                onChange={e=> setCpf(e.target.value)} 
            />
            <input 
                type="text"
                placeholder="Número de telefone"
                value={telefone}
                onChange={e=> setTelefone(e.target.value)}  
            />
            <input 
                type="email"
                placeholder="Email"
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