import { useEffect } from "react";


export default function Contact() {
    useEffect(() => {
        document.title = "Contato - Acompanha+"
    }, []);

    return(
        <main className="min-h-screen flex flex-col items-center">
            <h1 className="mb-5 text-center">Queremos te ouvir!</h1>
            <h2 className="font-light mb-20">Fale conosco:</h2>

            <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col space-y-4">
                <input 
                    type="email"
                    placeholder="Email"
                    required
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"

                />
                <textarea
                    placeholder="Sua dúvida"
                    required
                    rows={1}
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    maxLength={1500}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                <button type="submit" className="mx-auto w-[130px] md:w-[176px] mt-4">Enviar</button>
            </form>
        </main>
    );
}