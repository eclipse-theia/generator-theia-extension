import { injectable } from "inversify";
import { HelloBackendService } from "../common/protocol";

@injectable()
export class HelloBackendServiceImpl implements HelloBackendService {
    sayHelloTo(name: string): Promise<string> {
        return new Promise<string>(resolve => resolve('Hello ' + name));
    }
}
