/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import path = require('path');
import Base = require('yeoman-generator');

enum ExtensionType {
    HelloWorld = 'hello-world',
    Widget = 'widget',
    LabelProvider = 'labelprovider',
    TreeEditor = 'tree-editor',
    Empty = 'empty',
    Backend = 'backend'
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
        browser: boolean
        electron: boolean
        vscode: boolean
        theiaVersion: string
        lernaVersion: string
        skipInstall: boolean
        standalone: boolean
        dependencies: string
        browserDevDependencies: string
        devdependencies: string
        scripts: string
        rootscripts: string
        containsTests: boolean
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
        this.option('standalone', {
            alias: 's',
            description: 'Generate only the extension, no root project, browser app or electron app. Skips install after generation.',
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
                    { value: ExtensionType.Widget, name: 'Widget (with unit tests)' },
                    { value: ExtensionType.LabelProvider, name: 'LabelProvider' },
                    { value: ExtensionType.TreeEditor, name: 'TreeEditor' },
                    { value: ExtensionType.Backend, name: 'Backend Communication' },
                    { value: ExtensionType.Empty, name: 'Empty' }
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
                default: (this.options as any).extensionType
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
            backend: options["extensionType"] === ExtensionType.Backend
        }
        this.params.dependencies = '';
        this.params.browserDevDependencies = '';
        if (this.params.extensionType === ExtensionType.TreeEditor) {
            this.params.dependencies = `,\n    "@theia/editor": "${this.params.theiaVersion}",\n    "@theia/filesystem": "${this.params.theiaVersion}",\n    "@theia/workspace": "${this.params.theiaVersion}",\n    "@eclipse-emfcloud/theia-tree-editor": "next",\n    "uuid": "^3.3.2"`;
            this.params.browserDevDependencies = `,\n    "node-polyfill-webpack-plugin": "latest"`;
        }
        if (this.params.extensionType === ExtensionType.Widget) {
            this.params.devdependencies = `,\n    "@testing-library/react": "^11.2.7",\n    "@types/jest": "^26.0.20",\n    "jest": "^26.6.3",\n    "ts-node": "^9.1.1",\n    "ts-jest": "^26.5.6"`;
            this.params.scripts = `,\n    "test": "jest --config configs/jest.config.ts"`;
            this.params.rootscripts =`,\n    "test": "cd ${this.params.extensionPath} && yarn test"`;
            this.params.containsTests = true;
        }
        options.params = this.params
        if (!options.standalone) {
            if ((options).browser)
                this.composeWith(require.resolve('../browser'), this.options);
            if ((options).electron)
                this.composeWith(require.resolve('../electron'), this.options);
        }
        if (options.standalone) {
            options.skipInstall = true;
            this.log('Please remember to add the standalone extension manually to your root package.json and to your product, e.g. in browser-app/package.json')
        }
    }

    writing() {
        if (!this.options.standalone) {
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
            this.fs.copyTpl(
                this.templatePath('hello-world/contribution.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('hello-world/README.md'),
                this.extensionPath('README.md'),
                { params: this.params }
            );
        }

        /** empty */
        if (this.params.extensionType === ExtensionType.Empty) {
            this.fs.copyTpl(
                this.templatePath('empty/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('empty/contribution.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('empty/README.md'),
                this.extensionPath('README.md'),
                { params: this.params }
            );
        }

        /** widget */
        if (this.params.extensionType === ExtensionType.Widget) {
            this.fs.copyTpl(
                this.templatePath('widget/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
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
            this.fs.copyTpl(
                this.templatePath('widget/README.md'),
                this.extensionPath('README.md'),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('widget/widget.test.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-widget.test.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('widget/configs/jest.config.ts'),
                this.extensionPath(`configs/jest.config.ts`),
                { params: this.params }
            );
         }

        /** backend */
        if (this.params.extensionType === ExtensionType.Backend) {
            this.fs.copyTpl(
                this.templatePath('backend/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/contribution.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/protocol.ts'),
                this.extensionPath(`src/common/protocol.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/hello-backend-service.ts'),
                this.extensionPath(`src/node/hello-backend-service.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/backend-module.ts'),
                this.extensionPath(`src/node/${this.params.extensionPath}-backend-module.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/hello-backend-with-client-service.ts'),
                this.extensionPath(`src/node/hello-backend-with-client-service.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('backend/README.md'),
                this.extensionPath('README.md'),
                { params: this.params }
            );
        }

        /** labelprovider */
        if (this.params.extensionType === ExtensionType.LabelProvider) {
            this.fs.copyTpl(
                this.templatePath('labelprovider/frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('labelprovider/contribution.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-contribution.ts`),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('labelprovider/style/example.css'),
                this.extensionPath('src/browser/style/example.css'),
                { params: this.params }
            );
            this.fs.copyTpl(
                this.templatePath('labelprovider/README.md'),
                this.extensionPath('README.md'),
                { params: this.params }
            );
        }

        /** tree-editor */
        if (this.params.extensionType === ExtensionType.TreeEditor) {
            this.fs.copyTpl(
                this.templatePath('tree-editor/'),
                this.extensionPath(`src/browser/`),
                { params: this.params }
            );
            this.fs.move(
                this.extensionPath('src/browser/README.md'),
                this.extensionPath(`README.md`),
                { params: this.params }
            );
            this.fs.move(
                this.extensionPath('src/browser/tree-frontend-module.ts'),
                this.extensionPath(`src/browser/${this.params.extensionPath}-frontend-module.ts`),
                { params: this.params }
            );
        }

    }

    protected extensionPath(...paths: string[]) {
        return this.destinationPath(this.params.extensionPath, ...paths);
    }

    install() {
        if (!(this.options as any).skipInstall) {
            var command = this.spawnCommand('yarn', []);

            command.on('close', function(code: number){
                if (code !== 0 ) {
                    process.exit(code);
                }
            })
        }
    }

    private _capitalize(name: string): string {
        return name.substring(0, 1).toUpperCase() + name.substring(1)
    }
}

module.exports.ExtensionType = ExtensionType;