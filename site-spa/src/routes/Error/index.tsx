import { useEffect } from "react";


export default function Error(){
    useEffect(() => {
        document.title = "Error - Acompanha+"
    }, []);

    return(
        <main>
            <h2>Page not found. Error 404</h2>
        </main>
    );
}