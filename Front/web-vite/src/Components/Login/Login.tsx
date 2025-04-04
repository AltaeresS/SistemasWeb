import { useState, FormEvent } from 'react';
import './login.css';
import api from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            email,
            senha
        };

        try{
            const response = await api.post('/usuarios/login', data);

            // Armazenar informações do usuário no localStorage (se necessário)
            localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
            alert("Login bem-sucedido!");            

            if (email === "admin@admin") {
                navigate('/Home_Admin');
            } else {
                navigate('/Home');
            }
        }catch(erro){
            console.error(erro)
            alert("Erro!" + erro)
        }
        
    };

    return (
        <section className="login-container">
            <h2 className="login-title">Entrar no Sistema</h2>
            <form className="login-form" onSubmit={handleSubmit}>
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
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <button type="submit">Entrar</button>
            </form>
        </section>
    );
};

export default Login;
