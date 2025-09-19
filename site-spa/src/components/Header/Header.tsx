import NavBar from "../NavBar/NavBar";

export default function Header(){
    return(
        <header className="bg-white shadow-lg p-6">
            <h1  className="text-2xl font-bold">Acompanha+</h1>
            <NavBar/>
        </header>
    );
}