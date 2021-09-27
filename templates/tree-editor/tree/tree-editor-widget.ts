import { Title, Widget } from '@theia/core/lib/browser';
import { DefaultResourceProvider, ILogger } from '@theia/core/lib/common';
import { EditorPreferences } from '@theia/editor/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { inject, injectable } from '@theia/core/shared/inversify';
import {
  MasterTreeWidget,
  DetailFormWidget,
  NavigatableTreeEditorOptions,
  TreeEditor,
} from '@eclipse-emfcloud/theia-tree-editor';
import { ResourceTreeEditorWidget } from '@eclipse-emfcloud/theia-tree-editor';

@injectable()
export class TreeEditorWidget extends ResourceTreeEditorWidget {
    constructor(
        @inject(MasterTreeWidget)
        readonly treeWidget: MasterTreeWidget,
        @inject(DetailFormWidget)
        readonly formWidget: DetailFormWidget,
        @inject(WorkspaceService)
        readonly workspaceService: WorkspaceService,
        @inject(ILogger) readonly logger: ILogger,
        @inject(NavigatableTreeEditorOptions)
        protected readonly options: NavigatableTreeEditorOptions,
        @inject(DefaultResourceProvider)
        protected provider: DefaultResourceProvider,
        @inject(TreeEditor.NodeFactory)
        protected readonly nodeFactory: TreeEditor.NodeFactory,
        @inject(EditorPreferences)
        protected readonly editorPreferences: EditorPreferences
    ) {
        super(
            treeWidget,
            formWidget,
            workspaceService,
            logger,
            TreeEditorWidget.WIDGET_ID,
            options,
            provider,
            nodeFactory,
            editorPreferences
        );
    }
          
    protected getTypeProperty() {
        return "typeId";
    }
    
    protected configureTitle(title: Title<Widget>): void {
        super.configureTitle(title);
        title.iconClass = 'fa fa-coffee dark-purple';
    }
}

export namespace TreeEditorWidget {
    export const WIDGET_ID = '<%= params.extensionPath %>-tree-editor';
}
    