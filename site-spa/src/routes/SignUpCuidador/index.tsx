import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/typeCadastro";


export default function SignUpCuidador() {
    useEffect(() => {
        document.title = "Cadastro - Acompanha+"
    }, []);

    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>();      

    const onSubmit = async (data: TipoCadastro) => {
        if (data.cep) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${data.cep}/json/`);
                const cepData = await response.json();
                if (!cepData.erro) {
                    data.endereco = `${cepData.logradouro}, ${cepData.bairro}, ${cepData.localidade} - ${cepData.uf}`;
                } else {
                    data.endereco = "";
                }
            } catch {
                data.endereco = "";
            }
        }
        
        const payload = {
            ...data,
            dataNascimento: data.nascimento,
        };
        delete (payload as any).nascimento;

        try {
            const response = await fetch("https://acompanhamaisjava.onrender.com/cuidadores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                alert("Erro ao cadastrar.");
                return;
            }
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.")
        }
    };
    
    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-20 text-center">Cadastre-se, Cuidador</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
                <input 
                    type="text"
                    placeholder="Nome completo"
                    {...register("nome", { required: "O nome é obrigatório" })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                {errors.nome && <span className="text-red-600">{errors.nome.message}</span>}
                <input 
                    type="date"
                    placeholder="Data de nascimento"
                    {...register("nascimento", { required: "A data de nascimento é obrigatória", validate: value => {
                        const hoje = new Date();
                        const nasc = new Date(value);
                        let idade = hoje.getFullYear() - nasc.getFullYear();
                        const m = hoje.getMonth() - nasc.getMonth();
                        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
                        return idade >= 18 || "Você precisa ter 18 anos ou mais";
                    } 
                })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                <select
                    {...register("sexo", { required: "O sexo é obrigatório" })}
                    defaultValue=""
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                    <option value="" disabled>Selecione o sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
                {errors.sexo && <span className="text-red-600">{errors.sexo.message}</span>}
                <input 
                    type="text" 
                    placeholder="CEP"
                    {...register("cep", { 
                        required: "O CEP é obrigatório", 
                        minLength: { value: 8, message: "O CEP deve ter 8 dígitos" }, 
                        maxLength: { value: 8, message: "O CEP deve ter 8 dígitos" },
                        validate: async value => {
                            try {
                                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                                const data = await response.json();
                                return !data.erro || "CEP inválido";
                            } catch {
                                return "Erro ao consultar CEP";
                            }   
                        } 
                    })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.cep && <span className="text-red-600">{errors.cep.message}</span>}
                <input 
                    type="text"
                    placeholder="CPF" 
                    {...register("cpf", {
                        required: "O CPF é obrigatório", 
                        minLength: { value: 11, message: "O CPF deve ter 11 dígitos" }, 
                        maxLength: { value: 11, message: "O CPF deve ter 11 dígitos" },
                        validate: value => {
                            value = value.replace(/[^\d]+/g, "");
                            if (/^(\d)\1+$/.test(value)) return "CPF inválido";

                            let soma = 0;
                            for (let i = 0; i < 9; i++) soma += parseInt(value.charAt(i)) * (10 - i);
                            let resto = (soma * 10) % 11;
                            if (resto === 10 || resto === 11) resto = 0;
                            if (resto !== parseInt(value.charAt(9))) return "CPF inválido";

                            soma = 0;
                            for (let i = 0; i < 10; i++) soma += parseInt(value.charAt(i)) * (11 - i);
                            resto = (soma * 10) % 11;
                            if (resto === 10 || resto === 11) resto = 0;
                            if (resto !== parseInt(value.charAt(10))) return "CPF inválido";

                            return true;
                        }
                    })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.cpf && <span className="text-red-600">{errors.cpf.message}</span>}
                <input 
                    type="text"
                    placeholder="Número de telefone"
                    {...register("telefone", { required: "O telefone é obrgatório", minLength: { value: 8, message: "Telefone inválido"}, maxLength: { value: 11, message: "Telefone inválido" } })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.telefone && <span className="text-red-600">{errors.telefone.message}</span>}
                <input 
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "O email é obrigatório" })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                <input 
                    type="password"
                    placeholder="Senha"
                    {...register("senha", { required: "A senha é obrigatória", minLength: { value: 8, message: "A senha deve ter no mínimo 8 caracteres" }, maxLength: { value: 32, message: "A senha deve ter no máximo 32 caracteres" } })}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
                {errors.senha && <span className="text-red-600">{errors.senha.message}</span>}

                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Cadastrar</button>
            </form>
        </main>
    );
}