import { Command, CommandContribution, CommandRegistry} from '@theia/core/lib/common';
import { inject, injectable } from '@theia/core/shared/inversify';
import { HelloBackendWithClientService, HelloBackendService } from '../common/protocol';

const SayHelloViaBackendCommandWithCallBack: Command = {
    id: 'sayHelloOnBackendWithCallBack.command',
    label: 'Say hello on the backend with a callback to the client',
};

const SayHelloViaBackendCommand: Command = {
    id: 'sayHelloOnBackend.command',
    label: 'Say hello on the backend',
};

@injectable()
export class <%= params.extensionPrefix %>CommandContribution implements CommandContribution {

    constructor(
        @inject(HelloBackendWithClientService) private readonly helloBackendWithClientService: HelloBackendWithClientService,
        @inject(HelloBackendService) private readonly helloBackendService: HelloBackendService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SayHelloViaBackendCommandWithCallBack, {
            execute: () => this.helloBackendWithClientService.greet().then(r => console.log(r))
        });
        registry.registerCommand(SayHelloViaBackendCommand, {
            execute: () => this.helloBackendService.sayHelloTo('World').then(r => console.log(r))
        });
    }
}
