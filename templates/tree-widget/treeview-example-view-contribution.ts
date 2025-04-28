import { Command, CommandRegistry, MenuModelRegistry } from '@theia/core';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';
import { ExampleTreeNode } from './treeview-example-model';
import { TREEVIEW_EXAMPLE_CONTEXT_MENU, TreeViewExampleWidget } from './treeview-example-widget';

/** Definition of a command to show the TreeView Example View */
export const OpenTreeviewExampleView: Command = {
    id: 'theia-examples:treeview-example-view-command-id'
};

/** Definition of a command to add a new child (to demonstrate context menus) */
export const TreeviewExampleTreeAddItem: Command = {
    id: 'theia-examples:treeview-example-tree-add-item-command-id',
    label: 'Example Tree View: Add New Child'
};

/**
 * Contribution of the `TreeViewExampleWidget`
 */
@injectable()
export class TreeviewExampleViewContribution extends AbstractViewContribution<TreeViewExampleWidget> {
    constructor() {
        super({
            widgetId: TreeViewExampleWidget.ID,
            widgetName: TreeViewExampleWidget.LABEL,
            defaultWidgetOptions: { area: 'right' },
            toggleCommandId: OpenTreeviewExampleView.id
        });
    }

    override registerCommands(commands: CommandRegistry): void {
        super.registerCommands(commands);

        // register the "Add child item" command
        commands.registerCommand(TreeviewExampleTreeAddItem, {
            execute: () => {
                // get the TreeViewExampleWidget
                const widget = this.tryGetWidget();
                if (widget) {
                    // get the selected item
                    const parent = widget.model.selectedNodes[0];
                    if (parent) {
                        // call the addItem logic
                        widget.model.addItem(parent);
                    }
                }
            },
            isVisible: () => {
                // access the TreeViewExampleWidget
                const widget = this.tryGetWidget();
                // only show the command if an ExampleTreeNode is selected
                return !!(widget && widget.model.selectedNodes.length > 0 && ExampleTreeNode.is(widget.model.selectedNodes[0]));
            }
        });
    }

    override registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);

        // add the "Add Child" menu item to the context menu
        menus.registerMenuAction([...TREEVIEW_EXAMPLE_CONTEXT_MENU, '_1'],
            {
                commandId: TreeviewExampleTreeAddItem.id,
                label: 'Add Child'
            });
    }
}
