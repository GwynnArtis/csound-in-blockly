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
  "tooltip": "Defines an instrument object.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "performance",
  "message0": 'schedule %1',
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    },
  ],
  "output": "Number",
  "colour": 160,
  "tooltip": "Returns number of letters in the provided text.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);

// Oscillator block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "oscili",
  "message0": 'oscili %1, %2',
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
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);

Blockly.defineBlocksWithJsonArray([{
  "type": "vco2",
  "message0": 'vco2 %1, %2',
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": 160,
  "tooltip": "Returns number of letters in the provided text.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);

// Variable block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "variables_get",
  "message0": "%1",
  "args0": [
    {    // Beginning of the field variable dropdown
      "type": "field_number",
      "name": "NUMBER",    // Static name of the field
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"    // Given at runtime
    }    // End of the field variable dropdown
  ],
  "output": null,    // Null means the return value can be of any type
}]);