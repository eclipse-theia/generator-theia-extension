/**
 * Generated using theia-extension-generator
 */
<% if (params.example) { %>
import { <%= params.extensionPrefix %>CommandContribution, <%= params.extensionPrefix %>MenuContribution } from './<%= params.extensionPath %>-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
<% } %>
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    <% if (params.example) { %>
    bind(CommandContribution).to(<%= params.extensionPrefix %>CommandContribution);
    bind(MenuContribution).to(<%= params.extensionPrefix %>MenuContribution);
    <% } %>
});