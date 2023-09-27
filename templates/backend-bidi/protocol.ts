import { RpcServer } from '@theia/core/lib/common/messaging';

export const HelloBackendWithClientService = Symbol('BackendWithClient');
export const HELLO_BACKEND_WITH_CLIENT_PATH = '/services/withClient';

export interface HelloBackendWithClientService extends RpcServer<BackendClient> {
    greet(): Promise<string>
}
export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
    getName(): Promise<string>;
}
