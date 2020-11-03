import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { ApplicationShell, NavigatableWidgetOptions, OpenerService, WidgetOpenerOptions } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable } from 'inversify';
import {
  BaseTreeEditorContribution,
  MasterTreeWidget,
  TreeEditor,
} from '@eclipse-emfcloud/theia-tree-editor';

import { TreeModelService } from './tree/tree-model-service';
import { TreeEditorWidget } from './tree/tree-editor-widget';
import { TreeLabelProvider } from './tree/tree-label-provider';

@injectable()
export class TreeContribution extends BaseTreeEditorContribution {
    @inject(ApplicationShell) protected shell: ApplicationShell;
    @inject(OpenerService) protected opener: OpenerService;

    constructor(
        @inject(TreeModelService) modelService: TreeEditor.ModelService,
        @inject(TreeLabelProvider) labelProvider: TreeLabelProvider
    ) {
        super(TreeEditorWidget.WIDGET_ID, modelService, labelProvider);
    }

    readonly id = TreeEditorWidget.WIDGET_ID;
    readonly label = MasterTreeWidget.WIDGET_LABEL;

    canHandle(uri: URI): number {
        if (uri.path.ext === '.tree') {
            return 1000;
        }
        return 0;
    }

    registerCommands(commands: CommandRegistry): void {
        // register your custom commands here

        super.registerCommands(commands);
    }

    registerMenus(menus: MenuModelRegistry): void {
        // register your custom menu actions here

        super.registerMenus(menus);
    }

    protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions {
        return {
            kind: 'navigatable',
            uri: this.serializeUri(uri)
        };
    }

    protected serializeUri(uri: URI): string {
        return uri.withoutFragment().toString();
    }

}
