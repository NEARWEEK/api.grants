# api.grants

> Easy to set up end to end grant application form for DAOs on NEAR Protocol

## Repositories

- [ui.grants](https://github.com/NEARWEEK/ui.grants)
- [api.grants](https://github.com/NEARWEEK/api.grants)

## Technology stack

- Blockchain: **[NEAR](https://near.org/)**
- Smart Contracts: **[Sputnik DAO Factory V2](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao-factory2), [Sputnik DAO V2](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao2)**
- Package manager: **[NPM](https://www.npmjs.com/)**
- Application framework: **[ExpressJS](https://expressjs.com/)**
- Code quality: **[Eslint](https://eslint.org/), [Prettier](https://prettier.io/)**
- Database: **[MongoDB](https://www.mongodb.com/)**

## Guides

### Configuration

```bash
cp .env.dist .env
# 1. set up variables on .env
# 2. add contract agreement template file to `templates/agreement.pdf`
# 3. add invoice template file to `templates/invoice.xlsx` (you can copy the example one in `docs/invoice.xlsx`)
```

### Installation

```bash
npm install
```

Set up .env

### Development

```bash
# run mongodb
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

```bash
npm install
npm start
```

### Testing

No tested are implemented yet.
