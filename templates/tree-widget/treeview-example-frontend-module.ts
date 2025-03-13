import { bindContributionProvider } from '@theia/core';
import { bindViewContribution, createTreeContainer, LabelProviderContribution, WidgetFactory } from '@theia/core/lib/browser';
import { Container, ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { TreeviewExampleDecorationService, TreeviewExampleDecorator } from './decorator/treeview-example-decoration-service';
import { TreeviewExampleDemoDecorator } from './decorator/treeview-example-demo-decorator';
import { TreeViewExampleLabelProvider } from './treeview-example-label-provider';
import { TreeViewExampleModel } from './treeview-example-model';
import { TreeviewExampleTree } from './treeview-example-tree';
import { TreeviewExampleViewContribution } from './treeview-example-view-contribution';
import { TREEVIEW_EXAMPLE_CONTEXT_MENU, TreeViewExampleWidget } from './treeview-example-widget';

/**
 * Frontend contribution bindings.
 */
export default new ContainerModule(bind => {
    bindViewContribution(bind, TreeviewExampleViewContribution);

    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TreeViewExampleWidget.ID,
        createWidget: () => createTreeViewExampleViewContainer(ctx.container).get(TreeViewExampleWidget)
    })).inSingletonScope();

    bind(TreeViewExampleModel).toSelf().inSingletonScope();
    bind(LabelProviderContribution).to(TreeViewExampleLabelProvider);

    bind(TreeviewExampleDemoDecorator).toSelf().inSingletonScope();
    bind(TreeviewExampleDecorator).toService(TreeviewExampleDemoDecorator);
});

/**
 * Create the child container which contains the `TreeViewExampleWidget` and all its collaborators
 * in an isolated child container so the bound services affect only the `TreeViewExampleWidget`
 *
 * @param parent the parent container
 * @returns the new child container
 */
function createTreeViewExampleViewContainer(parent: interfaces.Container): Container {
    const child = createTreeContainer(parent, {
        tree: TreeviewExampleTree,
        model: TreeViewExampleModel,
        widget: TreeViewExampleWidget,
        props: {
            contextMenuPath: TREEVIEW_EXAMPLE_CONTEXT_MENU,
            multiSelect: false,
            search: true,
            expandOnlyOnExpansionToggleClick: false
        },
        decoratorService: TreeviewExampleDecorationService,
    });
    bindContributionProvider(child, TreeviewExampleDecorator);
    return child;
}
