# University Automation

Esse é um projeto para automatizar alguns processos para estudantes que frequentam universidades

## Universidades atuais:

### UFSM - Universidade Federal de Santa Maria

Módulos disponíveis:
| Módulo | Descrição |
|---|---|
| **Restaurante Universitário** | Automatizar o agendamento de refeições no RU da UFSM |

## Contribuindo

Este projeto é feito em NodeJS + TypeScript, em um monorepo gerenciado por [Nx](https://nx.dev)

Para iniciar o desenvolvimento, use `pnpm install` - necessita `pnpm` no contexto global (`npm install -g pnpm`)

Popule os arquivos `.env.production` e `.env.development` com os valores providos em `.env.template`

### Estrutura do projeto:

```
uni-auto
├─ apps
│  ├─ api
│  ├─ cron
│  └─ web
├─ packages
│  └─ shared
```

`apps` contém os projetos deste monorepo<br/>
`api` e `cron` são projetos NestJS<br/>
`web` é o frontend em React<br/>

`packages` contém código compartilhado entre os projetos<br/>
`shared` é um pacote para ambos projetos NestJS

### Comandos para desenvolvimento

Todos esses comandos aceitam a flag `--prod` para carregar o `.env.production`

> `nx serve nome`</br>
> Inicia o projeto `nome` localmente

> `nx container nome`</br>
> Cria um container Docker para `nome` com tag `uni-auto/nome`

> `nx migration:generate api`<br/>
> Gera uma migration com as diferenças entre o banco e as entidades no projeto<br/>
> Ref: [TypeORM](https://orkhan.gitbook.io/typeorm/docs/)

> `nx migration:run api`<br/>
> Executa as migrations que estão na [pasta de migrations](./packages/shared/src/migrations)

> `nx migration:revert api`<br/>
> Desfaz a última migration executada no banco

Mais comandos relacionados a migrations podem ser adicionados no [project.json](./apps/api/project.json) da API

> `nx build nome`<br/>
> Compila o projeto `nome` para a pasta `./dist`

Algumas vezes pode ocorrer problema de cache durante o desenvolvimento.<br/>
Caso aconteça, o comando `nx reset` e a exclusão da pasta `dist` geralmente resolvem

> `docker compose up -d [nomes]`<br/>
> Cria e executa os containers Docker criados com `nx container`<br/>
> Utiliza o arquivo `.env.production`
