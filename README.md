# nx-workspace

- Start project `npx create-nx-workspace@latest`
- Run `nx.js run [project][:target][:configuration][options, ...]`
- Generate app `nx generate @nrwl/node:application <node-app>`
- Rename `nx g @nrwl/workspace:mv --project api-test --destination api-spec`
- Upgrade `nx migrate latest`
- Run `nx g @nrwl/react:app my-app` to generate an application
- Run `nx g @nrwl/react:lib my-lib` to generate a library
- Libraries are shareable across libraries and applications. They can be imported from `@nx-workspace/mylib`
- Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/.
  The app will automatically reload if you change any of the source files
- Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component
- Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory
  Use the `--prod` flag for a production build
- Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io)
- Run `nx affected:test` to execute the unit tests affected by a change
- Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io)
- Run `nx affected:e2e` to execute the end-to-end tests affected by a change
- Run `nx dep-graph` to see a diagram of the dependencies of your projects
- General generate `nx generate [collection:][generator] [options, ...]`
- Format `npm run format`
- Remove project `nx g remove project_name`
- Info about nx plugin `nx list @nrwl/react`
- Generate UI lib `nx g @nrwl/react:lib ui`
- Generate other something `nx g @nrwl/workspace:application`
- Add a component `nx g @nrwl/react:component xyz --project ui`
- Build production `nx run frontend:build --prod` or `nx run frontend:build:production`
- Debug nx run `ndb node_modules/@nrwl/cli/bin/nx.js run frontend:build`
- You need set env `NODE_ENV=development | production` when serve or build:production (nx does not do it)
- Generate library `nx generate @nrwl/workspace:library`
- Run test for all `nx run-many --all --target=test`
- Run custom build cmd `nx run --verbose vite:build`
- Generate nest module for project `nx generate @nrwl/nest:module user --project=conduit.api`
- Generate class `nx g @nrwl/nest:class --project=conduit.api --flat --name=user/commands/user-create/UserCreate.Command`
- `node --inspect-brk node_modules/jest/bin/jest --runInBand --config apps/conduit.api/jest.config.js`

## Resources

- https://getpocket.com/my-list/tags/nx
- Nx Documentation https://nx.dev
- Community plugins https://nx.dev/nx-community
- https://www.youtube.com/watch?v=bvzXuAu7XHk Full Stack Type Safety with Angular, Nest, Nx, and Prisma https://github.com/chenkie/shirt-shop
- [How to programmatically enforce boundaries between applications and libraries in an Nx monorepo](https://medium.com/showpad-engineering/how-to-programmatically-enforce-boundaries-between-applications-and-libraries-in-an-nx-monorepo-39bf8fbec6ba)
- [How to organize and name applications and libraries in an Nx monorepo for immediate team-wide…](https://medium.com/showpad-engineering/how-to-organize-and-name-applications-and-libraries-in-an-nx-monorepo-for-immediate-team-wide-9876510dbe28)
- Nx Workspaces Course https://www.youtube.com/watch?v=2mYLe9Kp9VM&list=PLakNactNC1dH38AfqmwabvOszDmKriGco&ab_channel=Nrwl-NarwhalTechnologiesInc.
- https://nx.dev/latest/angular/executors/run-commands-builder
- https://github.com/nrwl/nx/blob/master/packages/workspace/docs/run-commands-examples.md
- https://nx.dev/latest/react/workspace/run-commands-executor
- https://medium.com/angular-in-depth/the-shell-library-patterns-with-nx-and-monorepo-architectures-d7ec5713c8a6
- https://github.com/briebug/cypress-schematic
- https://nx.dev/latest/node/workspace/run-commands-executor

## Todo

- purgecss https://tailwindcss.com/docs/optimizing-for-production#removing-unused-css
- integrate react-typescript-vite-app (custom command)
- configure nx boundaries for workspace
- configure eslint plugin boundraries eslint-plugin-boundaries
- lefthook
