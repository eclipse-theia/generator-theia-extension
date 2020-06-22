import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core";
import { ContainerModule } from "inversify";
import { BackendClient, HelloBackendWithClientService, HelloBackendService, HELLO_BACKEND_PATH, HELLO_BACKEND_WITH_CLIENT_PATH } from "../common/protocol";
import { HelloBackendWithClientServiceImpl } from "./hello-backend-with-client-service";
import { HelloBackendServiceImpl } from "./hello-backend-service";

export default new ContainerModule(bind => {
    bind(HelloBackendService).to(HelloBackendServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(HELLO_BACKEND_PATH, () => {
            return ctx.container.get<HelloBackendService>(HelloBackendService);
        })
    ).inSingletonScope();

    bind(HelloBackendWithClientService).to(HelloBackendWithClientServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<BackendClient>(HELLO_BACKEND_WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<HelloBackendWithClientServiceImpl>(HelloBackendWithClientService);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});
