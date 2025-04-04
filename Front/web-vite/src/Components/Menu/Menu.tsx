import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="logo">Reserva de Quadras</h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/Cadastro">Cadastro</Link></li>
                            <li><Link to="/Login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="project-info">
                <div className="container">
                    <div className="info-text">
                        <h2>Sobre o Sistema</h2>
                        <p>
                            O <strong>Sistema de Reserva de Quadras</strong> permite que você agende horários facilmente, garantindo
                            organização e praticidade. Ideal para clubes, academias e espaços esportivos.
                        </p>
                    </div>
                    <div className="features">
                        <div className="feature-card">📅 Agendamento Rápido</div>
                        <div className="feature-card">🔒 Login Seguro</div>
                        <div className="feature-card">📊 Painel Interativo</div>
                        <div className="feature-card">📍 Evite Conflitos de Horário</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Menu;
