# Serverless - AWS Node.js Typescript, DynamoDB Sample Project

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Installing and deploying

- Run `yarn install` to install the project dependencies
- Run `yarn sls deploy` (or just `sls deploy` if you have `serverless` install globally on your machine) to deploy this stack to AWS

### Testing

This projects currently has only 1 test suite of integration tests (`src/services/Todo/service.int.test.ts`) written. This is because it's a demo project and the tests are integration tests because this is a Serverless architecture which means that instead of using the normal testing pyramid (E2E < Integration < Unit) we instead should be using a testing hexagon (E2E < Integration > Unit) as the primary goal of such APIs typically is to leverage different services (integrations) and this means that having most of the tests focus on those integrations makes more sense than having mostly unit tests.

- Run `yarn test:int` to run the integration tests

This will start up a local DynamoDB container to execute the tests against. After the tests complete/fail the cleanup script will destroy the container.

I've provided two different configuration files for unit (`jest.unit.config.ts`) and integration (`jest.int.config.ts`) testing.

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. No middlewares have been used in this example.
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
