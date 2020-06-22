import { injectable } from "inversify";
import { BackendClient, HelloBackendWithClientService } from "../common/protocol";

@injectable()
export class HelloBackendWithClientServiceImpl implements HelloBackendWithClientService {
    private client?: BackendClient;
    greet(): Promise<string> {
        return new Promise<string>((resolve, reject) =>
            this.client ? this.client.getName().then(greet => resolve('Hello ' + greet))
                : reject('No Client'));
    }
    dispose(): void {
        // do nothing
    }
    setClient(client: BackendClient): void {
        this.client = client;
    }

}
