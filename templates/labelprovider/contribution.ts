import { FileStatNode } from '@theia/filesystem/lib/browser/file-tree/file-tree';
import { FileTreeLabelProvider } from '@theia/filesystem/lib/browser/file-tree/file-tree-label-provider';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class <%= params.extensionPrefix %>LabelProviderContribution extends FileTreeLabelProvider {
    
    canHandle(element: object): number {
        if (FileStatNode.is(element)) {
            let uri = element.uri;
            if (uri.path.ext === '.my') {
                return super.canHandle(element)+1;
            }
        }
        return 0;
    }

    getIcon(): string {
        return 'fa fa-star-o';
    }

    getName(fileStatNode: FileStatNode): string {
        return super.getName(fileStatNode) + ' (with my label)';
    }
}
