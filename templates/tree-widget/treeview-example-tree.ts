import { CompositeTreeNode, TreeImpl, TreeNode } from '@theia/core/lib/browser';
import { wait } from '@theia/core/lib/common/promise-util';
import { inject } from '@theia/core/shared/inversify';
import { ExampleTreeNode, ROOT_NODE_ID } from './treeview-example-model';
import { TreeViewExampleTreeItemFactory } from './treeview-example-tree-item-factory';

/**
 * Tree implementation.
 *
 * We override this to enable lazy child node resolution on node expansion.
 */
export class TreeviewExampleTree extends TreeImpl {
    @inject(TreeViewExampleTreeItemFactory) private readonly itemFactory: TreeViewExampleTreeItemFactory;

    /**
     * Resolves children of the given parent node.
     *
     * @param parent the node for which to provide the children
     * @returns a new array of child tree nodes for the given parent node.
     */
    override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        // root children are initialized once and never change, so we just return a copy of the original children
        if (parent.id === ROOT_NODE_ID) {
            return [...parent.children];
        }

        // non-container nodes do not have children, so we return an empty array
        if (!ExampleTreeNode.is(parent)) {
            return [];
        }

        // performance optimization - if the children are resolved already and the number of children is still correct
        // we reuse the already resolved items.
        // Note: In a real application this comparison might require more logic, because if a child is replaced by a
        // different one or if children are reordered, this code would not work...
        if (parent.children.length === parent.data.children?.length) {
            return [...parent.children];
        }

        // simulate asynchronous loading of children. In the UI we can see a busy marker when we expand a node because of this.
        // (in practice, we would call an expensive function to fetch the children and return the corresponding promise)
        await wait(2000);
        return (parent.data.children ?? []).map(i => this.itemFactory.toTreeNode(i));
    }
}
