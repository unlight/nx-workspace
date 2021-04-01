# nx-nest-workspace

- Run `nx g @nrwl/react:app my-app` to generate an application
- Run `nx g @nrwl/react:lib my-lib` to generate a library
- Libraries are shareable across libraries and applications. They can be imported from `@nx-nest-workspace/mylib`
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

## Resources

- https://nx.dev Nx Documentation
- https://nx.dev/nx-community community plugins
- https://www.youtube.com/watch?v=bvzXuAu7XHk Full Stack Type Safety with Angular, Nest, Nx, and Prisma https://github.com/chenkie/shirt-shop
