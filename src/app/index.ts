import path = require('path');
import Base = require('yeoman-generator');

module.exports = class TheiaExtension extends Base {

    params: {
        author: string
        version: string
        license: string
        extensionName: string
        unscopedExtensionName: string
        githubURL: string
        extensionPrefix: string
        extensionPath: string
        example: boolean
        browser: boolean
        electron: boolean
        vscode: boolean
        theiaVersion: string
        lernaVersion: string
    };

    constructor(args: string | string[], options: any) {
        super(args, options);
        this.argument('extensionName', {
            type: String,
            required: false,
        });

        this.option('browser', {
            alias: 'b',
            description: 'Generate a browser app',
            type: Boolean,
            default: true
        });
        this.option('electron', {
            alias: 'e',
            description: 'Generate an electron app',
            type: Boolean,
            default: true
        });
        this.option('example', {
            alias: 'x',
            description: 'Generate an example contribution',
            type: Boolean,
            default: true
        });
        this.option('vscode', {
            alias: 'c',
            description: 'Generate VS Code configs',
            type: Boolean,
            default: true
        })

        this.option('author', {
            alias: 'a',
            description: 'The extension\'s author',
            type: String
        });
        this.option('version', {
            alias: 'v',
            description: 'The extension\'s version',
            type: String,
            default: '0.0.0'
        });
        this.option('description', {
            alias: 'd',
            description: 'The extension\'s description',
            type: String,
        });
        this.option('license', {
            alias: 'l',
            description: 'The extension\'s license',
            type: String
        });
        this.option('githubURL', {
            alias: 'u',
            description: 'The extension\'s Github URL',
            type: String
        });

        this.option('theia-version', {
            alias: 't',
            description: 'The version of Theia to use',
            type: String,
            default: 'latest'
        });
        this.option('lerna-version', {
            description: 'The version of lerna to use',
            type: String,
            default: '2.4.0'
        });
    }

    path() {
        this.sourceRoot(__dirname + '/../../templates');
    }

    prompting() {
        if (!(this.options as any).extensionName)
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: "The extension's name",
                default: path.parse(process.cwd()).name
            }]).then((answers) => {
                (this.options as any).extensionName = answers.name
            });
    }

    configuring() {
        const options = this.options as any
        const extensionName = options.extensionName as string
        const unscopedExtensionName = extensionName[0] === '@' ?
            extensionName.substring(extensionName.indexOf('/') + 1) :
            extensionName;
        const extensionPath = path.normalize(unscopedExtensionName).replace('/', '-');
        const extensionPrefix = extensionPath.split('-').map(name => this._capitalize(name)).join('');
        this.log(extensionPrefix)
        this.params = {
            ...options,
            extensionName,
            unscopedExtensionName,
            extensionPath,
            extensionPrefix,
            theiaVersion: options["theia-version"],
            lernaVersion: options["lerna-version"],
        }
        options.params = this.params
        if ((this.options as any).browser)
            this.composeWith(require.resolve('../browser'), this.options);
        if ((this.options as any).electron)
            this.composeWith(require.resolve('../electron'), this.options);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('root-package.json'),
            this.destinationPath('package.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('lerna.json'),
            this.destinationPath('lerna.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            { params: this.params }
        )
        if (this.params.vscode) {
            this.fs.copyTpl(
                this.templatePath('launch.json'),
                this.destinationPath('.vscode/launch.json'),
                { params: this.params }
            )
        }

        this.fs.copyTpl(
            this.templatePath('extension-package.json'),
            this.extensionPath('package.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.extensionPath('tsconfig.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('frontend-module.ts'),
            this.extensionPath('src/browser/' + this.params.extensionPath + '-frontend-module.ts'),
            { params: this.params }
        );
        if (this.params.example) {
            this.fs.copyTpl(
                this.templatePath('contribution.ts'),
                this.extensionPath('src/browser/' + this.params.extensionPath + '-contribution.ts'),
                { params: this.params }
            );
        }
    }

    protected extensionPath(...paths: string[]) {
        return this.destinationPath(this.params.extensionPath, ...paths);
    }

    install() {
        this.spawnCommand('yarn', []);
    }

    private _capitalize(name: string): string {
        return name.substring(0, 1).toUpperCase() + name.substring(1)
    }
}
