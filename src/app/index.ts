import path = require('path');
import Base = require('yeoman-generator');

enum ExtensionType {
    HelloWorld = 'hello-world',
    Widget = 'widget',
    LabelProvider = 'labelprovider'
}

module.exports = class TheiaExtension extends Base {

    params: {
        author: string
        version: string
        license: string
        extensionName: string
        extensionType: string
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
        skipInstall: boolean
    };

    constructor(args: string | string[], options: any) {
        super(args, options);

        this.argument('extensionName', {
            type: String,
            required: false,
        });

        this.option('extensionType', { 
            alias: 'y',
            type: String
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
        this.option('skip-install', {
            description: 'Skip install after generation',
            type: Boolean,
            default: false
        });
    }

    path() {
        this.sourceRoot(__dirname + '/../../templates');
    }

    async prompting() {
        let extensionType = (this.options as any).extensionType;
        const inExtensionType = (<any>Object).values(ExtensionType).includes(extensionType);
        if ((extensionType === undefined) || !inExtensionType) {
            if (!(extensionType === undefined)) {
                this.log(`Invalid extension type: ${extensionType}`);
            }
            const answer = await this.prompt({
                type: 'list',
                name: 'type',
                message: "The extension's type",
                choices: [
                    { value: ExtensionType.HelloWorld, name: 'Hello World' },
                    { value: ExtensionType.Widget, name: 'Widget' },
                    { value: ExtensionType.LabelProvider, name: 'LabelProvider' }
                ] 
            });
            (this.options as any).extensionType = answer.type;
        }

        let extensionName = (this.options as any).extensionName;
        if (!extensionName) {
            const answer = await this.prompt({
                type: 'input',
                name: 'name',
                message: "The extension's name",
                default: path.parse(process.cwd()).name
            });
            (this.options as any).extensionName = answer.name;
        }        
    }

    configuring() {
        const options = this.options as any
        const extensionName = options.extensionName as string
        const unscopedExtensionName = extensionName[0] === '@' ?
            extensionName.substring(extensionName.indexOf('/') + 1) :
            extensionName;
        const extensionPath = path.normalize(unscopedExtensionName).replace('/', '-');
        const extensionPrefix = extensionPath.split('-').map(name => this._capitalize(name)).join('');
        const extensionType = options.extensionType;
        const githubURL = options.githubURL;
        this.log(extensionPrefix);
        this.params = {
            ...options,
            extensionName,
            unscopedExtensionName,
            extensionPath,
            extensionPrefix,
            extensionType,
            githubURL,
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
        /** common templates */
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

        /** hello-world */
        if (this.params.extensionType === ExtensionType.HelloWorld) {
            this.fs.copyTpl(
                this.templatePath('hello-world/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            if (this.params.example) {
                this.fs.copyTpl(
                    this.templatePath('hello-world/contribution.ts'),
                    this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                    { params: this.params }
                );
            }
        }

        /** widget */
        if (this.params.extensionType === ExtensionType.Widget) {
            this.fs.copyTpl(
                this.templatePath('widget/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            if (this.params.example) {
                this.fs.copyTpl(
                    this.templatePath('widget/contribution.ts'),
                    this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                    { params: this.params }
                );
                this.fs.copyTpl(
                    this.templatePath('widget/widget.tsx'),
                    this.extensionPath(`src/browser/${this.params.extensionPath}-widget.tsx`),
                    { params: this.params }
                );
                this.fs.copyTpl(
                    this.templatePath('widget/index.css'),
                    this.extensionPath('src/browser/style/index.css'),
                    { params: this.params }
                );
            }
        }

        /** labelprovider */
        if (this.params.extensionType === ExtensionType.LabelProvider) {
            this.fs.copyTpl(
                this.templatePath('labelprovider/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            if (this.params.example) {
                this.fs.copyTpl(
                    this.templatePath('labelprovider/contribution.ts'),
                    this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                    { params: this.params }
                );
                this.fs.copy(
                    this.templatePath('labelprovider/style/baseline_code_black_18dp.png'),
                    this.extensionPath('src/browser/style/baseline_code_black_18dp.png'),
                    { params: this.params }
                );
                this.fs.copy(
                    this.templatePath('labelprovider/style/baseline_code_white_18dp.png'),
                    this.extensionPath('src/browser/style/baseline_code_white_18dp.png'),
                    { params: this.params }
                );
                this.fs.copyTpl(
                    this.templatePath('labelprovider/style/example.css'),
                    this.extensionPath('src/browser/style/example.css'),
                    { params: this.params }
                );
            }
        }

    }

    protected extensionPath(...paths: string[]) {
        return this.destinationPath(this.params.extensionPath, ...paths);
    }

    install() {
        if(!(this.options as any).skipInstall) {
            this.spawnCommand('yarn', []);
        }
    }

    private _capitalize(name: string): string {
        return name.substring(0, 1).toUpperCase() + name.substring(1)
    }
}
