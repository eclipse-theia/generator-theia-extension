<div align='center'>
<br />
<img src='https://raw.githubusercontent.com/theia-ide/generator-theia-extension/master/logo/theia.svg?sanitize=true' alt='theia logo' width='125'>

<h2>ECLIPSE THEIA - EXTENSION GENERATOR</h2>



[![Build](https://github.com/theia-ide/generator-theia-extension/workflows/Build/badge.svg?branch=master)](https://github.com/theia-ide/generator-theia-extension/actions?query=branch%3Amaster)
![npm](https://img.shields.io/npm/v/generator-theia-extension?color=blue)

<br />

A [yeoman](https://yeoman.io/) generator that scaffolds a project structure for developing [Eclipse Theia](https://github.com/eclipse-theia/theia) extensions.


<br />

</div>


## How to use

To use it, install `yo` and the `generator`.

```
npm install -g yo generator-theia-extension
```

To create a sample project with a Theia extension including a browser and electron app, run:

```
mkdir my-extension && cd my-extension
yo theia-extension
```

For configuration options, see:

```
yo theia-extension --help
```

## Extension Options


| Template Option | Description | Documentation |
|:---|:---|:---|
| `hello-world` | Creates a simple extension which provides a command and menu item which displays a message | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/hello-world/README.md) |
| `widget` | Creates the basis for a simple widget including a toggle command, alert message and button displaying a message. The template also contains an example unit test. | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/widget/README.md) |
| `labelprovider` | Creates a simple extension which adds a custom label (with icon) for .my files | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/labelprovider/README.md) |
| `tree-editor` | Creates a tree editor extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/tree-editor/README.md) |
| `empty` | Creates a simple, minimal extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/empty/README.md) |
| `backend` | Creates a backend communication extension | [readme](https://github.com/eclipse-theia/generator-theia-extension/blob/master/templates/backend/README.md) |
| `diagram-editor` | Creates a diagram editor extension | [readme](https://github.com/eclipse-glsp/glsp-examples/blob/master/README.md) |



## Publishing

Follow this [instruction](https://docs.npmjs.com/cli/adduser) to login to the npm registry with a user account.

If you don't have an account contact [Theia organization](https://www.npmjs.com/~theia) to request one.

Publish with [np](https://github.com/sindresorhus/np#np--).

    npx np


## License

- [Eclipse Public License 2.0](LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](LICENSE)


## Trademark
"Theia" is a trademark of the Eclipse Foundation
https://www.eclipse.org/theia
