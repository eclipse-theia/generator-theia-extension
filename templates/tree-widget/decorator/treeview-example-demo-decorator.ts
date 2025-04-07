import { Emitter, MaybePromise } from '@theia/core';
import { DepthFirstTreeIterator, Tree, TreeDecorator } from '@theia/core/lib/browser';
import { WidgetDecoration } from '@theia/core/lib/browser/widget-decoration';
import { Event } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';
import { ExampleTreeLeaf } from '../treeview-example-model';

/**
 * Example TreeDecorator implementation for our tree widget.
 */
@injectable()
export class TreeviewExampleDemoDecorator implements TreeDecorator {
    /** Decorator id - required by the TreeDecorator interface */
    id = 'TreeviewExampleDecorator';

    /** Event Emitter for when the decorations change - required by the TreeDecorator interface */
    protected readonly emitter = new Emitter<(tree: Tree) => Map<string, WidgetDecoration.Data>>();    
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, WidgetDecoration.Data>> {
        return this.emitter.event;
    }

    /** 
     * The actual decoration calculation.
     * 
     * In contrast to label providers, decorators provide decorations for the complete tree at once.
     * 
     * @param tree the tree to decorate.
     * @returns a Map of node IDs mapped to decorations.
     */
    decorations(tree: Tree): MaybePromise<Map<string, WidgetDecoration.Data>> {
        const result = new Map();

        if (tree.root === undefined) {
            return result;
        }

        // iterate the tree
        for (const treeNode of new DepthFirstTreeIterator(tree.root)) {
            // in our case, we only decorate leaf nodes
            if (ExampleTreeLeaf.is(treeNode)) {
                // we distinguish between high and low stock levels based on the quantity
                const amount = treeNode.data.quantity || 0;
                if (amount > 4) {
                    // we use a green checkmark icon decoration for high stock levels
                    result.set(treeNode.id, <WidgetDecoration.Data>{
                        iconOverlay: {
                            position: WidgetDecoration.IconOverlayPosition.BOTTOM_RIGHT,
                            iconClass: ['fa', 'fa-check-circle'],
                            color: 'green'
                        }
                    });
                } else {
                    // for low stock levels, we use a red background color and a warning text suffix
                    result.set(treeNode.id, <WidgetDecoration.Data>{
                        backgroundColor: 'red',
                        captionSuffixes: [{ data: 'Warning: low stock', fontData: { style: 'italic' } }]
                    });
                }
            }
        }
        return result;
    }
}
