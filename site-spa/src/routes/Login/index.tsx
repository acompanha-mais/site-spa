import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoLogin } from "../../types/typeLogin";
import { useForm } from "react-hook-form";

export default function Login() {
    useEffect(() => {
        document.title = "Login - Acompanha+"
    }, []);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TipoLogin>();

    const onSubmit = async (data: TipoLogin) => {
        try {
            const response = await fetch(`https://acompanhamaisjava.onrender.com/cuidadores/${data.cpf}`)
            if (!response.ok) {
                alert("E-mail ou senha incorretos!");
                return;
            }

            const usuario = await response.json();

            if (usuario.senha !== data.senha) {
                alert("E-mail ou senha incorretos!");
                return;
            }

            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            sessionStorage.setItem("logado", "true");

            alert("Login realizado com sucesso!");
            navigate("/perfil-cuidador");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Erro ao fazer login.");
        }
    };

    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-20">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
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
                    {...register("senha", {required: "A senha é obrigatória", minLength: { value: 8, message: "A senha deve ter no mínimo 8 caracteres" }})}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {errors.senha && <span className="text-red-600">{errors.senha.message}</span>}
                
                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Entrar</button>
            </form>
        </main>
    );
}