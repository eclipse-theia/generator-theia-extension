import { injectable, inject } from 'inversify';
import { Message, MessageClient, MessageOptions, MessageType, ProgressMessage, ProgressUpdate } from '@theia/core/lib/common/message-service-protocol';
import { CancellationToken, MessageService } from '@theia/core';

@injectable()
export class MockMessageService extends MessageService{
 
    constructor(
        @inject(MessageClient) protected readonly client: MessageClient
    ) { super(client) }
 
    logWasCalled: boolean = false;
    infoWasCalled: boolean = false;
    warnWasCalled: boolean = false;
    errorWasCalled: boolean = false;

    log<T extends string>(message: string, ...actions: T[]): Promise<T | undefined>;
    log<T extends string>(message: string, options?: MessageOptions, ...actions: T[]): Promise<T | undefined>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(message: string, ...args: any[]): Promise<string | undefined> {
        this.logWasCalled = true;
        return this.processMessage(MessageType.Log, message, args);
    }

    info<T extends string>(message: string, ...actions: T[]): Promise<T | undefined>;

    info<T extends string>(message: string, options?: MessageOptions, ...actions: T[]): Promise<T | undefined>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message: string, ...args: any[]): Promise<string | undefined> {
        this.infoWasCalled = true;
        return this.processMessage(MessageType.Info, message, args);
    }
 
    warn<T extends string>(message: string, ...actions: T[]): Promise<T | undefined>;
    warn<T extends string>(message: string, options?: MessageOptions, ...actions: T[]): Promise<T | undefined>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message: string, ...args: any[]): Promise<string | undefined> {
        this.warnWasCalled = true;
        return this.processMessage(MessageType.Warning, message, args);
    }

    error<T extends string>(message: string, ...actions: T[]): Promise<T | undefined>;
    error<T extends string>(message: string, options?: MessageOptions, ...actions: T[]): Promise<T | undefined>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message: string, ...args: any[]): Promise<string | undefined> {
        this.errorWasCalled = true;
        return this.processMessage(MessageType.Error, message, args);
    }
}

@injectable()
export class MockMessageClient {

    showMessage(message: Message): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }

    showProgress(progressId: string, message: ProgressMessage, cancellationToken: CancellationToken): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }
    reportProgress(progressId: string, update: ProgressUpdate, message: ProgressMessage, cancellationToken: CancellationToken): Promise<void> {
        return Promise.resolve(undefined);
    }
}
