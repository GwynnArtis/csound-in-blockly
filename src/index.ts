/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { blocks } from "./blocks/text";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";
import { TypedVariableModal } from "@blockly/plugin-typed-variable-modal";
import "./index.css";
import { csoundGenerator } from "./generators/csound";
import {
  generateCsd,
  loadCsdFromString,
  pause,
  rewind,
  start,
} from "./csound_linker";

export const A_RATE = "audio-rate";
export const K_RATE = "control-rate";
export const I_RATE = "init-rate";
export type UPDATE_RATE = typeof A_RATE | typeof K_RATE | typeof I_RATE;

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("generatedCode")?.firstChild;
const blocklyDiv = document.getElementById("blocklyDiv");
const ws = blocklyDiv && Blockly.inject(blocklyDiv, { toolbox });

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = csoundGenerator.workspaceToCode(ws);
  if (codeDiv) codeDiv.textContent = code;
};

const blocklyToCsound = () => {
  const instr = csoundGenerator.workspaceToCode(ws);
  const csd = generateCsd(instr, " "); // hardcoded for now
  loadCsdFromString(csd);
};

document.getElementById("load").addEventListener("click", blocklyToCsound);
document.getElementById("play").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("rewind").addEventListener("click", rewind);
document
  .getElementById("clearWS")
  .addEventListener("click", () => window.localStorage.clear());

// custom typed variable function
const createFlyout = function (workspace: Blockly.Workspace) {
  let xmlList: Element[] = [];
  // Add your button and give it a callback name.
  const button = document.createElement("button");
  button.setAttribute("text", "Create Typed Variable");
  button.setAttribute("callbackKey", "callbackName");
  xmlList.push(button);
  // This gets all the variables that the user creates and adds them to the
  // flyout.
  const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
  xmlList = xmlList.concat(blockList);
  return xmlList;
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
  ws.registerToolboxCategoryCallback("CREATE_TYPED_VARIABLE", createFlyout);
  const typedVarModal = new TypedVariableModal(ws, "callbackName", [
    ["a-rate", A_RATE],
    ["k-rate", K_RATE],
    ["i-rate", I_RATE]
  ]);
  typedVarModal.init();
}
