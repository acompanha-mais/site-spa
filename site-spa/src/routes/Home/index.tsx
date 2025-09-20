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
                <div>
                    <h2 className="pb-4">Faça a diferença hoje!</h2>
                    <p>
                        Cadastre-se agora e ajude idosos necessitados a acessarem
                        suas teleconsultas de forma simples e segura. Sua ação
                        garante que cada pessoa receba o cuidado que precisa.
                    </p>
                </div>
                <ul className="flex flex-col items-start md:items-center gap-4 text-left md:text-left max-w-md mx-auto">
                    <li className="flex items-center gap-3">
                        <span className="text-[#e65a4f] font-bold">✅</span>
                        Facilita o acesso de idosos às teleconsultas de forma
                        rápida e segura
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="text-[#e65a4f] font-bold">✅</span>
                        Contribui para uma melhor qualidade de vida e cuidado
                        contínuo
                    </li>
                </ul>
                <Link to="/cadastro">
                    <button className="mt-4">Vire um cuidador</button>
                </Link>
                
            </section>
        </main>
    );
}
