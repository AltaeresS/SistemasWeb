import { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from 'react-router-dom';

interface QuadraInterface {
    id: number;
    nome: string;
}

const ListaQuadras = () => {
    const [quadras, setQuadras] = useState<QuadraInterface[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/quadras")
            .then(response => {
                setQuadras(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar quadras", error);
            });
    }, []);

    const handleDelQuadraSubmit = async (id: number) => {
        if (!window.confirm("Confirma a exclusão da quadra?")) {
            return;
        }

        try {
            await api.delete(`/quadras/${id}`);
            alert("Quadra excluída com sucesso");
            setQuadras(quadras.filter(quadra => quadra.id !== id));
        } catch (error) {
            alert("Erro ao excluir quadra");
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Lista de Quadras</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Nome</th>
                        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {quadras.map(quadra => (
                        <tr key={quadra.id}>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{quadra.id}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{quadra.nome}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                <button
                                    onClick={() => navigate(`/Home_Admin/UpdateQuadra/${quadra.id}`)}
                                    style={{ marginRight: "10px", padding: "5px 10px" }}
                                >
                                    Atualizar
                                </button>
                                <button 
                                    onClick={() => handleDelQuadraSubmit(quadra.id)}
                                    style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white" }}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => navigate("/Home_Admin/CreateQuadra")}
                style={{ padding: "5px 10px", fontSize: "12px", marginTop: "10px" }}
            >
                Criar Quadra
            </button>
        </div>
    );
};

export default ListaQuadras;