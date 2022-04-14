### API de apostas utilizando Adonis V5

API para armazenar apostas e jogos de sorte.

## Requisitos Não Funcionais

     RNF01. Construir toda aplicação utilizando Adonis V5

     RNF02. Construir banco de dados com base no JSON em /assets

     RNF03. Utilizar validators

     RNF04. Utilizar Docker para manter a aplicação dentro de um container.

## Requisitos Funcionais

     RF01. Disparar email para novos usuários, recuperação de senha e novas apostas (mailtrap)

     RF02. Login de usuários.

     RF03. CRUD de usuários

     RF04. CRUD de jogos

     RF05. CRUD de apostas (obs: o cadastro precisa receber um carrinho de apostas de acordo com um valor mínimo setado em tabela para controlar regras das apostas)

     RF06. Criar perfis de acesso (admin e player) e determinar rotas privadas.

     RF07. Criar uma scheduler para rodar todos os dias ás 09:00, disparando e-mails apenas para os players que não apostaram no prazo de 1 semana anterior ao dia atual convidando eles para fazer uma aposta.

     RF08: Ao buscar um usuário, é necessário trazer todas as apostas dele no último mês

<<<<<<< HEAD
# Atenção: Antes de iniciar a prova, envie o DIAGRAMA DE BANCO DE DADOS para o seu líder.

Observação: caso não tenha conhecimento sobre diagramas, você pode estar entendendo através deste [Vídeo](https://www.youtube.com/watch?v=XCkd27GtZoM)
Observação: deve-se construir uma collection no insomnia para ser compartilhado.

## Fluxo do Teste Automatizado:
=======

## Teste Automatizado:
>>>>>>> 17865f2d5b18c1cc89d41516b8f8df595e26cc81

    Criar um usuário
    Autenticar usuário
    Testar o CRUD completo de jogos
    Criar várias apostas de forma aleatória e salvá-las (O fluxo de valor mínimo para o carrinho deve ser validado)
    Todos os casos de validação e erro devem ser testados (ex: usuário sem permissão e e-mail inválido)

<<<<<<< HEAD
=======
Atenção: Antes de iniciar a prova, envie o DIAGRAMA DE BANCO DE DADOS para o seu líder.
Observação: caso não tenha conhecimento sobre diagramas, você pode estar entendendo através deste [Vídeo](https://www.youtube.com/watch?v=XCkd27GtZoM)
Observação: deve-se construir uma collection no insomnia para ser compartilhado.
=======



>>>>>>> 17865f2d5b18c1cc89d41516b8f8df595e26cc81
