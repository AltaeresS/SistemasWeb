import './createQuadras.css'; 
import api from '../../Services/api';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateQuadra = () => {
    const [nome, setNome] = useState("");
    const { id } = useParams(); // /quadras/:id
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuadra = async () => {
            try {
                const response = await api.get(`/quadras/${id}`);
                setNome(response.data.nome);
            } catch (erro) {
                console.error("Erro ao buscar quadra:", erro);
                alert("Erro ao buscar dados da quadra.");
            }
        };

        if (id) {
            fetchQuadra();
        }
    }, [id]);

    const handleUpdateQuadraSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nome.trim()) {
            alert("Por favor, insira um nome válido para a quadra.");
            return;
        }

        try {
            await api.put(`/quadras/${id}`, { nome });
            alert("Quadra atualizada com sucesso!");
            navigate("/Home_Admin");
        } catch (erro: any) {
            console.error("Erro ao atualizar quadra:", erro);
            if (erro.response?.status === 409) {
                alert("Já existe uma quadra com esse nome.");
            } else {
                alert("Erro ao atualizar quadra.");
            }
        }
    };

    return (
        <div className="container">
            <h2 className="titulo">Atualizar Quadra</h2>
            <form onSubmit={handleUpdateQuadraSubmit} className="formulario">
                <div>
                    <label htmlFor="nome">Nome da Quadra</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="botoes">
                    <button type="submit" className="botaoCadastrar">Atualizar</button>
                    <Link to="/Home_Admin" className="botaoVoltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateQuadra;
