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
  "type": "out",
  "message0": 'out %1 %2',
  "args0": [
    {
      "type": "field_variable",
      "name": "ARG1"
    },
    {
      "type": "field_variable",
      "name": "ARG2"
    }
  ],
  "previousStatement": null,
  "colour": 160,
  "tooltip": "instrument block", // change later
  "helpUrl": "https://csound.com/docs/manual/instr.html"
},
{
  "type": "UDO",
  "message0": 'opcode %1 %2, %3', // ideally, the translator will automatically fill in the input/output rates 
  "args0": [
    {
      "type": "field_input", // might change to variable name?
      "name": "NAME"
    },
    {
      "type": "field_input",
      "name": "IN_ARG_RATE"
    },
    {
      "type": "field_input",
      "name": "OUT_ARG_RATE"
    }
  ],
  "message1": "%1 endop",
  "args1": [
    {
      "type": "input_statement",
      "name": "ELEMENTS"
    }
  ],
  "colour": 20,
  "tooltip": "user-defined opcode", // change later
  "helpUrl": "https://csound.com/docs/manual/OrchUDO.html"
},
{
  "type": "xin",
  "message0": '%1 %2 xin', // need to be able to dynamically add connections
  "args0": [
    {
      "type": "field_variable",
      "name": "ARG1"
    },
    {
      "type": "field_variable",
      "name": "ARG2"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "instrument block", // change later
  "helpUrl": "https://csound.com/docs/manual/instr.html"
},
{
  "type": "xout",
  "message0": 'xout %1', // need to be able to dynamically add connections
  "args0": [
    {
      "type": "field_variable",
      "name": "ARG1"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "instrument block", // change later
  "helpUrl": "https://csound.com/docs/manual/instr.html"
}]);

// Performance block definitions
Blockly.defineBlocksWithJsonArray([{
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
},
{
  "type": "p-fields",
  "message0": 'p%1', // need to be able to dynamically add connections
  "args0": [
    {
      "type": "field_number",
      "name": "ARG1"
    }
  ],
  "output": null,
  "colour": 160,
  "tooltip": "instrument block", // change later
  "helpUrl": "https://csound.com/docs/manual/instr.html"
}
])

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
  "colour": 200
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
  "nextStatement": null,
  "colour": 200
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
  "nextStatement": null,
  "colour": 200
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
  "colour": 290,
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
  "colour": 290,
  "tooltip": "vco2 xamp, xcps[, ifn, iphs]",
  "helpUrl": "http://www.csounds.com/manual/html/vco2.html"
},
{
  "type": "noise",
  "message0": 'noise %1, %2', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "AMP"
    },
    {
      "type": "input_value",
      "name": "BETA"
    }
  ],
  "output": null,
  "colour": 290,
  "tooltip": "noise xamp, kbeta",
  "helpUrl": "https://csound.com/docs/manual/noise.html"
}]);

// Envelope block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "linen",
  "message0": 'linen %1, %2, %3, %4', // figure out how to add option for 2, 3, and 4 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "AMP"
    },
    {
      "type": "input_value",
      "name": "RISE"
    },
    {
      "type": "input_value",
      "name": "DUR"
    },
    {
      "type": "input_value",
      "name": "DECAY"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "linen xamp, irise, idur, idec",
  "helpUrl": "http://www.csounds.com/manual/html/linen.html"
},
{
  "type": "expon",
  "message0": 'expon %1, %2, %3', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "START"
    },
    {
      "type": "input_value",
      "name": "DUR"
    },
    {
      "type": "input_value",
      "name": "END"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "expon ia, idur, ib",
  "helpUrl": "http://www.csounds.com/manual/html/expon.html"
}]);

// Filter block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "lowpass",
  "message0": 'lowpass %1, %2, %3', // figure out how to add option for 2, 3, and 4 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "SIGNAL"
    },
    {
      "type": "input_value",
      "name": "CENTRE_FREQ"
    },
    {
      "type": "input_value",
      "name": "CUTOFF"
    }
  ],
  "output": null,
  "colour": 360,
  "tooltip": "lowpass2 asig, kcf, kq",
  "helpUrl": "http://www.csounds.com/manual/html/lowpass2.html"
},
{
  "type": "highpass",
  "message0": 'highpass %1, %2', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "SIGNAL"
    },
    {
      "type": "input_value",
      "name": "CUTOFF"
    }
  ],
  "output": null,
  "colour": 360,
  "tooltip": "atone asig, khp [, iskip]",
  "helpUrl": "http://www.csounds.com/manual/html/atone.html"
},
{
  "type": "bandpass",
  "message0": 'bandpass %1, %2, %3', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "SIGNAL"
    },
    {
      "type": "input_value",
      "name": "FREQ"
    },
    {
      "type": "input_value",
      "name": "BAND"
    }
  ],
  "output": null,
  "colour": 360,
  "tooltip": "butterbp asig, kcf, xband",
  "helpUrl": "http://www.csounds.com/manual/html/butterbp.html"
}]);

// Delay block definitions
Blockly.defineBlocksWithJsonArray([{
  "type": "delay",
  "message0": 'lowpass %1, %2', // figure out how to add option for 2, 3, and 4 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "SIGNAL"
    },
    {
      "type": "input_value",
      "name": "DELAY_TIME"
    }
  ],
  "output": null,
  "colour": 360,
  "tooltip": "delay asig, idlt",
  "helpUrl": "http://www.csounds.com/manual/html/delay.html"
},
{
  "type": "reverb",
  "message0": 'reverb %1, %2', // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "SIGNAL"
    },
    {
      "type": "input_value",
      "name": "REVERB_TIME"
    }
  ],
  "output": null,
  "colour": 360,
  "tooltip": "reverb asig, krvt",
  "helpUrl": "http://www.csounds.com/manual/html/reverb.html"
}]);