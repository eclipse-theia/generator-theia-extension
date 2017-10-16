import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MAIN_MENU_BAR, MessageService } from "@theia/core/lib/common";
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
        registry.registerCommand(<%= params.extensionPrefix %>Command);
        registry.registerHandler(<%= params.extensionPrefix %>Command.id, {
            execute: (): any => {
                this.messageService.info('Hello World!');
                return null;
            },
            isEnabled: () => true
        });
    }
}

@injectable()
export class <%= params.extensionPrefix %>MenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction([
            MAIN_MENU_BAR,
            CommonMenus.EDIT_MENU,
            CommonMenus.EDIT_MENU_FIND_REPLACE_GROUP
        ], {
                commandId: <%= params.extensionPrefix %>Command.id,
                label: 'Say Hello'
            });
    }
}