import { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from 'react-router-dom';

interface ReservaInterface {
    id: number;
    usuarioId: number;
    quadraId: number;
    dataHora: string;
    createdAt: string;
    updatedAt: string;
    quadra: {
        nome: string;
    };
}

const ListaReservas = () => {
    const [reservas, setReservas] = useState<ReservaInterface[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            const usuarioObjeto = JSON.parse(usuario);
            setUserId(usuarioObjeto.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            api.get(`/usuarios/${userId}/reservas`)
                .then(response => {
                    setReservas(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar reservas", error);
                });
        }
    }, [userId]);

    const handleDelReservaSubmit = async (id: number) => {
        if (!window.confirm("Confirma sua Exclusão?")) {
            return;
        }

        try {
            await api.delete(`/usuarios/${userId}/reservas/${id}`);
            alert("Excluído com Sucesso");
            setReservas(reservas.filter(reserva => reserva.id !== id));
        } catch (error) {
            alert('Erro na Exclusão');
        }
    };

    return (
        <div style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            {/* Estilo embutido para hover */}
            <style>
                {`
                    .tr-hover:hover {
                        background-color: #e9ecef;
                    }
                    .btn-update:hover {
                        background-color: #0056b3;
                    }
                    .btn-delete:hover {
                        background-color: #b02a37;
                    }
                    .btn-create:hover {
                        background-color: #218838;
                    }
                `}
            </style>

            <h2 style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#333",
                fontSize: "28px",
                fontWeight: "600"
            }}>
                Lista de Reservas
            </h2>

            <div style={{
                overflowX: "auto",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "16px"
                }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                            {["ID", "Quadra", "Data e Hora", "Ações"].map((col, i) => (
                                <th key={i} style={{
                                    padding: "15px",
                                    textAlign: "left",
                                    borderBottom: "2px solid #dee2e6",
                                    color: "#495057",
                                    fontWeight: "600"
                                }}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva, index) => (
                            <tr
                                key={reserva.id}
                                className="tr-hover"
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                                    transition: "background-color 0.2s"
                                }}
                            >
                                <td style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #dee2e6",
                                    color: "#495057"
                                }}>{reserva.id}</td>
                                <td style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #dee2e6",
                                    color: "#495057"
                                }}>{reserva.quadra.nome}</td>
                                <td style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #dee2e6",
                                    color: "#495057"
                                }}>{new Date(reserva.dataHora).toLocaleString()}</td>
                                <td style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #dee2e6"
                                }}>
                                    <button
                                        onClick={() => navigate(`/Home/UpdateReserva/${reserva.id}`)}
                                        className="btn-update"
                                        style={{
                                            padding: "8px 16px",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            marginRight: "10px",
                                            transition: "background-color 0.2s"
                                        }}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        onClick={() => handleDelReservaSubmit(reserva.id)}
                                        className="btn-delete"
                                        style={{
                                            padding: "8px 16px",
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s"
                                        }}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button
                    onClick={() => navigate("/Home/CreateReserva")}
                    className="btn-create"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.2s"
                    }}
                >
                    Criar Nova Reserva
                </button>
            </div>
        </div>
    );
};

export default ListaReservas;
