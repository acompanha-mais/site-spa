import { useEffect } from "react";
import Card from "../../components/Card/Card";
import type { Member } from "../../types/memberTypes";


export default function Members(){
    useEffect(() => {
        document.title = "Time - Acompanha+"
    }, []);

    const members: Member[] = [
        {nome: "Matheus Vecchi", rm: "RM561716", turma: "1TDSPO", foto:"./member-1.jpeg"},
        {nome: "Jonas Santos", rm: "RM563234", turma: "1TDSPO", foto:"./member-2.jpeg"}
    ];

    return(
        <main>
            <h1 className="text-center pb-30 text-2x1 font-bold">Conheça o time!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.map((m, i) => <Card key={i} {...m}/>)}
            </div>
        </main>
    );
}