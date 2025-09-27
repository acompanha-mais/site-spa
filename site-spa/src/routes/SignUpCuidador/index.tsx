import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/typeCadastro";

export default function SignUpCuidador() {
    useEffect(() => {
        document.title = "Cadastro - Acompanha+"
    }, []);

    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>();


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
            return !data.erro;
        } catch {
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

    const onSubmit = async (data: TipoCadastro) => {
        if (!validarIdade(data.nascimento)) {
            alert("Você precisa ter 18 anos ou mais.");
            return;
        }

        if (!(await validarCep(data.cep))) {
            alert("CEP inválido.");
            return;
        }

        if (!validarCpf(data.cpf)) {
            alert("CPF inválido.")
            return;
        }

        const listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios") || "[]");

        const existe = listaUsuarios.some(
            (u:any) => u.email === data.email || u.cpf === data.cpf
        );

        if (existe) {
            alert("Já existe um usuário com esse e-mail ou CPF.")
            return;
        }

        listaUsuarios.push(data);
        sessionStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

        alert("Cadastro realizado com sucesso!");
        navigate("/login");
    };
    
    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-20 text-center">Cadastre-se, Cuidador</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
                <input 
                    type="text"
                    placeholder="Nome completo"
                    {...register("nome", { required: true })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <input 
                    type="date"
                    placeholder="Data de nascimento"
                    {...register("nascimento", { required: true })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <select
                    {...register("sexo", { required: true })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                    <option value="" disabled>Selecione o sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
                <input 
                    type="text" 
                    placeholder="CEP"
                    {...register("cep", { required: true, minLength: 8, maxLength: 8 })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="text"
                    placeholder="CPF" 
                    {...register("cpf", { required: true, minLength: 11, maxLength: 11 })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="text"
                    placeholder="Número de telefone"
                    {...register("telefone", { required: true, minLength: 8, maxLength: 11 })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <input 
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <input 
                    type="password"
                    placeholder="Senha"
                    {...register("senha", { required: true, minLength: 8, maxLength: 32 })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Cadastrar</button>
            </form>
        </main>
    );
}