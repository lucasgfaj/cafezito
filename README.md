# Cafezito App

O Cafezito App é um aplicativo pensado para os amantes de café. Ele permite descobrir cafés de sua região, registrar seus cafés favoritos, acompanhar pedidos e compartilhar experiências.

Projeto desenvolvido como atividade de curso de Sistemas para Internet na UTFPR - Guarapuava.

## Demonstração do Sistema

[Cafezito - Demonstração no Drive](https://drive.google.com/file/d/1PPhL8OzxKk3IXZk4jiYPKwCjG5PpzASN/view?usp=sharing)

## Imagens do Aplicativo
<p align="center">
   <img width="200" alt="image" src="https://github.com/user-attachments/assets/56e0de3d-b90e-449e-b0dd-0dfd24de39eb" />
   <img width="200" alt="image" src="https://github.com/user-attachments/assets/be019f06-5522-47ce-9905-a6cf5f87faba" />
   <img width="200" alt="image" src="https://github.com/user-attachments/assets/202a66ee-585f-4c44-b8a7-9dbfbdebf7ac" />
   <img width="200" alt="image" src="https://github.com/user-attachments/assets/3d78a4de-144c-4015-9b25-d793c948a83a" />
</p>


## Sobre o app

O app tem como objetivo principal melhorar a experiência de quem ama café, centralizando informações sobre cafés, cafeterias e pedidos.

### Funcionalidades principais
- [x] Cadastro de usuários
- [x] Listagem de cafés
- [x] Registro de cafés favoritos
- [x] Avaliação dos cafés
- [x] Compra de Cafés
- [x] Histórico de Pedidos
- [X] Carrinho de Compras

### Funcionalidades adicionais / futuras
- Sugestão de cafés baseada em preferências
- Promoções e cupons de desconto
- Compartilhar Cafés
- Notificações
   
## Protótipos de tela

Os protótipos de tela foram criados no Figma e estão disponíveis para visualização pública:  
[Figma Cafezito App](https://www.figma.com/design/dnHIbg0CA0LHI5DLtZBeey/Coffee-Shop-Mobile-App-Design--Community-?node-id=2-2&m=dev&t=j8uoSRgw0Z1dW2JU-1)

## Banco de Dados

O banco de dados armazena as principais informações do sistema: **usuários, cafeterias, cafés, pedidos, avaliações e favoritos**.  

A camada de dados é gerenciada pelo **[Supabase](https://supabase.com/)**, que fornece:  
- Banco relacional baseado em **PostgreSQL**  
- Autenticação e gerenciamento de usuários integrados  
- Regras de segurança via **Row Level Security (RLS)**  
- APIs automáticas (REST e GraphQL)  
- Suporte a atualizações em tempo real (**Realtime**)  

### Diagrama Entidade-Relacionamento
O diagrama completo do banco pode ser acessado aqui:  
[Diagrama ER - Cafezito App](https://dbdiagram.io/d/Cafezito-68ac61921e7a6119677b448b)
## Planejamento de sprints

Previsão de desenvolvimento dividida em sprints de 2 semanas cada:

### 📅 Planejamento de Sprints

| Sprint | Funcionalidades previstas                                  | Previsão de tempo | Status          |
|--------|------------------------------------------------------------|-------------------|-----------------|
| 1      | Configuração do ambiente, cadastro de usuários             | 1 semana          | ✅ OK           |
| 2      | Listagem de cafés, registro de cafés favoritos             | 1 semana          | ✅ OK           |
| 3      | Perfil e ajuste de perfil                                  | 1 semana          | ✅ OK           |
| 4      | Carrinho de compras                                        | 2 semanas         | ✅ OK           |
| 5      | Histórico de pedidos                                       | 2 semanas         | ✅ OK           |
| 7      | Delivery e Rota de Entrega com Maps                        | 1 semanas         | ✅ OK |
| 6      | Testes finais e ajustes                                    | 2 semanas         | ⏳ Em andamento |

## Atualizações desde o último checkpoint

- Integração com **API do Supabase** para autenticação e manipulação de tabelas (usuários, pedidos, cafés, etc).
- Criação de **hooks personalizados** (`useUserProfile`, `useCart`, entre outros) para melhor organização e reaproveitamento de lógica.
- Utilização de **AsyncStorage** para persistência local de dados referente ao carrinho.
- Projeto utilizando **Expo Maps** para desenvolvimento do mapa de delivery.

## Ambiente de desenvolvimento e ferramentas

- [Framework Expo](https://expo.dev/)

## Executando o projeto em ambiente de desenvolvimento

1. Clone o projeto:

    ```bash
    git clone https://github.com/lucasgfaj/cafezito.git
    ```

2. Rode o YARN:

    ```bash
    yarn
    ```
3. Inicie a Aplicação:

   ```bash
   yarn start
    ```

## Atualizando o Expo - Passo a Passo

1. Remover `yarn.lock`

Remova o arquivo de lock para garantir uma reinstalação limpa das dependências.

```bash
rm yarn.lock
```

2. Adicionar o pacote do Expo novamente

Adiciona a versão mais recente disponível do Expo ao seu projeto.

```bash
yarn add expo
```

3. Corrigir dependências com `expo install --fix`

Verifica e corrige automaticamente os pacotes para combinar com a versão atual do SDK.

```bash
npx expo install --fix
```
## License

[MIT license](https://opensource.org/licenses/MIT)
