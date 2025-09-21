import type { TabelaProps } from "../../types/appointmentsTableProps";


export default function AppointmentTable({compromissos}: TabelaProps) {
    return(
        <div className="overflow-x-auto">
            <table className="min-w-full bg-red-300 shadow-lg">
                <thead>
                    <tr>
                        <th className="py-2 border-r-1">PACIENTE</th>
                        <th className="py-2 border-r-1">DATA</th>
                        <th className="py-2 border-r-1">HORA</th>
                        <th className="py-2">ENDEREÇO</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-900 text-[18px]">
                    {compromissos.map((compromisso, indice) => (
                        <tr key={indice} className="text-center">
                            <td className="border-t-1 border-b-1 px-5">{compromisso.nomePaciente}</td>
                            <td className="border border-gray-900 px-5">{compromisso.data}</td>
                            <td className="border border-gray-900 px-5">{compromisso.hora}</td>
                            <td className="border-t-1 border-b-1 px-5">{compromisso.endereco}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    );
}