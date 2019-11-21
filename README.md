<div align='center'>
<br />
<img src='https://raw.githubusercontent.com/theia-ide/generator-theia-extension/master/logo/theia.svg?sanitize=true' alt='theia logo' width='125'>

<h2>THEIA - EXTENSION GENERATOR</h2>

A [Yeoman](yeoman.io) generator that scaffolds a project structure for developing extensions to the [Theia IDE](https://github.com/theia-ide/theia).

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

Extension options
1. `hello-world`: creates a simple extension which provides a command and menu item which displays a message.
2. `widget`: creates the basis for a simple widget including a toggle command, alert message and button displaying a message.
3. `labelprovider`: create a simple extension which adds a custom label (with icon) for `.my` files

For configuration options, see

```
yo theia-extension --help
```


## Publishing

Follow this [instruction](https://docs.npmjs.com/cli/adduser) to login to the npm registry with a user account.

If you don't have an account contact [Theia organization](https://www.npmjs.com/~theia) to request one.

Publish with [np](https://github.com/sindresorhus/np#np--).

    npx np


## License

[Apache-2.0](LICENSE)
