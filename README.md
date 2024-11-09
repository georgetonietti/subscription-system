# @Sistema de Assinaturas

## Descrição
O Sistema de Assinaturas é uma aplicação projetada para auxiliar startups que operam com o modelo de assinaturas de aplicativos. Este sistema é fundamental para gerenciar a lista de assinaturas de clientes, monitorar o status de cada assinatura e gerar relatórios de cobrança. Além disso, o sistema permite identificar assinaturas que devem ser canceladas por falta de pagamento e responder de forma eficaz às requisições de aplicativos que verificam a validade da assinatura, garantindo operações fluidas e seguras para os usuários finais.

O projeto foi desenvolvido com foco na Arquitetura Limpa de Robert Martin, aplicando princípios SOLID para garantir alta manutenção e separação de responsabilidades. Ele integra dois microserviços auxiliares, utilizando tanto comunicação síncrona quanto assíncrona (filas), proporcionando uma solução robusta e escalável para startups.

---

## Funcionalidades

**1 - Listar Clientes**
Permite listar todos os clientes cadastrados no sistema, exibindo detalhes importantes de cada um. 
(`GET /servcad/clientes`)

**2 - Registrar Nova Assinatura**
Facilita o registro de uma nova assinatura vinculada a um cliente e a um aplicativo específico. 
(`POST /servcad/assinaturas`)

**3 - Listar Aplicativos**
Exibe uma lista completa de aplicativos cadastrados, com detalhes sobre cada um. 
(`GET /servcad/aplicativos`)

**4 - Atualizar Custo Mensal de um Aplicativo**
Permite modificar o custo mensal de um aplicativo específico. 
(`PATCH /servcad/aplicativos/:idAplicativo`)

**5 - Listar Assinaturas Ativas**
Retorna todas as assinaturas que estão atualmente ativas. 
(`GET /servcad/assinaturas/ATIVAS`)

**6 - Listar Todas as Assinaturas**
Mostra todas as assinaturas, independentemente do status. 
(`GET /servcad/assinaturas/TODAS`)

**7 - Listar Assinaturas Canceladas**
Recupera a lista de assinaturas que foram canceladas. 
(`GET /servcad/assinaturas/CANCELADAS`)

**8 - Listar Assinaturas de um Cliente Específico**
Permite visualizar todas as assinaturas associadas a um cliente, fornecendo informações detalhadas. 
(`GET /servcad/asscli/:codcli`)

**9 - Listar Assinaturas de um Aplicativo Específico**
Recupera informações de assinaturas vinculadas a um aplicativo específico. 
(`GET /servcad/assapp/:codapp`)

**10 - Verificar Validade de Assinatura**
Consulta a validade de uma assinatura específica, garantindo que esteja ativa ou identificando a necessidade de bloqueio. 
(`GET /assinvalidas/:codass`)

---

## Instalação
### Para instalar o sistema siga estes passos:

1 - **Clone o repositório**:
   ```bash
   git clone https://github.com/georgetonietti/subscription-system.git
   ```
2 - **Navegue até o diretório do projeto em seu terminal**
   ```bash
   cd subscription-system
   ```
3 - **Instale as dependências**
   ```bash
   npm install
   ```
---

## Executando o sistema
### Para executar o sistema siga estes passos:

1 - **Certifique-se de que as dependências estejam instaladas**
   ```bash
   npm install
   ```
2- **Inicie a aplicação**
   ```bash
   npm run start
   ```

---

## Criação e populaçao das tabelas
**Caso as tabelas não tenham sido criadas siga estes passos**

1 - **Crie as tabelas**
   ```bash
   npm run db
   ```
2- **Popule as tabelas**
   ```bash
   npm run seed
   ```

---

## Autor
**George Lucas**