// General block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "instrument",
  "message0": 'instr %1',
  "args0": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message1": "%1 endin",
  "args1": [
    {
      "type": "input_statement",
      "name": "ELEMENTS"
    }
  ],
  "colour": 160,
  "tooltip": "instrument block", // change later
  "helpUrl": "https://csound.com/docs/manual/instr.html"
},
{
  "type": "UDO",
  "message0": 'opcode %1',
  "args0": [
    {
      "type": "field_input",
      "name": "NAME"
    }
  ],
  "message1": "%1 endop",
  "args1": [
    {
      "type": "input_statement",
      "name": "ELEMENTS"
    }
  ],
  "colour": 160,
  "tooltip": "user-defined opcode", // change later
  "helpUrl": "https://csound.com/docs/manual/OrchUDO.html"
},
{
  "type": "schedule",
  "message0": 'play instr: %1, start: %2, dur: %3', // need to add dynamic resizing
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "INSTR"
    },
    {
      "type": "input_value",
      "name": "START"
    },
    {
      "type": "input_value",
      "name": "DUR"
    }
  ],
  // "previousStatement": null, // might add 'schedule_in_block' separately and put these lines in there instead 
  // "nextStatement": null,
  "colour": 160,
  "tooltip": "Plays an instance of a specified instrument at given start and duration times. Other parameters can be specified here",
  "helpUrl": "http://www.csounds.com/manual/html/schedule.html"
}]);

// Oscillator block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "oscili",
  "message0": 'oscili %1, %2', // figure out how to add option for 2, 3, and 4 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "AMP"
    },
    {
      "type": "input_value",
      "name": "FREQ"
    }
  ],
  "output": null,
  "colour": 200,
  "tooltip": "oscili xamp, xcps[, ifn, iphs]",
  "helpUrl": "http://www.csounds.com/manual/html/oscili.html"
},
{
  "type": "vco2",
  "message0": 'vco2 %1, %2', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "AMP"
    },
    {
      "type": "input_value",
      "name": "FREQ"
    }
  ],
  "output": null,
  "colour": 200,
  "tooltip": "vco2 xamp, xcps[, ifn, iphs]",
  "helpUrl": "http://www.csounds.com/manual/html/vco2.html"
}]);

// Envelope block definitions

// Filter block definitions

// Variable block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "variable_get",
  "message0": "%1",
  "args0": [
    { 
      "type": "field_variable",
      "name": "NAME",    // Static name of the field
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"    // Given at runtime
    } 
  ],
  "output": null,    // Null means the return value can be of any type
},
{
  "type": "variable_set",
  "message0": "set %1 to %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
      "variableTypes": ["String"],
      "defaultType": "String"
    },
    {
      "type": "input_value", 
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null
},
{
  "type": "variable_change",
  "message0": "change %1 by %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",    // This expects an input of any type
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null
}]);

