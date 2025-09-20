import NavBar from "../NavBar/NavBar";

export default function Header(){
    return(
        <header className="bg-white shadow-lg p-4">
            <p className="font-semibold text-2xl">Acompanha+</p>
            <NavBar/>
        </header>
    );
}