# <%= params.extensionName %>
The example of how to build the Theia-based applications with the <%= params.extensionName %>.

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Running the browser example

    npm run build:browser
    npm run start:browser

*or:*

    npm run build:browser
    cd browser-app
    npm start

*or:* launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Running the Electron example

    npm run build:electron
    npm run start:electron

*or:*

    npm run build:electron
    cd electron-app
    npm start

*or:* launch `Start Electron Backend` configuration from VS code.

<%if(params.containsTests){%>
## Running the tests

    npm test

*or* run the tests of a specific package with

    cd <%= params.extensionPath %>
    npm test

<%}%>
## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

    npm run watch:browser

*or* watch only specific packages with

    cd <%= params.extensionPath %>
    npm run watch

and the browser example.

    cd browser-app
    npm run watch

Run the example as [described above](#Running-the-browser-example)
## Developing with the Electron example

Start watching all packages, including `electron-app`, of your application with

    npm run watch:electron

*or* watch only specific packages with

    cd <%= params.extensionPath %>
    npm run watch

and the Electron example.

    cd electron-app
    npm run watch

Run the example as [described above](#Running-the-Electron-example)

## Publishing <%= params.extensionName %>

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
