import NavBar from "../NavBar/NavBar";

export default function Header(){
    return(
        <header className="bg-white shadow-lg p-4 flex items-center justify-between px-[15%]">
            <p className="font-semibold text-2xl -ml-2xs">Acompanha+</p>
            <div>
                <NavBar/>
            </div>
        </header>
    );
}