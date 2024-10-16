import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const <%= params.extensionPrefix %>Command: Command = {
    id: '<%= params.extensionPrefix %>.command',
    label: 'Say Hello'
};

@injectable()
export class <%= params.extensionPrefix %>CommandContribution implements CommandContribution {
    
    @inject(MessageService)
    protected readonly messageService!: MessageService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(<%= params.extensionPrefix %>Command, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class <%= params.extensionPrefix %>MenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: <%= params.extensionPrefix %>Command.id,
            label: <%= params.extensionPrefix %>Command.label
        });
    }
}
