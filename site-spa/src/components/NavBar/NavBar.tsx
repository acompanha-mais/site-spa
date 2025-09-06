import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <nav>
            <Link to="/">Início</Link> |
            <Link to="/sobre">Sobre nós</Link>
        </nav>
    );
}