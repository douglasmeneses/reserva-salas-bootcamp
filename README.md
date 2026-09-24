# 🏢 Sistema de Reserva de Salas — Evolução Arquitetural

![Node.js](https://img.shields.io/badge/Node.js-18%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Tokens-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger/OpenAPI](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=openapiinitiative&logoColor=black)

Repositório didático desenvolvido no **Bootcamp de Desenvolvimento Backend**, demonstrando a jornada e evolução arquitetural de uma API RESTful para **Reserva de Salas de Reunião e Coworking** através de 3 marcos progressivos de maturidade de software.

---

## 📌 Os 3 Estágios de Evolução da API

O projeto é estruturado em três módulos independentes que mostram o passo a passo da evolução de uma API no mercado:

```text
reserva-salas-bootcamp/
├── api_basica/     # Estágio 1: Arquitetura em camadas e CRUD básico
├── api_jwt/        # Estágio 2: Autenticação stateless, Hash de senhas e Middlewares JWT
└── api_orm/        # Estágio 3: Mapeamento Objeto-Relacional (ORM) e integridade referencial
```

### 1️⃣ `api_basica` — Estrutura em Camadas & CRUD
- Separação clara de responsabilidades: `controllers`, `services`, `routes` e `models`.
- Endpoints REST para criação, consulta, atualização e cancelamento de reservas.
- Documentação interativa das rotas via **Swagger UI**.

### 2️⃣ `api_jwt` — Segurança, Autenticação & Autorização
- Implementação de login e emissão de tokens **JWT (JSON Web Tokens)**.
- Proteção de rotas sensíveis via middleware de autenticação (`middleware/auth.js`).
- Criptografia de senhas com algoritmo seguro (bcrypt).

### 3️⃣ `api_orm` — Persistência Relacional Avançada
- Migração de persistência manual para **ORM** com relacionamentos entre tabelas (Usuários, Salas e Reservas).
- Validação automática de integridade referencial e conflitos de horários de agendamento.
- Tratamento centralizado de erros e regras de negócio complexas.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime & Servidor:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Segurança:** JSON Web Tokens (`jsonwebtoken`) & `bcrypt`
- **Documentação:** Swagger UI (`swagger-ui-express` & `swagger-jsdoc`)
- **Persistência:** Relational ORM / SQLite / MySQL
- **Configuração:** `dotenv`

---

## 🚀 Como Executar Qualquer um dos Módulos

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)

### Execução de um Módulo Específico:
Entre na pasta do estágio desejado (ex: `api_orm`):
```bash
cd api_orm
npm install
npm start
```

Acesse a documentação Swagger em:
```text
http://localhost:3000/api-docs
```

---

## 👨‍💻 Autor

Desenvolvido por **Douglas Meneses**.

- 💼 GitHub: [@douglasmeneses](https://github.com/douglasmeneses)
- ✉️ Email: [meneses.doug@gmail.com](mailto:meneses.doug@gmail.com)
