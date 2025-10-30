<div align='center'>
<br />
<img src='https://raw.githubusercontent.com/theia-ide/generator-theia-extension/master/logo/theia.svg?sanitize=true' alt='theia logo' width='125'>

<h2>ECLIPSE THEIA - GENERATOR</h2>



[![Build](https://github.com/theia-ide/generator-theia-extension/workflows/Build/badge.svg?branch=master)](https://github.com/theia-ide/generator-theia-extension/actions?query=branch%3Amaster)
![npm](https://img.shields.io/npm/v/generator-theia-extension?color=blue)

<br />

A [yeoman](https://yeoman.io/) generator that scaffolds a project structure for developing custom [Eclipse Theia](https://github.com/eclipse-theia/theia) applications and extensions.

Please also see:

- [Build your own IDE/Tool based on Eclipse Theia](https://theia-ide.org/docs/composing_applications/)
- [Authoring Theia Extensions](https://theia-ide.org/docs/authoring_extensions/)

<br />

</div>


## How to use

To use it, install `yo` (version 4.x.x) and the `generator` (see next below).

```
npm install -g yo generator-theia-extension
```

To create a sample Theia project (optionally with custom Theia extensions) including a browser and electron app, run:

```
mkdir my-theia-app && cd my-theia-app
yo theia-extension
```

For configuration options, see:

```
yo theia-extension --help
```

## Extension Options

The generator allows to generate an example extension that is directly part of the generated Theia application. Alternativly, you can select 'no-extension' to just generate a Theia application without a custom extension.

| Template Option | Description | Documentation |
|:---|:---|:---|
| `hello-world` | Creates a simple extension which provides a command and menu item which displays a message | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/hello-world/README.md) |
| `widget` | Creates the basis for a simple widget including a toggle command, alert message and button displaying a message. The template also contains an example unit test. | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/widget/README.md) |
| `labelprovider` | Creates a simple extension which adds a custom label (with icon) for .my files | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/labelprovider/README.md) |
| `tree-widget` | Creates a tree view extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/tree-widget/README.md) |
| `empty` | Creates a simple, minimal extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/empty/README.md) |
| `backend` | Creates a backend communication extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/backend/README.md) |
| `no-extension` | Creates a Theia application without any extension | |



## Publishing

Follow this [instruction](https://docs.npmjs.com/cli/adduser) to login to the npm registry with a user account.

If you don't have an account contact [Theia organization](https://www.npmjs.com/~theia) to request one.

Publish with [np](https://github.com/sindresorhus/np#np--).

    npx np

## Integrating Generated Extensions into Theia-based products

If you want to incorporate your Yeoman-generated extension into a Theia-based product, see the official guide: [Adding Yeoman-Generated Extensions to Theia IDE](https://theia-ide.org/docs/blueprint_documentation/#adding-yeoman-generated-extensions-to-theia-ide).

It explains how to add the extension as a dependency, configure it in your Theia product, and verify the integration.

## License

- [Eclipse Public License 2.0](LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](LICENSE)


## Trademark
"Theia" is a trademark of the Eclipse Foundation
https://www.eclipse.org/theia
