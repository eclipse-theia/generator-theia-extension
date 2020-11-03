import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService, MAIN_MENU_BAR } from '@theia/core/lib/common';
import { inject, injectable } from 'inversify';
import { WorkspaceRootUriAwareCommandHandler } from '@theia/workspace/lib/browser/workspace-commands';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { NewTreeExampleFileCommandHandler, NewTreeExampleFileCommand } from './example-file-command';

const TREE_EDITOR_MAIN_MENU = [...MAIN_MENU_BAR, '9_treeeditormenu'];

@injectable()
export class NewTreeExampleFileCommandContribution implements CommandContribution {

    constructor(
        @inject(SelectionService)
        private readonly selectionService: SelectionService,
        @inject(WorkspaceService)
        private readonly workspaceService: WorkspaceService,
        @inject(NewTreeExampleFileCommandHandler)
        private readonly newExampleFileHandler: NewTreeExampleFileCommandHandler
    ) { }

    registerCommands(registry: CommandRegistry): void {
      registry.registerCommand(NewTreeExampleFileCommand,
          new WorkspaceRootUriAwareCommandHandler(
              this.workspaceService,
              this.selectionService,
              this.newExampleFileHandler
          )
      );
    }
}

@injectable()
export class NewTreeExampleFileMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerSubmenu(TREE_EDITOR_MAIN_MENU, 'Tree Editor');

        menus.registerMenuAction(TREE_EDITOR_MAIN_MENU, {
            commandId: NewTreeExampleFileCommand.id,
            label: 'New Example File'
        });
    }
}
