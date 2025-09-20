import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    const[isOpen, setIsOpen] = useState(false);

    return(
        <nav className="relative">
            <div className="hidden lg:flex space-x-12">
                <Link to="/">Início</Link>
                <Link to="/sobre"> Sobre nós</Link>
                <Link to="/cadastro"> Cadastro</Link>
                <Link to="/time">Time</Link>
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
                        <Link to="/cadastro" onClick={() => setIsOpen(false)}>Cadastro</Link>
                        <Link to="/time" onClick={() => setIsOpen(false)}>Time</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}