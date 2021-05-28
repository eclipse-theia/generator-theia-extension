import 'reflect-metadata';
import { MessageClient, MessageService } from '@theia/core';
import { ContainerModule, Container } from 'inversify';
import { MockMessageClient, MockMessageService } from './mock-objects/mock-message-service';
import { <%= params.extensionPrefix %>Widget } from '../<%= params.extensionPath %>-widget';
import { render } from '@testing-library/react'

describe('widget extension unit tests', () => {

    let widget: any;

    beforeEach(async () => {
        const module = new ContainerModule( bind => {
            bind(MessageClient).to(MockMessageClient).inSingletonScope();
            bind(MessageService).to(MockMessageService).inSingletonScope();
            bind(<%= params.extensionPrefix %>Widget).toSelf();
        });
        const container = new Container();
        container.load(module);
        widget = container.resolve<<%= params.extensionPrefix %>Widget>(<%= params.extensionPrefix %>Widget);
    });

    it('should render react node correctly', async () => {
        const element = render(widget.render());
        expect(element.queryByText('Display Message')).toBeTruthy();
    });

    it('should inject the message service', async () => {
        widget.displayMessage();
        expect(widget.messageService.infoWasCalled).toBe(true);
    });

});