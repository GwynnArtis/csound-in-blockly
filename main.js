const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Oscillators",
        "contents": [
          {
            "kind": "block", // need to create custom blocks 
            "type": "controls_if"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Envelopes",
        "contents": [
          {
            "kind": "block",
            "type": "logic_operation"
          },
          {
            "kind": "block",
            "type": "logic_boolean"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Filters",
        "contents": [
          {
            "kind": "block",
            "type": "string_length"
          },
        ]
      }
    ]
  }

function setUpBlockly() {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    window.workspace = Blockly.inject(blocklyDiv,
        { toolbox: toolbox });
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
}

window.addEventListener('DOMContentLoaded', setUpBlockly);