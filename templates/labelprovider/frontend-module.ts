/**
 * Generated using theia-extension-generator
 */
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import { <%= params.extensionPrefix %>LabelProviderContribution } from './<%= params.extensionPath %>-contribution';
import '../../src/browser/style/example.css';

export default new ContainerModule(bind => {
    // label binding
    bind(LabelProviderContribution).to(<%= params.extensionPrefix %>LabelProviderContribution);
});
