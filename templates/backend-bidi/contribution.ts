import { Command, CommandContribution, CommandRegistry} from '@theia/core/lib/common';
import { inject, injectable } from '@theia/core/shared/inversify';
import { HelloBackendWithClientService } from '../common/protocol';

const SayHelloViaBackendCommandWithCallBack: Command = {
    id: 'sayHelloOnBackendWithCallBack.command',
    label: 'Say hello on the backend with a callback to the client',
};

@injectable()
export class <%= params.extensionPrefix %>CommandContribution implements CommandContribution {

    constructor(
        @inject(HelloBackendWithClientService) private readonly helloBackendWithClientService: HelloBackendWithClientService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SayHelloViaBackendCommandWithCallBack, {
            execute: () => this.helloBackendWithClientService.greet().then(r => console.log(r))
        });
    }
}
