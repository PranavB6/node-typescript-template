# Notes

## Setup Express

- Create a new folder and run the following commands:

```bash
# create new npm project
> npm init -y

# install express
> npm i express
```

- Edit `package.json`:

```json
// package.json
{
  "main": "app.js", // update "main" to "app.js"
  "scripts": {
    "start": "node src/app.js" // add "start" script
  }
}
```

- Create `src/app.js`:

```javascript
// src/app.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
```

- Run the app:

```bash
> npm start
```

- Ensure the app is running by visiting <http://localhost:3000> in your browser. You should see "Hello World!".

## Setup Typescript

```bash
# install typescript and types for node and express
> npm i -D typescript @types/node @types/express

# initialize typescript
# the following command creates a tsconfig.json file
> npx tsc --init
```

- Edit `tsconfig.json`:

```json
// tsconfig.json
{
  // set out dir to dist
  "outDir": "./dist"
}
```

- Edit `package.json`:

```json
// package.json
{
  "scripts": {
    "start": "node dist/app.js", // run the main javascript file from the dist folder
    "build": "tsc" // compile typescript into javascript
  }
}
```

- Update `src/app.js` to `src/app.ts`:

```javascript
// src/app.ts
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
```

- Run the app:

```bash
# compile typescript into javascript
> npm run build

# run the app
> npm start
```

- Ensure the app is running by visiting <http://localhost:3000> in your browser. You should see "Hello World!".

## Setup ts-node-dev

```bash
> npm i -D ts-node-dev
```

```json
{
  "scripts": {
    // compile typescript to javascript and run the app in watch mode
    // note: this DOES NOT output the transpiled .js files (ie. no .js files are created)
    "dev": "ts-node-dev src/app.ts"
  }
}
```

- Run the app:

```bash
> npm run dev
```

- Ensure the app is running by visiting <http://localhost:3000> in your browser. You should see "Hello World!".
- Make a change to src/app.ts and save the file. The app should automatically restart and you should see the change in the browser.

## Setup ESLint

```bash
# install eslint and typescript plugins
# go through the options
# make sure you choose "json" or "yaml" for the config file format so that you do not have to lint the .js config file

> npm init @eslint/config
```

- Update `.eslintrc.json`:

```json
{
  "parserOptions": {
    // ...
    "project": "./tsconfig.json"
  }
}
```

- Edit `package.json` to add lint script:

```json
{
  "scripts": {
    "lint": "eslint src/**/*", // lint all files in src folder
    "lint:fix": "eslint src/**/* --fix" // lint and fix all files in src folder
  }
}
```

- Run the linter:

```bash
# lint all files in src folder and show the linting errors
> npm run lint
```

- Run the linter and fix the errors:

```bash
# lint all files in src folder and fix the linting errors
> npm run lint:fix
```

## Setup Prettier

- <https://prettier.io/>

```bash

# install prettier
> npm i -D prettier

# create .prettierrc.json file
> touch .prettierrc.json
```

- Edit `.prettierrc.json`:

```json
{
  // use double quotes instead of single quotes
  "singleQuote": false,

  // use 2 spaces for indentation
  "tabWidth": 2,

  // add trailing commas
  "trailingComma": "es5",

  // add semi colons
  "semi": true,

  // wrap prose at 80 characters
  "printWidth": 80
}
```

- Install eslint-config-prettier plugin to turn off all eslint rules that conflict with prettier:

```bash
> npm i -D eslint-config-prettier
```

- Edit `.eslintrc.json`:

```json
{
  "extends": [
    // ...
    "prettier" // make sure this is last to have the greatest precedence
  ]
}
```

## Setup Sorting Imports with Eslint

- Reference: <https://medium.com/weekly-webtips/how-to-sort-imports-like-a-pro-in-typescript-4ee8afd7258a>

### Setup Native ESLint Plugin to Sort Imports

- Edit `.eslintrc.json`:

```json
{
  "rules": {
    "sort-imports": [
      "error",
      {
        /* default options */
        "ignoreCase": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        /* custom options */
        "ignoreDeclarationSort": true, // don"t want to sort import lines, use eslint-plugin-import instead
        "allowSeparatedGroups": true
      }
    ]
  }
}
```

### Setup the ESLint Plugin Import to Sort Imports

- This plugin gives more control over how imports are sorted than the native ESLint plugin

```bash
# install the ESLint plugin to sort imports
> npm i -D eslint-plugin-import
```

- Edit `.eslintrc.json`

```json
{
  "plugins": [
    // ...
    "import" // add the "eslint-plugin-import" plugin
  ],
  "extends": [
    // ...
    "plugin:import/recommended", // for the recommended rule set
    "plugin:import/typescript" // for the typescript rule set
  ],
  "rules": {
    // ...

    // turn on errors for missing imports
    "import/no-unresolved": "error",
    // optionally: turn off errors for named exports that are not exported
    // (if you get a lot of errors for this, you can turn it off)
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin", // Built-in imports (come from NodeJS native) go first
          "external", // <- External imports
          "internal", // <- Absolute imports
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index", // <- index imports
          "unknown" // <- unknown
        ],
        "newlines-between": "always",
        "alphabetize": {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          "order": "asc",
          /* ignore case. Options: [true, false] */
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

- NOTE: make sure `source.organizeImports` is set to `false` in your vscode settings.
  - `source.organizeImports` will use VSCode's rule set to organize imports. This may conflict with the ESLint plugin import, and you may get linting errors even after you have fixed the imports.

## Setup Git Hooks

- <https://typicode.github.io/husky/>

```bash
# install and setup husky
> npx husky-init && npm install
```

- Edit `.husky/pre-commit`:

```bash
# keep the top of the file as is

# delete: "npm test"

# add the following line
# runs the "pre-commit" script in package.json when you commit
npm run pre-commit
```

- Edit `package.json`:

```json
{
  "scripts": {
    "pre-commit": "npm run lint:fix && npm run format"
  }
}
```

- Run the following command to add a pre-push hook

```bash

# runs the "pre-push" script in package.json when you push
> npx husky add .husky/pre-push "npm run pre-push"
```

- Edit `package.json`:

```json
{
  "scripts": {
    "test": "echo \"Running Tests\"",
    "pre-push": "npm run test"
  }
}
```

## Setup Lint Staged

- lint staged allows you to lint and format only the files that you have staged

```bash
# install lint-staged
> npm i -D lint-staged
```

- Edit `package.json`:

```json
{
  "scripts": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    // lint and fix only the files that you have staged
    "*": ["prettier --write --ignore-unknown"],
    "*.{js,ts}": ["eslint --fix"]
  }
}
```

## Setup Testing with Mocha

```bash
# install mocha and its types
> npm i -D mocha @types/mocha
```

```bash
# install ts-node to run typescript files with mocha
> npm i -D ts-node
```

- Edit `package.json` to add the test scripts:

```json
{
  "scripts": {
    // build the app (compile typescript to javascript files), and run all the test files using mocha
    "test": "npm run build && mocha dist/tests/**/*.js",
    // run all the test files in watch mode
    "test:dev": "mocha -r ts-node/register 'tests/**/*.ts' --watch --watch-files 'src/**/*,tests/**/*'"
    // -r ts-node/register 'tests/**/*.ts': register ts-node to run typescript files
    // --watch: watch for changes
    // --watch-files 'src/**/*.ts,tests/**/*.ts': watch for changes in these files
  }
}
```

- Create a test file `tests/app.test.ts` (create the tests folder beside the src folder, not inside it):

```typescript
// tests/app.test.ts
import assert from "assert";

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

- Since we now have a `tests` folder beside the `src` folder, the `dist/` folder will have a `src/` and `tests/` folder when typescript is compiled to javascript
- Update the "start" script in `package.json` to run the `app.js` file which is under the `dist/src` folder:

```json
{
  "scripts": {
    // run the app.js file which is now under the dist/src folder instead of the dist folder
    // this is because we now have a tests folder beside the src folder
    "start": "node dist/src/app.js"
  }
}
```

- Run the tests:

```bash
# run all the test files using mocha
> npm test
```

- Run the tests in watch mode:

```bash
# run all the test files in watch mode
> npm run test:dev
```

## Setup testing libraries: chai, sinon, and proxyquire

```bash
# install chai and its types
> npm i -D chai @types/chai
```

```bash
# install sinon and its types
> npm i -D sinon @types/sinon
```

```bash

# install proxyquire and its types
> npm i -D proxyquire @types/proxyquire
```

- Create a test file `tests/app.test.ts` (create the tests folder beside the src folder, not inside it):

```typescript
// tests/app.test.ts
import assert from "assert";
import chai from "chai";
import sinon from "sinon";
import proxyquire from "proxyquire";

const expect = chai.expect;

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```
