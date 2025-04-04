import { useState, FormEvent } from 'react';
import './cadastro.css';
import api from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [contato, setContato] = useState('');
    const [categoria, setCategoria] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const data = {
            nome,
            email,
            senha,
            contato,
            categoria
        };

        try{
            await api.post('/usuarios', data)
            alert("Usuario Inserido!")
            navigate('/Login')
        }catch(erro){
            console.error(erro);
            alert("Erro!" + erro)
        }

    };

    return (
        <section className="cadastro-container">
            <h2 className="cadastro-title">Criar Conta</h2>
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Crie uma senha"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contato">Contato</label>
                    <input
                        type="tel"
                        id="contato"
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                        placeholder="Digite seu telefone"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="MEMBRO">MEMBRO</option>
                        <option value="VISITANTE">VISITANTE</option>
                    </select>
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </section>
    );
};

export default Cadastro;
