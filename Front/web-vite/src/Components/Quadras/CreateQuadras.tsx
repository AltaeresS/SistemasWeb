import './createQuadras.css';
import api from '../../Services/api';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const CreateQuadra = () => {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const handleCreateQuadraSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nome.trim()) {
            alert("Por favor, insira um nome para a quadra.");
            return;
        }

        try {
            await api.post("/quadras", { nome });
            alert("Quadra cadastrada com sucesso!");
            navigate("/Home_Admin");
        } catch (erro: any) {
            console.error("Erro ao cadastrar quadra:", erro);
            if (erro.response?.status === 409) {
                alert("Já existe uma quadra com esse nome.");
            } else {
                alert("Erro ao cadastrar quadra.");
            }
        }
    };

    return (
        <div className="container">
            <h2 className="titulo">Cadastrar Nova Quadra</h2>
            <form onSubmit={handleCreateQuadraSubmit} className="formulario">
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
                    <button type="submit" className="botaoCadastrar">Cadastrar</button>
                    <Link to="/Home_Admin" className="botaoVoltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
};

export default CreateQuadra;
