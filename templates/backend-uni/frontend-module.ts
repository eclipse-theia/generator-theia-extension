import { CommandContribution} from '@theia/core';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { ContainerModule } from '@theia/core/shared/inversify';
import { HelloBackendService, HELLO_BACKEND_PATH } from '../common/protocol';
import { <%= params.extensionPrefix %>CommandContribution} from './<%= params.extensionPath %>-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(<%= params.extensionPrefix %>CommandContribution).inSingletonScope();

    bind(HelloBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<HelloBackendService>(HELLO_BACKEND_PATH);
    }).inSingletonScope();
});
