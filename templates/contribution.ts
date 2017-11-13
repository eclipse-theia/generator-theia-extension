import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const <%= params.extensionPrefix %>Command = {
    id: '<%= params.extensionPrefix %>.command',
    label: "Shows a message"
};

@injectable()
export class <%= params.extensionPrefix %>CommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

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
            label: 'Say Hello'
        });
    }
}