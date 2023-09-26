import { csoundGenerator } from "./csound_generator.js";
import { toolbox } from "./toolbox.js";
import { save, load } from "./serialization.js";
import { generateCsd, loadCsdFromString, pause, rewind, start } from "./csound_linker.js";

//import * as Blockly from 'blockly'
//import {toolbox} from 'toolbox.js';

const runCode = (codeDiv) => { // arrow function
  const code = csoundGenerator.workspaceToCode(window.workspace);
  codeDiv.innerText = code;
}

const blocklyToCsound = () => {
  const instr = csoundGenerator.workspaceToCode(window.workspace);
  const csd = generateCsd(instr, "i 1 0 2");
  loadCsdFromString(csd);
  console.log(csd);
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
    load(window.workspace);

    window.workspace.addChangeListener((e) => {
      // UI events are things like scrolling, zooming, etc.
      // No need to save after one of these.
      if (e.isUiEvent) return;
      save(window.workspace);
    });

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

    document.getElementById("load").addEventListener("click", blocklyToCsound);
    document.getElementById("play").addEventListener("click", start);
    document.getElementById("pause").addEventListener("click", pause);
    document.getElementById("rewind").addEventListener("click", rewind);
}

window.addEventListener('DOMContentLoaded', main);