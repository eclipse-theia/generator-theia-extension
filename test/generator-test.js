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
                        `${name}/src/browser/style/example.css`,
                        `${name}/src/browser/style/baseline_code_black_18dp.png`,
                        `${name}/src/browser/style/baseline_code_white_18dp.png`
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
                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });

    it('should not add files, that should not be added', function (done) {
        const name = 'no-file-test';
        const extensionType = 'widget';
        const example = false;
        const vscode = false;
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments([name])
            .withOptions({
                skipInstall: true,
                extensionType,
                example,
                vscode
            })
            .toPromise().then(function () {
                try {
                    assert.noFile([
                        `${name}/src/browser/${name}-contribution.ts`,
                        '.vscode/launch.json'
                    ]);

                    done();
                } catch (e) {
                    done(e);
                }
            }, done);
    });
});
