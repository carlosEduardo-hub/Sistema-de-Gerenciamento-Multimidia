# SGM - Sistema de Gerenciamento Multimídia

SGM (Sistema de Gerenciamento Multimídia) é uma aplicação **full stack** desenvolvida para **upload e gerenciamento de arquivos multimídia**, como **imagens, vídeos e áudios** nos formatos mais utilizados.

O sistema permite aos usuários armazenar, visualizar e organizar seus arquivos de forma simples e eficiente, com uma interface moderna e responsiva.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

### **Frontend** (React + Vite)
- **[React](https://react.dev/)** - Biblioteca para construção de interfaces
- **[Vite](https://vitejs.dev/)** - Ferramenta de build otimizada para React
- **[ShadCN](https://ui.shadcn.com/)** - Biblioteca de componentes estilizados
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de dados
- **[Axios](https://axios-http.com/)** - Consumo de API
- **Context API** - Gerenciamento de estado global

### **Backend** (Configuração Dependente da API)
- **Django** 
- **Banco de dados** (PostgreSQL)

---

## 📸 Funcionalidades Principais

- 📂 **Upload de arquivos** (imagens, vídeos e áudios)
- 🗂️ **Organização e gestão de arquivos** por categorias
- 🔍 **Busca e filtros para facilitar a navegação**
- 📤 **Integração com API para armazenamento**
- 🛠️ **Validação de formatos e tamanho de arquivos**
- 🎨 **Interface responsiva e moderna**

---

## 🛠️ Como Executar o Projeto Localmente

### **1️⃣ Clonar o Repositório**

```sh
git clone https://github.com/seu-usuario/SGM.git
```

### **2️⃣ Acessar a Pasta do Projeto**

```sh
cd SGM
```

### **3️⃣ Instalar as Dependências**

```sh
npm install  # ou yarn install
```

### **4️⃣ Criar o Arquivo `.env`**
Crie um arquivo `.env` na raiz do projeto e adicione a seguinte configuração:

```
VITE_BASE_URL=https://sua-api.com/api/v1
```

⚠️ **Substitua `https://sua-api.com/api/v1` pelo endpoint correto do backend.**

### **5️⃣ Iniciar o Servidor de Desenvolvimento**

```sh
npm run dev  # ou yarn dev
```

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deploy

O projeto foi implantado e está disponível em:

🔗 **[Acesse o SGM aqui](https://sistema-de-gerenciamento-multimidia.vercel.app/)

Caso faça um **deploy manual na Vercel**, você pode rodar:

```sh
vercel --prod
```

---


