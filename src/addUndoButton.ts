import { WorkspaceLeaf, Plugin, setIcon, Editor, setTooltip } from "obsidian";


export default class UndoButton {
  editor: Editor | null = null;
  plugin: Plugin;
  constructor(plugin: Plugin, editor: Editor) {
    this.editor = editor;
    this.plugin = plugin;

  }

  getUndoButton(explorer: WorkspaceLeaf): HTMLDivElement | null {
    return explorer.view.containerEl.querySelector('.undo-button');
  }


  removeUndoButton(explorer: WorkspaceLeaf): void {
    const button = this.getUndoButton(explorer);
    if (button) {
      button.remove();
    }
  }

  addUndoButton(explorer: WorkspaceLeaf): void {
    const container = explorer.view.containerEl as HTMLDivElement;

    const navContainer = container.querySelector('div.nav-buttons-container') as HTMLDivElement;
    if (!navContainer) {
      return
    }

    const existingButton = this.getUndoButton(explorer);
    if (existingButton) {
      return;
    }

    const newIcon = document.createElement('div');
    newIcon.classList.add('nav-action-button', 'undo-button', 'clickable-icon');
    setIcon(newIcon, 'undo-2');
    setTooltip(newIcon, "Undo the last changes made in the editor (editor changes only)", { delay: 10 });

    // register click event
    this.plugin.registerDomEvent(newIcon, 'click', () => {

      if (!this.editor) {
        return;
      }
      this.editor.focus();
      this.editor.undo();

    });
    navContainer.appendChild(newIcon);
  }
}



