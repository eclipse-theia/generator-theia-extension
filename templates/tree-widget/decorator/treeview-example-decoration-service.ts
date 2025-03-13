import { ContributionProvider } from '@theia/core';
import { AbstractTreeDecoratorService, TreeDecorator } from '@theia/core/lib/browser';
import { inject, injectable, named } from '@theia/core/shared/inversify';

export const TreeviewExampleDecorator = Symbol('TreeviewExampleDecorator');

/**
 * The TreeDecoratorService which manages the TreeDecorator contributions for our tree widget implementation.
 * (Every tree widget has its own TreeDecoratorService instance to manage decorations specifically for that widget.)
 */
@injectable()
export class TreeviewExampleDecorationService extends AbstractTreeDecoratorService {
    constructor(@inject(ContributionProvider) @named(TreeviewExampleDecorator) protected readonly contributions: ContributionProvider<TreeDecorator>) {
        super(contributions.getContributions());
    }
}
