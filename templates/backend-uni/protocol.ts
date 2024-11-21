export const HelloBackendService = Symbol('HelloBackendService');
export const HELLO_BACKEND_PATH = '/services/helloBackend';

export interface HelloBackendService {
    sayHelloTo(name: string): Promise<string>
}
