# template-vite-react-ts-prisma-bootstrap
template para criar sistemas web

tecnologias utilizadas

front: react, typescript, bootstrap

back: node, express, prisma

Para criar um novo sistema, basta clonar o repositório, entrar nos diretórios e digitar npm install.

Para criar um banco de dados, digite o comando npx prisma init --datasource-provider database e troque o "database" pelo banco que deseja usar, como postgresql, crie um arquivo .env na raiz do projeto e altere a string de conexão, exemplo: DATABASE_URL="postgresql://postgres:123@localhost:5432/teste?schema=public" onde postgres é o usuário, 123 é a senha, 5432 é a porta e teste é o nome do banco. Coloque também o HOST e PORT no .env

no front, crie uma pasta services e um arquivo api.tsx
import axios from "axios";

const apiurl = "ip da api" 

const api = axios.create({
  baseURL: apiurl,
});

export default api;
