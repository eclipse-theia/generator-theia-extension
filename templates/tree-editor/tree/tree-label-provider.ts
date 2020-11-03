import { LabelProviderContribution } from '@theia/core/lib/browser';
import { injectable } from 'inversify';
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';

import { CoffeeModel } from './tree-model';
import { TreeEditorWidget } from './tree-editor-widget';

const DEFAULT_COLOR = 'black';

const ICON_CLASSES: Map<string, string> = new Map([
    [CoffeeModel.Type.BrewingUnit, 'fa-fire ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ControlUnit, 'fa-server ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Dimension, 'fa-arrows-alt ' + DEFAULT_COLOR],
    [CoffeeModel.Type.DripTray, 'fa-inbox ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Display, 'fa-tv ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Machine, 'fa-cogs ' + DEFAULT_COLOR],
    [CoffeeModel.Type.MultiComponent, 'fa-cubes ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Processor, 'fa-microchip ' + DEFAULT_COLOR],
    [CoffeeModel.Type.RAM, 'fa-memory ' + DEFAULT_COLOR],
    [CoffeeModel.Type.WaterTank, 'fa-tint ' + DEFAULT_COLOR],
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;

@injectable()
export class TreeLabelProvider implements LabelProviderContribution {

    public canHandle(element: object): number {
        if ((TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element))
            && element.editorId === TreeEditorWidget.WIDGET_ID) {
            return 1000;
        }
        return 0;
    }

    public getIcon(element: object): string | undefined {
        let iconClass: string | undefined;
        if (TreeEditor.CommandIconInfo.is(element)) {
            iconClass = ICON_CLASSES.get(element.type);
        } else if (TreeEditor.Node.is(element)) {
            iconClass = ICON_CLASSES.get(element.jsonforms.type);
        }

        return iconClass ? 'fa ' + iconClass : 'fa ' + UNKNOWN_ICON;
    }

    public getName(element: object): string | undefined {
        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.name) {
            return data.name;
        } else if (data.typeId) {
            return this.getTypeName(data.typeId);
        }

        return undefined;
    }

    private getTypeName(typeId: string): string {
        return CoffeeModel.Type.name(typeId);
    }
}
