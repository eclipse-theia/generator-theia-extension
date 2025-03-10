import { Command, CommandContribution, CommandRegistry} from '@theia/core/lib/common';
import { inject, injectable } from '@theia/core/shared/inversify';
import { HelloBackendService } from '../common/protocol';

const SayHelloViaBackendCommand: Command = {
    id: 'sayHelloOnBackend.command',
    label: 'Say hello on the backend',
};

@injectable()
export class <%= params.extensionPrefix %>CommandContribution implements CommandContribution {

    constructor(
        @inject(HelloBackendService) private readonly helloBackendService: HelloBackendService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SayHelloViaBackendCommand, {
            execute: () => this.helloBackendService.sayHelloTo('World').then(r => console.log(r))
        });
    }
}
