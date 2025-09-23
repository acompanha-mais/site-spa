import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Faq(){
    const[abrirResposta, setAbrirResposta] = useState<number | null>(null);

    const faqs = [
        {pergunta: "Qualquer um pode se candidatar a cuidador?", resposta: "Sim, contanto que seja maior de idade."},
        {pergunta: "É necessário ter experiência anterior?", resposta: "Não obrigatoriamente, porém experiências anteriores com idosos ou pessoas com debilidades físicas é um diferencial."},
    ];

    const toggle = (index: number) => {
        setAbrirResposta(abrirResposta === index ? null : index);
    };

    return(
        <main>
            <section className="text-center mb-30">
                <h1 className="mb-5">Possui alguma dúvida?</h1>
                <h2 className="font-light">Abaixo respondemos as dúvidas mais frequentes!</h2>
            </section>
            

            <section>
                <div className="mb-30">
                    <ul>
                        {faqs.map((faq, index) => (
                            <li key={index} className="font-bold border-b border-gray-400">
                                <div onClick={() => toggle(index)} className="pl-4 flex items-center justify-between gap-2 cursor-pointer py-2">
                                    <span className="text-[18px] md:text-[20px] lg:text-[24px]">{faq.pergunta}</span>
                                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${abrirResposta === index ? "rotate-180" : ""}`}/>
                                </div>
                                {abrirResposta === index && (
                                    <p className="pl-8 pb-2 font-light">{faq.resposta}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center">
                    <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-red-600">Queremos te ouvir!</h3>
                    <p>Entre com contato conosco:</p>
                    <Link to="/contato">
                        <button className="mt-4">Fale conosco</button>
                    </Link>
                    
                    
                </div>
            </section>
        </main>
    );
}