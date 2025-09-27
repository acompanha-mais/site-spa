import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUpCuidador() {
    useEffect(() => {
        document.title = "Cadastro - Acompanha+"
    }, []);

    const navigate = useNavigate();

    const[nome, setNome] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[sexo, setSexo] = useState("");
    const[cep, setCep] = useState("");
    const[cpf, setCpf] = useState("");
    const[telefone, setTelefone] = useState("");
    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");


    function validarIdade(nascimento: string) {
        const hoje = new Date();
        const nasc = new Date(nascimento);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade >= 18;
    }

    async function validarCep(cep: string) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert("CEP inválido ou inexistente");
                return false;
            }

            return true;
        } catch (err) {
            console.log("Erro ao consultar CEP:", err);
            alert("Erro na aquisição da API");
            return false;
        }
    }

    function validarCpf(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, "");

        if (cpf.length !== 11) return false;

        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) *  (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validarIdade(nascimento)) {
            alert("Você precisa ter 18 anos ou mais.");
            return;
        }
        if (!(await validarCep(cep))) {
            alert("CEP inválido.");
            return;
        }
        if (!validarCpf(cpf)) {
            alert("CPF inválido.");
            return;
        }

        const listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios") || "[]");

        const existe = listaUsuarios.some(
            (u:any) => u.email === email || u.cpf === cpf
        );
        if (existe) {
            alert("Já existe um usuário com esse e-mail ou CPF.")
            return;
        }

        listaUsuarios.push({nome, nascimento, sexo, cep, cpf, telefone, email, senha});

        sessionStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
        
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
    }

    

    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-20 text-center">Cadastre-se, Cuidador</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
                <input 
                    type="text"
                    placeholder="Nome completo"
                    value={nome}
                    onChange={e=> setNome(e.target.value)}
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <input 
                    type="date"
                    placeholder="Data de nascimento"
                    value={nascimento}
                    onChange={e=> setNascimento(e.target.value)}
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <select
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                    <option value="" disabled>Selecione o sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
                <input 
                    type="text" 
                    placeholder="CEP"
                    value={cep}
                    onChange={e=> setCep(e.target.value)}
                    required
                    minLength={8} 
                    maxLength={8}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="text"
                    placeholder="CPF" 
                    value={cpf}
                    onChange={e=> setCpf(e.target.value)}
                    required
                    minLength={11} 
                    maxLength={11}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="text"
                    placeholder="Número de telefone"
                    value={telefone}
                    onChange={e=> setTelefone(e.target.value)}
                    required
                    minLength={8}
                    maxLength={11}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
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
                    minLength={8}
                    maxLength={32}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Cadastrar</button>
            </form>
        </main>
    );
}