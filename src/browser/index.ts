import Base  = require('yeoman-generator');

module.exports = class TheiaBrowser extends Base {

    path() {
        this.sourceRoot(__dirname + '/../../templates')
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('app-package.json'),
            this.destinationPath('browser-app/package.json'),
            {
                appMode: 'browser',
                params: (this.options as any).params
            }
        );
    }
}