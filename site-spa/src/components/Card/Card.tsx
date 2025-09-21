import type { Member } from "../../types/memberTypes";

export default function Card({nome, rm, turma, foto}: Member){
    return(
        <div className="max-w-xs mx-auto bg-red-600 shadow-lg rounded-2xl overflow-hidden p-4 text-center text-white">
            <div className="flex justify-center">
                <img src={foto} alt={`Foto de ${nome}`}/>
            </div>
            <h2 className="mt-4 mx-10">{nome}</h2>
            <p>{rm}</p>
            <p>{turma}</p>
        </div>
    );
}