import { Emitter, Event } from '@theia/core';
import { wait } from '@theia/core/lib/common/promise-util'
import { DidChangeLabelEvent, LabelProviderContribution, TreeNode } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';
import { ExampleTreeLeaf, ExampleTreeNode } from './treeview-example-model';

/**
 * Provider for labels and icons for the `TreeViewExampleWidget`
 */
@injectable()
export class TreeViewExampleLabelProvider implements LabelProviderContribution {
    /**
     * Emitter for the event that is emitted when the label of a tree item changes.
     */
    protected readonly onDidChangeEmitter = new Emitter<DidChangeLabelEvent>();

    /**
     * Decides whether this label provider can provide labels for the given object (in this case only
     * nodes in the TreeViewExampleWidget tree).
     *
     * @param element the element to consider
     * @returns 0 if this label provider cannot handle the element, otherwise a positive integer indicating a
     *   priority. The framework chooses the provider with the highest priority for the given element.
     */
    canHandle(element: object): number {
        if ((ExampleTreeNode.is(element) || ExampleTreeLeaf.is(element))) {
            return 100;
        }
        return 0;
    }

    /**
     * Provides the name for the given tree node.
     *
     * This example demonstrates a name that is partially resolved asynchronously.
     * Whenever a name is requested for an `ExampleTreeLeaf` for the first time, a timer
     * is scheduled. After the timer resolves, the quantity from the model is reported.
     * In the meantime, a "calculating..." label is shown.
     *
     * This works by emitting a label change event when the Promise is resolved.
     *
     * @param element the element for which the name shall be retrieved
     * @returns the name of this element
     */
    getName(element: object): string | undefined {
        // simple implementation for nodes:
        if (ExampleTreeNode.is(element)) {
            return element.data.name;
        }

        // in case of leaves, we simulate asynchronous retrieval
        if (ExampleTreeLeaf.is(element)) {
            if (!element.quantityLabel) {
                // if the quantityLabel is not yet set (not even 'calculating ...'), we schedule its retrieval
                // by simulating a delay using wait(). In practice, you would call an expensive function returnung an
                // actual promise instead of calling wait().
                element.quantityLabel = 'calculating ...';
                wait(1000).then(() => {
                    element.quantityLabel = `${element.data.quantity}`;
                    this.fireNodeChange(element);
                });                
            }

            // assemble the complete name from its parts
            const orderedLabel = element.data.backOrdered ? ' - more are ordered' : '';
            return element.data.name + ` (${element.quantityLabel + orderedLabel})`;
        }

        // this should not happen, because the canHandle() would only return >0 for the tree node types
        return undefined;
    }

    /**
     * Provides an icon (in this case, a fontawesome icon name without the fa- prefix, as the TreeWidget provides built-in support
     * for fontawesome icons).
     *
     * @param element the element for which to provide the icon
     * @returns the icon
     */
    getIcon(element: object): string | undefined {
        if (ExampleTreeNode.is(element)) {
            return 'folder';
        }
        if (ExampleTreeLeaf.is(element)) {
            return 'smile-o';
        }

        return undefined;
    }

    /**
     * Fire the node change event.
     *
     * @param node the node that has been changed
     */
    fireNodeChange(node: TreeNode): void {
        this.onDidChangeEmitter.fire({
            // The element here is the tree row which has a `node` property
            // Since we know exactly which node we have changed, we can match the changed node with the tree row's node
            affects: (element: object) => 'node' in element && element.node === node
        });
    }

    /**
     * Accessor for the emitter (defined by the LabelProviderContribution interface)
     */
    get onDidChange(): Event<DidChangeLabelEvent> {
        return this.onDidChangeEmitter.event;
    }
}
