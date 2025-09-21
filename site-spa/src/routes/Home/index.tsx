import { CheckIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


export default function Home() {
    const scrollToSection = () => {
        document
            .getElementById("diferenca")
            ?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <main>
            <section className="flex flex-col md:flex-row items-center justify-between md:gap-24">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1>
                        Ajude quem precisa! Faça a diferença!
                    </h1>
                    <p>
                        Sua contribuição pode transformar vidas. Saiba como você
                        pode ajudar e fazer parte dessa mudança agora mesmo.
                    </p>
                    <button onClick={scrollToSection} className="mt-4">
                        Saiba mais
                    </button>
                </div>

                <img
                    src="/home-img.png"
                    alt="Cuidadora ajudando idosa"
                    className="w-3/4 md:w-1/3 md:min-w-[250px] mt-8 md:mt-0 rounded-lg shadow-lg"
                />
            </section>

            <section id="diferenca" className="pt-60 text-center">
                <div className="pb-10">
                    <h2 className="pb-1">Faça a diferença hoje!</h2>
                    <p>
                        Cadastre-se agora e ajude idosos necessitados a acessarem
                        suas teleconsultas de forma simples e segura. Sua ação
                        garante que cada pessoa receba o cuidado que precisa.
                    </p>
                </div>
                <ul className="flex flex-col items-start md:items-center gap-4  md:text-left max-w-md mx-auto">
                    <li className="flex gap-3">
                        <CheckIcon className="w-12 h-12 text-gray-900"/>
                        <span className="text-red-600 font-bold">Facilita o acesso de idosos às teleconsultas de forma
                        rápida e segura</span>
                    </li>
                    <li className="flex gap-3">
                        <CheckIcon className="w-12 h-12 text-gray-900"/>
                        <span className="text-red-600 font-bold">Contribui para uma melhor qualidade de vida e cuidado
                        contínuo</span>
                    </li>
                </ul>
                <Link to="/cadastro">
                    <button className="mt-4">Canditate-se</button>
                </Link>
                
            </section>
        </main>
    );
}
