import Base  = require('yeoman-generator');

module.exports = class TheiaElectron extends Base {

    path() {
        this.sourceRoot(__dirname + '/../../templates')
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('app-package.json'),
            this.destinationPath('electron-app/package.json'),
            { 
                appMode: 'electron',
                params: (this.options as any).params
            }
        );
    }
}