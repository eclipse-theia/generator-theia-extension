import { injectable } from '@theia/core/shared/inversify';
import { ExampleTreeLeaf, ExampleTreeNode } from './treeview-example-model';

/**
 * Interface for the "business model".
 *
 * (Note: this could be more elaborated, using different interfaces for containers and concrete items, but for this demonstration,
 * we keep the model like this...)
 */
export interface Item {
    name: string; // name of the category/container or item
    children?: Item[]; // the directly contained items; only defined for categories/containers
    quantity?: number; // the quantity of items available (to demonstrate decoration, ...); only defined for items
    backOrdered?: boolean; // whether this item was backordered (to demonstrate checkboxes); only defined for items
}

/**
 * This class encapsulates the logic for mapping business model items to tree nodes.
 */
@injectable()
export class TreeViewExampleTreeItemFactory {
    /**
     * Counter that for each item name stores the next id number to assign for that name,
     * so that all tree items get a unique id 
     */
    private readonly idCounter = new Map<string, number>();

    /**
     * Create a new tree node for the tree model from the given item.
     * 
     * @param item the item to map to a tree node
     * @returns the tree node representing the given item
     */
    public toTreeNode(item: Item): ExampleTreeNode | ExampleTreeLeaf {
        if (item.children) {
            return <ExampleTreeNode>{
                id: this.toTreeNodeId(item),
                data: item,
                expanded: false,
                children: [],
                parent: undefined,
                type: 'node',
                selected: false
            };
        } else {
            return <ExampleTreeLeaf>{
                id: this.toTreeNodeId(item),
                data: item,
                parent: undefined,
                type: 'leaf',
                checkboxInfo: {
                    checked: item.backOrdered,
                }
            };
        }
    }

    /** 
     * Calculate a unique id for a given tree item by using the item's name and appending a unique counter.
     * 
     * @param item the item to calculate the id for
     * @returns the unique id for the given item in the form "{name}-{counter}"
     */
    private toTreeNodeId(item: Item): string {
        const key = item.name;

        // get the next counter for this item's name (or use 0 if this is the first occurrence)
        let count: number;
        if (this.idCounter.has(key)) {
            count = this.idCounter.get(key)!;
        }
        else {
            count = 0;
        }

        // store the new counter for this item's name
        this.idCounter.set(key, count + 1);
        // return the unique id in the form "{name}-{counter}"
        return `${key}-${count}`;
    }
}
