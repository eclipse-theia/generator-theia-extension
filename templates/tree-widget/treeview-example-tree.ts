import { CompositeTreeNode, TreeImpl, TreeNode } from '@theia/core/lib/browser';
import { ExampleTreeNode, Item, ROOT_NODE_ID } from './treeview-example-model';

/**
 * Tree implementation.
 *
 * We override this to enable lazy child node resolution on node expansion.
 */
export class TreeviewExampleTree extends TreeImpl {
    /**
     * Resolves children of the given parent node.
     *
     * @param parent the node for which to provide the children
     * @returns a new array of child tree nodes for the given parent node.
     */
    override resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        // root children are initialized once and never change, so we just return a copy of the original children
        if (parent.id === ROOT_NODE_ID) {
            return Promise.resolve([...parent.children]);
        }

        // non-container nodes do not have children, so we return an empty array
        if (!ExampleTreeNode.is(parent)) {
            return Promise.resolve([]);
        }

        // performance optimization - if the children are resolved already and the number of children is still correct
        // we reuse the already resolved items.
        // Note: In a real application this comparison might require more logic, because if a child is replaced by a
        // different one or if children are reordered, this code would not work...
        if (parent.children.length === parent.data.children?.length) {
            return Promise.resolve([...parent.children]);
        }

        // simulate asynchronous loading of children. In the UI we can see a busy marker when we expand a node because of this:
        return new Promise(resolve => {
            setTimeout(() => resolve(parent.data.children!.map(Item.toTreeNode)), 2000);
        });
    }
}
