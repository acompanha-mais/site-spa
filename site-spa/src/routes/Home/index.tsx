export default function Home() {
    return (
        <main>
            <section className="flex flex-col md:flex-row items-center justify-between md:gap-24">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3x1  font-bold pb-4">
                        Ajude quem precisa! Faça a diferença!
                    </h1>
                    <p>
                        Sua contribuição pode transformar vidas. Saiba como você pode ajudar e fazer parte dessa mudança agora mesmo.
                    </p>
                    <button className="mt-4">Saiba mais</button>
                </div>

                <img
                    src="/home-img.png"
                    alt="Cuidadora ajudando idosa"
                    className="w-3/4 md:w-1/3 md:min-w-[250px] mt-8 md:mt-0 rounded-lg shadow-lg"
                />
            </section>

            
        </main>
    );
}
