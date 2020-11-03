import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';

import { CoffeeModel } from './tree-model';
import {
    brewingView,
    coffeeSchema,
    controlUnitView,
    dripTrayView,
    machineView,
    multiComponentView,
    waterTankView,
} from './tree-schema';

@injectable()
export class TreeModelService implements TreeEditor.ModelService {

    constructor(@inject(ILogger) private readonly logger: ILogger) { }

    getDataForNode(node: TreeEditor.Node) {
        return node.jsonforms.data;
    }

    getSchemaForNode(node: TreeEditor.Node) {
        return {
            definitions: coffeeSchema.definitions,
            ...this.getSchemaForType(node.jsonforms.type),
        };
    }

    private getSchemaForType(type: string) {
        if (!type) {
            return undefined;
        }
        const schema = Object.entries(coffeeSchema.definitions)
            .map(entry => entry[1])
            .find(
                definition =>
                    definition.properties && definition.properties.typeId.const === type
            );
        if (schema === undefined) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    }

    getUiSchemaForNode(node: TreeEditor.Node) {
        const type = node.jsonforms.type;
        switch (type) {
            case CoffeeModel.Type.Machine:
                return machineView;
            case CoffeeModel.Type.MultiComponent:
                return multiComponentView;
            case CoffeeModel.Type.ControlUnit:
                return controlUnitView;
            case CoffeeModel.Type.BrewingUnit:
                return brewingView;
            case CoffeeModel.Type.DripTray:
                return dripTrayView;
            case CoffeeModel.Type.WaterTank:
                return waterTankView;
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }

    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
        return CoffeeModel.childrenMapping;
    }

    getNameForType(type: string): string {
        return CoffeeModel.Type.name(type);
    }
}
