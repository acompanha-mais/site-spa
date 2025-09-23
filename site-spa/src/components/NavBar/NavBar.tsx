import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function NavBar(){
    const navigate = useNavigate();
    const[isOpen, setIsOpen] = useState(false);
    const [logado, setLogado] = useState(sessionStorage.getItem("logado") === "true");

    function handleLogout() {
        sessionStorage.removeItem("logado");
        sessionStorage.removeItem("usuarioLogado");
        setLogado(false);
        navigate("/login")
    }

    return(
        <nav className="relative">
            <div className="hidden lg:flex space-x-12 2xl:text-[18px]">
                <Link to="/">Início</Link>
                <Link to="/sobre"> Sobre nós</Link>
                <Link to="/time">Time</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contato">Contato</Link>

                {!logado && <Link to="/cadastro">Cadastro</Link>}
                {!logado && <Link to="/login">Login</Link>}
                {logado && <Link to="/perfil-cuidador">Perfil cuidador</Link>}
                {logado && <span onClick={handleLogout} className="text-red-600 cursor-pointer">Sair</span>}
            </div>
            
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="[all:unset] text-6xl cursor-pointer"
                >
                    {isOpen ? "X" : "☰"}
                </button>

                <div
                    className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="flex flex-col p-4 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)}>Início</Link>
                        <Link to="/sobre" onClick={() => setIsOpen(false)}>Sobre nós</Link>
                        <Link to="/time" onClick={() => setIsOpen(false)}>Time</Link>
                        <Link to="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
                        <Link to="/contato" onClick={() => setIsOpen(false)}>Contato</Link>

                        {!logado && <Link to="/cadastro" onClick={() => setIsOpen(false)}>Cadastro</Link>}
                        {!logado && <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>}
                        {logado && <Link to="/perfil-cuidador" onClick={() => setIsOpen(false)}>Perfil cuidador</Link>}
                        {logado && (<button onClick={() => {handleLogout(); setIsOpen(false);}} className="[all:unset] text-red-600 font-bold cursor-pointer">Sair</button>)}
                    </div>
                </div>
            </div>
        </nav>
    );
}