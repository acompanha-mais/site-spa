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


    function validarIdade(nascimento) {
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

            console.log("CEP válido!");
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

    function validarSenha(senha: string) {
        return senha.length >= 8;
    }

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