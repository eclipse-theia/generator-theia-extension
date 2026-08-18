/********************************************************************************
 * Copyright (C) 2019 EclipseSource and others.
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

var assert = require('yeoman-assert')
var helpers = require('yeoman-test');
var path = require('path');
var fs = require('fs');

describe('test extension generation', function () {
    this.timeout(10000);

    it('generate the hello world extension', function (done) {
        const name = 'hello-world-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'hello-world',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        'README.md',
                        `${name}/src/browser/${name}-contribution.ts`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                    ]);

                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('generate the widget extension', function (done) {
        const name = 'widget-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'widget',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        'README.md',
                        `${name}/src/browser/${name}-contribution.ts`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                        `${name}/src/browser/style/index.css`,
                        `${name}/src/browser/${name}-widget.tsx`,
                    ]);

                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    // TSX sources need '@types/react'; it is not pulled in
                    // automatically, so it must be declared explicitly.
                    assert(actual.devDependencies['@types/react'],
                        'expected @types/react in the widget devDependencies');
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('generate the tree-widget extension', function (done) {
        const name = 'tree-widget-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'tree-widget',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        `${name}/package.json`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                        `${name}/src/browser/treeview-example-widget.tsx`,
                        `${name}/src/browser/treeview-example-model.ts`,
                    ]);

                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    // The tree-widget template also compiles TSX and needs '@types/react'.
                    assert(actual.devDependencies['@types/react'],
                        'expected @types/react in the tree-widget devDependencies');
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('generate the labelprovider extension', function (done) {
        const name = 'labelprovider-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'labelprovider',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        'README.md',
                        `${name}/src/browser/${name}-contribution.ts`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                        `${name}/src/browser/style/example.css`
                    ]);

                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });
    it('generate the empty extension', function (done) {
        const name = 'empty-template-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'empty',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        'README.md',
                        `${name}/src/browser/${name}-contribution.ts`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                    ]);
    
                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });
    it('generate the backend extension', function (done) {
        const name = 'backend-template-test';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'backend',
                name
            })
            .withOptions({
                skipInstall: true
            })
            .toPromise().then(function () {
                try {
                    assert.file([
                        'package.json',
                        'README.md',
                        `${name}/src/browser/${name}-contribution.ts`,
                        `${name}/src/browser/${name}-frontend-module.ts`,
                        `${name}/src/common/protocol.ts`,
                        `${name}/src/node/${name}-backend-module.ts`,
                        `${name}/src/node/hello-backend-service.ts`,
                        `${name}/src/node/hello-backend-with-client-service.ts`,
                    ]);
    
                    var body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    var actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });
    
});


describe('test extension generation parameter', function () {
    this.timeout(10000);

    it('uses custom parameters', function (done) {
        const name = 'parameter-test';
        const extensionType = 'widget';
        const author = 'tester';
        const version = '1.2.3';
        const description = 'This is a test description';
        const license = 'MIT Test License';
        const githubURL = 'https://github.com/test';
        const theiaVersion = '3.2.1';
        const lernaVersion = '1.1.1';
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments([name])
            .withOptions({
                skipInstall: true,
                extensionType,
                author,
                version,
                description,
                license,
                githubURL,
                theiaVersion,
                lernaVersion
            })
            .toPromise().then(function () {
                try {
                    assert.file([`${name}/src/browser/${name}-widget.tsx`]);
                    const body = fs.readFileSync(`${name}/package.json`, 'utf8');
                    const actual = JSON.parse(body);
                    assert.equal(actual.name, name);
                    assert.equal(actual.author, author);
                    assert.equal(actual.version, version);
                    assert.equal(actual.description, description);
                    assert.equal(actual.license, license);
                    assert.equal(actual.homepage, githubURL);
                    assert.equal(actual.repository.url, `${githubURL}.git`);
                    assert.equal(actual.bugs.url, `${githubURL}/issues`);
                    assert.equal(actual.dependencies['@theia/core'], theiaVersion);

                    const rootBody = fs.readFileSync('package.json', 'utf8');
                    const rootActual = JSON.parse(rootBody);
                    assert.equal(rootActual.devDependencies['lerna'], lernaVersion);

                    // The widget adds a root 'test' script; it must appear exactly once.
                    // A duplicate key (JSON.parse silently keeps the last) would slip past
                    // the parsed assertions, so check the raw text.
                    const testKeyCount = (rootBody.match(/"test"\s*:/g) || []).length;
                    assert.equal(testKeyCount, 1,
                        `expected a single root "test" script, found ${testKeyCount}`);

                    // The electron version is resolved at generation time; ensure a
                    // concrete version (not a tag or 'undefined') ends up in the app.
                    const electronBody = fs.readFileSync('electron-app/package.json', 'utf8');
                    const electronActual = JSON.parse(electronBody);
                    assert(/^\^?\d+\.\d+\.\d+/.test(electronActual.devDependencies['electron']),
                        `expected a concrete electron version, got '${electronActual.devDependencies['electron']}'`);
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('generate without vscode files', function (done) {
        const name = 'no-vscode-test';
        const extensionType = 'widget';
        const vscode = false;
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments([name])
            .withOptions({
                skipInstall: true,
                extensionType,
                vscode
            })
            .toPromise().then(function () {
                try {
                    assert.noFile([
                        '.vscode/launch.json'
                    ]);

                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('generate standalone', function (done) {
        const name = 'standalone-test';
        const extensionType = 'widget';
        const standalone = true;
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments([name])
            .withOptions({
                skipInstall: true,
                extensionType,
                standalone
            })
            .toPromise().then(function () {
                try {
                    assert.noFile([
                        '.vscode/launch.json',
                        'package.json',
                        'lena.json',
                        'README.md',
                        'browser-app/package.json',
                        'electron-app/package.json'
                    ]);

                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });
});

describe('generator hygiene', function () {

    // yeoman-generator queues every public prototype method (whose name does not
    // start with '_') as a run-loop task and invokes it with the positional CLI
    // arguments. TypeScript's 'private'/'protected' modifiers are erased at runtime,
    // so a helper that is only 'private' still gets auto-run with the wrong argument
    // (see the 'prevent yeoman from invoking internal helpers as run-loop tasks' fix).
    // Helper methods must therefore be '_'-prefixed; only intentional task methods
    // may be public. This test fails if a new helper is added without the prefix.
    it('exposes no public helper methods that yeoman would auto-run as tasks', function () {
        const Generator = require(path.join(__dirname, '../generators/app'));
        const allowedTaskMethods = [
            'constructor', 'path', 'prompting', 'configuring', 'writing', 'install'
        ];
        const leaked = Object.getOwnPropertyNames(Generator.prototype)
            .filter(name => typeof Generator.prototype[name] === 'function')
            .filter(name => !name.startsWith('_'))
            .filter(name => !allowedTaskMethods.includes(name));
        assert.deepEqual(leaked, [],
            `These methods are public and will be auto-run by yeoman with the CLI arguments; ` +
            `prefix them with '_' or add them to the allow-list: ${leaked.join(', ')}`);
    });
});
