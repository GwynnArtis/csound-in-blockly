import { csoundGenerator } from "./csound_generator.js";
import { toolbox } from "./toolbox.js"

//import * as Blockly from 'blockly'
//import {toolbox} from 'toolbox.js';

const runCode = (codeDiv) => { // arrow function
  const code = csoundGenerator.workspaceToCode(window.workspace);
  codeDiv.innerText = code;
}

function main() { 
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    const codeDiv = document.getElementById('generatedCode');
    window.workspace = Blockly.inject(blocklyDiv, { toolbox: toolbox }); // what do I get window from? 
    const onresize = function (e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element = blocklyArea;
        let x = 0;
        let y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();

    window.workspace.addChangeListener((e) => {
      // Don't run the code when the workspace finishes loading; we're
      // already running it once when the application starts.
      // Don't run the code during drags; we might have invalid state.
      if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
        window.workspace.isDragging()) {
        return;
      }
      runCode(codeDiv);
    });
}

window.addEventListener('DOMContentLoaded', main);