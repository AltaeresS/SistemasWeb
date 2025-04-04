import api from '../../Services/api';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const CreateReserva = () => {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [quadras, setQuadras] = useState<any[]>([]);
    const [quadraId, setQuadraId] = useState("");
    const [dataReserva, setDataReserva] = useState("");
    const [horaReserva, setHoraReserva] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            const userObj = JSON.parse(usuario);
            setUsuarioId(userObj.id);
        }

        const fetchQuadras = async () => {
            try {
                const response = await api.get('/quadras');
                setQuadras(response.data);
            } catch (error) {
                console.error("Erro ao buscar quadras:", error);
                alert("Erro ao buscar quadras!");
            }
        };

        fetchQuadras();
    }, []);

    const handleUpReservaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!dataReserva || !horaReserva) {
            alert("Selecione uma data e horário válidos.");
            return;
        }

        const dataHoraFinal = new Date(`${dataReserva}T${horaReserva}`);

        const data = {
            usuarioId,
            quadraId: parseInt(quadraId),
            dataHora: dataHoraFinal,
        };

        try {
            await api.post(`/usuarios/${usuarioId}/reservas`, data);
            alert("Reserva criada com sucesso!");
            navigate('/Home');
        } catch (erro) {
            console.error(erro);
            alert("Erro ao criar reserva: " + erro);
        }
    };

    return (
        <div className="container">
            <style>
                {`
                    .container {
                        max-width: 500px;
                        margin: 50px auto;
                        padding: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .titulo {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .formulario {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    .formulario label {
                        font-weight: 500;
                        color: #444;
                        text-align: left;
                        display: block;
                        margin-bottom: 5px;
                    }
                    .formulario select,
                    .formulario input {
                        width: 100%;
                        padding: 10px;
                        border-radius: 6px;
                        border: 1px solid #ddd;
                        font-size: 16px;
                        transition: 0.3s;
                    }
                    .formulario select:focus,
                    .formulario input:focus {
                        border-color: #007bff;
                        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
                        outline: none;
                    }
                    .botoes {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
                    .botaoCadastrar,
                    .botaoVoltar {
                        padding: 12px 20px;
                        border-radius: 6px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: 0.3s;
                        border: none;
                        text-decoration: none;
                    }
                    .botaoCadastrar {
                        background-color: #28a745;
                        color: white;
                    }
                    .botaoCadastrar:hover {
                        background-color: #218838;
                    }
                    .botaoVoltar {
                        background-color: #dc3545;
                        color: white;
                    }
                    .botaoVoltar:hover {
                        background-color: #b02a37;
                    }
                `}
            </style>

            <h2 className="titulo">Criar Reserva</h2>
            <form onSubmit={handleUpReservaSubmit} className="formulario">
                <div>
                    <label htmlFor="quadraId">Quadra</label>
                    <select
                        id="quadraId"
                        name="quadraId"
                        value={quadraId}
                        onChange={(e) => setQuadraId(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma quadra</option>
                        {quadras.map((quadra) => (
                            <option key={quadra.id} value={quadra.id}>
                                {quadra.nome || `Quadra ${quadra.id}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="data">Data da Reserva</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={dataReserva}
                        onChange={(e) => setDataReserva(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="hora">Horário</label>
                    <select
                        id="hora"
                        name="hora"
                        value={horaReserva}
                        onChange={(e) => setHoraReserva(e.target.value)}
                        required
                    >
                        <option value="">Selecione um horário</option>
                        {Array.from({ length: 13 }, (_, i) => {
                            const hour = 8 + i;
                            const hourStr = hour.toString().padStart(2, '0');
                            return (
                                <option key={hourStr} value={`${hourStr}:00`}>
                                    {hourStr}:00
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="botoes">
                    <button type="submit" className="botaoCadastrar">Cadastrar</button>
                    <Link to="/Home" className="botaoVoltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
};

export default CreateReserva;