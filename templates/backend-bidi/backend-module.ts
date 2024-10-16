import { ConnectionHandler, RpcConnectionHandler } from '@theia/core';
import { ContainerModule } from '@theia/core/shared/inversify';
import { BackendClient, HelloBackendWithClientService, HELLO_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
import { HelloBackendWithClientServiceImpl } from './hello-backend-with-client-service';

export default new ContainerModule(bind => {
    bind(HelloBackendWithClientService).to(HelloBackendWithClientServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler<BackendClient>(HELLO_BACKEND_WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<HelloBackendWithClientServiceImpl>(HelloBackendWithClientService);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});
