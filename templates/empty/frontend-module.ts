/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from '@theia/core/shared/inversify';
import { <%= params.extensionPrefix %>Contribution } from './<%= params.extensionPath %>-contribution';


export default new ContainerModule(bind => {

    // Replace this line with the desired binding, e.g. "bind(CommandContribution).to(<%= params.extensionPrefix %>Contribution)
    bind(<%= params.extensionPrefix %>Contribution).toSelf();
});
