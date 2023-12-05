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

import * as path from 'node:path';
import * as url from 'node:url';
import Base, { BaseOptions } from 'yeoman-generator';

export default class TheiaBrowser extends Base<BaseOptions & { params: unknown }> {

    path() {
        this.sourceRoot(path.dirname(url.fileURLToPath(import.meta.url)) + '/../../templates')
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('app-browser-package.json'),
            this.destinationPath('browser-app/package.json'),
            {
                appMode: 'browser',
                params: this.options.params
            }
        );
    }
}
