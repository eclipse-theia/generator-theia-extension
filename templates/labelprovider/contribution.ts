import { MaybePromise } from "@theia/core";
import { LabelProviderContribution } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { FileStat } from "@theia/filesystem/lib/common";
import { injectable } from "inversify";

@injectable()
export class <%= params.extensionPrefix %>LabelProviderContribution implements LabelProviderContribution {
    canHandle(uri: object): number {
        let toCheck = uri;
        if (FileStat.is(toCheck)) {
            toCheck = new URI(toCheck.uri);
        }
        if (toCheck instanceof URI) {
            if (toCheck.path.ext === '.my') {
                return 1000;
            }
        }
        return 0;
    }

    getIcon(): MaybePromise<string> {
        return 'my-icon';
    }

    getName(uri: URI): string {
        return uri.displayName + " (with my label)";
    }

    getLongName(uri: URI): string {
        return uri.path.toString();
    }
}
