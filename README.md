# **CSI606-2024-02 - Remoto - Proposta de Trabalho Final**

## *Discente: Kalvin De Souza Pimenta*

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

  O controle de reserva de quadras de tênis é um sistema que visa otimizar a utilização das quadras em clubes, academias ou centros esportivos, garantindo uma gestão eficiente das reservas e facilitando o acesso dos usuários ao agendamento das mesmas. Suas funcionalidades consistirão basicamente de cadastro de clientes, visualização de quadras disponiveis e o agendamento das mesmas.

<!-- Apresentar o tema. -->
### 1. Tema

  O trabalho final tem como tema o desenvolvimento de um sistema de controle de reservas de quadras de tenis.

<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

  O escopo do sistema de controle de reservas de quadras de tênis inclui a gestão de horários disponíveis para a utilização das quadras, a administração de usuários (membros ou visitantes) e o agendamento de partidas.

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

 Neste trabalho não serão consideradas variáveis que possam impedir o agendamento, tais como clima ou questões do gênero. Também não será feito o controle de caixa, uma vez que o objetivo é apenas facilitar a visualização de quais quadras estão sendo alugadas.

<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

 Para este trabalho, contaremos com 2 paginas, uma onde será feito o login(ou a entrada sem cadastro para visitantes), uma para o cadastro de novos membros e outra onde ficará visivel quais horarios estão disponiveis para agendamento.

 Os prototipos abaixo são uma versão muito simplificada do que realmente será feito.

![image](https://github.com/user-attachments/assets/f586fa9c-fbe9-41a3-b154-7bf19a067403)
![image](https://github.com/user-attachments/assets/687e1b23-6ed1-4fc8-a55d-6a40187822d6)

### 5. Inicialização
Para fazer a inicializição do projeto, devemos seguir os seguintes passos

Abra 2 terminais na sua IDE (recomendado utilização do VSCode para maior facilidade)
Em um terminal:
Rode cd server
Rode npm install para baixar as dependências
npx prisma studio para rodar o banco de dados
Rode npm start para começar o servidor

No segundo terminal
Rode cd Front
Rode cd web-vite
Rode npm install para instalar dependências
Rode npm run dev para iniciar o front-end

