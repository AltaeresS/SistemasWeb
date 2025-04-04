import './createReserva.css'; 
import api from '../../Services/api';
import { useState, useEffect  } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateReserva = () => {

    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [quadras, setQuadras] = useState<any[]>([]);
    const [quadraId, setQuadraId] = useState("");
    const [dataReserva, setDataReserva] = useState("");
    const [horaReserva, setHoraReserva] = useState("");

    const {id} = useParams(); /// /usuarios/usuarioId/reservas/reservaId

    console.log("ID da reserva vindo da URL:", id); // deve exibir algo válido

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

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await api.get(`/usuarios/${usuarioId}/reservas/${id}`);
                const reserva = response.data;
                console.log("Reserva recebida:", reserva);
    
                setQuadraId(reserva.quadraId.toString());
                const dataHora = new Date(reserva.dataHora);
                setDataReserva(dataHora.toISOString().slice(0, 10));
                setHoraReserva(dataHora.toTimeString().slice(0, 5));
            } catch (error) {
                console.error("Erro ao buscar reserva:", error);
                alert("Erro ao buscar reserva!");
            }
        };
    
        if (usuarioId) {
            fetchReserva();
        }
    }, [usuarioId, id]);

    const handleUpReservaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!dataReserva || !horaReserva) {
            alert("Selecione uma data e horário válidos.");
            return;
        }

        const dataHoraFinal = new Date(`${dataReserva}T${horaReserva}`);

        const data = {
            id,
            usuarioId,
            quadraId: parseInt(quadraId),
            dataHora: dataHoraFinal,
        };

        try {
            await api.put(`/usuarios/${usuarioId}/reservas/${id}`, data);
            alert("Reserva atualizada com sucesso!");
            navigate('/Home');
        } catch (erro) {
            console.error(erro);
            alert("Erro ao atualizar reserva: " + erro);
        }
    };

    return (
        <div className="container">
            <h2 className="titulo">Atualizar Reserva</h2>
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
                    <button type="submit" className="botaoCadastrar">Atualizar</button>
                    <Link to="/Home" className="botaoVoltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateReserva;
