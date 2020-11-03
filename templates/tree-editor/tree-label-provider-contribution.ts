import { LabelProviderContribution } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { FileStat } from '@theia/filesystem/lib/common';
import { injectable } from 'inversify';

@injectable()
export class TreeLabelProviderContribution implements LabelProviderContribution {
    canHandle(uri: object): number {
        let toCheck = uri;
        if (FileStat.is(toCheck)) {
            toCheck = new URI(toCheck.uri);
        }
        if (toCheck instanceof URI) {
            if (toCheck.path.ext === '.tree') {
                return 1000;
            }
        }
        return 0;
    }

    getIcon(): string {
        return 'fa fa-coffee dark-purple';
    }
    
    // We don't need to specify getName() nor getLongName() because the default uri label provider is responsible for them.
}
