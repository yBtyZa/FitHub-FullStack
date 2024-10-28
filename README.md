# FitHub!

## Visão Geral
O projeto FitHub! foi desenvolvido no curso FuturoDev do Floripa Mais Tec. Esta é uma versão otimizada que utiliza Docker para integrar dois repositórios, permitindo que quatro aplicações sejam executadas em um único contêiner. A aplicação é composta por um back-end em Node.js, um front-end em React e um banco de dados PostgreSQL, todos orquestrados com um servidor Nginx para garantir um funcionamento harmonioso e eficiente.

## Funcionalidades
FitHub é uma plataforma que facilita a integração, compartilhamento e gerenciamento de locais destinados a atividades físicas. Os usuários da plataforma podem encontrar pontos de atividades próximos por meio de listas dinâmicas, com um mapa interativo que indica a localização, visualizar informações detalhadas sobre os exercícios e registrar suas próprias contribuições para o sistema.

- Comunidade: A plataforma facilita o compartilhamento de locais com outros usuários, promovendo a descoberta e o conhecimento de novos pontos de atividades físicas.
- Visualização de Locais: Exibição dos locais de atividades físicas já cadastrados, integrados com mapas interativos, facilitando a navegação e o acesso às informações.
- Integração com Google Maps: Cada local cadastrado conta com um link direto para o Google Maps, permitindo que o usuário visualize o local marcado e receba direções de forma rápida.
- Cadastro de Usuários: A plataforma permite que novos usuários se registrem facilmente, criando um perfil com suas informações básicas.
- Login de Usuários: Os usuários registrados podem acessar a plataforma fazendo login com suas credenciais, o que lhes dá acesso às funcionalidades exclusivas.
- Visualização de Usuários Ativos: Uma vez logados, os usuários podem visualizar quais outros usuários estão online na plataforma.
- Cadastro de Locais: Os usuários cadastrados podem adicionar novos locais, informando o endereço e uma breve descrição para ajudar outros usuários a encontrarem pontos de interesse.
- Atualização de Locais: Os usuários registrados têm a liberdade de editar ou excluir locais que cadastraram previamente, garantindo que as informações estejam sempre atualizadas.
- Perfil do Usuário: Oferece funcionalidades de edição e exclusão de perfil, permitindo a alteração de informações pessoais.

## Estrutura do Projeto
  ```bash
FITHUB-FULLSTACK/
│
├── BackEnd/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── ...
│
├── FrontEnd/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── nginx.conf
├── docker-compose.yml
└── .env
```

## Descrição dos Diretórios e Arquivos

- BackEnd/: Contém o código-fonte e a configuração do back-end da aplicação.
- FrontEnd/: Contém o código-fonte e a configuração do front-end da aplicação.
- nginx.conf: Configuração do servidor Nginx, que atua como um proxy reverso.
- docker-compose.yml: Configuração do Docker Compose, definindo os serviços da aplicação.
- .env: Arquivo de variáveis de ambiente utilizado para configurar a aplicação.

## Requisitos

- Docker: Certifique-se de que o Docker esteja instalado e funcionando corretamente em sua máquina.
- Docker Compose: O Docker Compose deve estar instalado para gerenciar os contêineres.

## Instalação

### 1. Clone o repositório:
   ```bash
   git clone https://github.com/yBtyZa/FitHub-FullStack.git
   cd FitHub-FullStack
   ```

### 2. Configuração do ambiente:
- Copie o arquivo ".env.example" na pasta raiz do projeto, para ".env" e preencha as variáveis conforme necessário:
```bash
# Configurações do Banco de Dados
DB_DIALECT=postgres         # Dialeto do banco de dados (PostgreSQL)
DB_HOST=db                  # Nome do serviço do banco de dados no Docker Compose / usar "db" para Docker
DB_USER=                    # Nome de usuário do banco de dados
DB_PASSWORD=                # Senha do banco de dados
DB_DATABASE=                # Nome do banco de dados a ser utilizado
DB_PORT=5432                # Porta do banco de dados (Porta padrão 5432)

# Configurações da Aplicação
APP_PORT=3333               # Porta em que a aplicação irá rodar (Porta padrão 3333)
JWT_SECRET=                 # Segredo para assinatura de tokens JWT

# Configurações Docker
NODE_AMBIENTE=docker        # Indica que a aplicação está rodando no Docker / não usar em Ambiente de produção
EXTERNAL_PORT=8000          # Porta externa para acesso à aplicação
```

- Acesse a pasta "FrontEnd", copie o arquivo ".env.example" para ".env" sem mudar a variavel de URL:
```bash
VITE_API_URL=http://localhost:3333/
```

### 3. Build dos contêineres:
- Para construir as imagens Docker, execute:
```bash
docker-compose build
```

## Uso

### 1. Iniciar os contêineres:
- Execute o seguinte comando para iniciar todos os serviços:
```bash
docker-compose up
```
### 2. Acessar a aplicação:
- O front-end estará disponível em http://localhost:80 e o back-end em http://localhost:3333.

## Tecnologias
### Back-end - Node.js
- bcrypt e bcryptjs: Utilizadas para criptografar senhas e garantir a segurança dos dados dos usuários.
- cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo que recursos sejam acessados de diferentes origens.
- dotenv: Carrega variáveis de ambiente de um arquivo .env, facilitando a configuração da aplicação sem expor informações sensíveis no código.
- express: Framework para Node.js que simplifica o desenvolvimento de aplicações web e APIs.
- jsonwebtoken: Biblioteca para criar e verificar tokens JWT, usada para autenticação de usuários.
- pg: Driver para conectar ao PostgreSQL, permitindo que a aplicação interaja com o banco de dados.
- sequelize: ORM (Object-Relational Mapping) que facilita a interação com bancos de dados SQL de forma orientada a objetos.
- swagger-jsdoc e swagger-ui-express: Bibliotecas que ajudam na documentação da API, permitindo a geração de documentação interativa com base em anotações no código.
- yup: Biblioteca para validação de esquemas de dados, usada para garantir que os dados de entrada atendam aos requisitos definidos.
### Front-End - React.js
- @mui/icons-material e @mui/material: Bibliotecas do Material-UI que fornecem componentes prontos para uso e ícones, promovendo um design consistente e responsivo.
- dotenv: Usada também no front-end para gerenciar variáveis de ambiente.
- jwt-decode: Biblioteca para decodificar tokens JWT, permitindo a extração de informações do token no lado do cliente.
- react-hook-form: Biblioteca para gerenciar formulários de forma eficiente e simplificada em React.
- react-leaflet: Biblioteca para integrar mapas interativos utilizando a biblioteca Leaflet em aplicações React.
- react-router-dom: Biblioteca para gerenciar a navegação entre páginas em aplicações React de forma declarativa.
- react-toastify: Biblioteca para exibir notificações em estilo toast, melhorando a experiência do usuário ao fornecer feedback visual.
- yup: Usada também no front-end para validação de dados, garantindo que os formulários atendam aos requisitos definidos.
### Banco de dados - PosrgreSQL
### Virtualização - Docker
---
<div align="center"><div/>

[![Desenvolvido por Guilherme Betsa](https://img.shields.io/badge/Desenvolvido%20por-Guilherme%20Betsa-blue?style=for-the-badge)](https://github.com/yBtyZa)
[![Desenvolvido por Bruno Viscardi](https://img.shields.io/badge/Desenvolvido%20por-Bruno%20Viscardi-green?style=for-the-badge)](https://github.com/brunoviscardi)
[![Desenvolvido por Luiz H. Provin](https://img.shields.io/badge/Desenvolvido%20por-Luiz%20H.%20Provin-orange?style=for-the-badge)](https://github.com/LHProvin)
[![Desenvolvido por Jullyano Schuhmacher](https://img.shields.io/badge/Desenvolvido%20por-Jullyano%20Schuhmacher-blueviolet?style=for-the-badge)](https://github.com/JullyanoBortolonSchuhmacher)

<div align="center"><div/>
