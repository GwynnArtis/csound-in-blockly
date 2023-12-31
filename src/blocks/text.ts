/* Custom block definitions */

import * as Blockly from "blockly/core";

// General block definitions
const instrument: any = {
  type: "instrument",
  message0: "instr %1",
  args0: [
    {
      type: "field_input", 
      name: "NAME",
    },
  ],
  message1: "%1 endin",
  args1: [
    {
      type: "input_statement",
      name: "ELEMENTS",
    },
  ],
  colour: 160,
  tooltip: "instrument block", 
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
const out: any = {
  type: "out",
  message0: "out %1 %2",
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "ARG1",
    },
    {
      type: "input_value",
      name: "ARG2",
    },
  ],
  previousStatement: null,
  colour: 160,
  tooltip: "out opcode that sends signals defined in instrument blocks to the output", 
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
const schedule: any = {
  type: "schedule",
  message0: "play instr: %1, start: %2, dur: %3", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "INSTR",
    },
    {
      type: "input_value",
      name: "START",
    },
    {
      type: "input_value",
      name: "DUR",
    },
  ],
  message1: "p-fields %1",
  args1: [
    {
      type: "input_statement",
      name: "PFIELDS",
    },
  ],
  previousStatement: null, // allows user to put schedule statements inside instrument blocks, but also works when declared globally
  nextStatement: null,
  colour: 100,
  tooltip:
    "Plays an instance of a specified instrument at given start and duration times. Use p-fields as additional arguments",
  helpUrl: "http://www.csounds.com/manual/html/schedule.html",
};
const pField: any = {
  type: "pfield",
  message0: "p%1",
  args0: [
    {
      type: "field_number",
      name: "NUMBER",
      value: "4",
      precision: 1,
    },
  ],
  output: null,
  colour: 100,
  tooltip: "p-field block to use as an argument in opcode/function blocks", 
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
export const pFieldSet: any = {
  type: "pfield_set",
  message0: "set p%1 to %2",
  args0: [
    {
      type: "field_number",
      name: "NUMBER",
      value: "4",
      precision: 1,
    },
    {
      type: "input_value",
      name: "VALUE",
    },
  ],
  nextStatement: null,
  previousStatement: null,
  colour: 100,
  tooltip: "set p-field values in schedule statement blocks", 
  helpUrl: "https://csound.com/docs/manual/instr.html",
};

// Setting variables block definitions
export const init: any = {
  type: "init",
  message0: "init %1", 
  args0: [
    {
      type: "input_value",
      name: "ARG",
    }
  ],
  colour: 160,
  output: null,
  tooltip: "Assigns value of i-time input to i-, k-, or a-rate output",
  helpUrl: "https://csound.com/docs/manual/init.html",
};
const global_variable_get: any = {
  type: "global_variable_get", // for f-tables specifically
  message0: "%1",
  args0: [
    {
      type: "field_variable",
      name: "NAME", 
      variable: "%{BKY_VARIABLES_DEFAULT_NAME}", 
    },
  ],
  colour: 160,
  output: null, 
};
const global_variable_set: any = {
  type: "global_variable_set", // for f-tables specifically 
  message0: "set %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "NAME",
      variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
    },
    {
      type: "input_value",
      name: "VALUE",
    },
  ],
  colour: 160,
};

// Logic block definitions
const addition: any = {
  type: "addition",
  message0: "%1 %2 %3",
  args0: [
    {
      type: "input_value",
      name: "A",
    },
    {
      type: "field_dropdown",
      name: "OP",
      options: [
        ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
        ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
        ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
        ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
        ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
      ],
    },
    {
      type: "input_value",
      name: "B",
    },
  ],
  inputsInline: true,
  output: null,
  colour: 200,
  extensions: ["math_op_tooltip"],
};
const while_loop: any = {
  type: "while_loop",
  message0: "repeat while %1 do %2",
  args0: [
    {
      type: "input_value",
      name: "CONDITION",
    },
    {
      type: "input_statement",
      name: "STATEMENT"
    }
  ],
  colour: 200,
  previousStatement: null,
  nextStatement: null,
}

// Signal Generator block definitions
const oscili: any = {
  type: "oscili",
  message0: "oscili:%1 %2 %3", 
  inputsInline: true,
  args0: [
    {
      type: "field_dropdown",
      name: "RATE",
      options: [
        ["a", "audio-rate"],
        ["k", "control-rate"]
      ]
    },
    {
      type: "input_value",
      name: "AMP",
    },
    {
      type: "input_value",
      name: "FREQ",
    },
  ],
  message1: "ifn? %1 iphs? %2", // optional arguments are hard-coded but optional to the user 
  args1: [
    {
      type: "input_value",
      name: "IFN",
    },
    {
      type: "input_value",
      name: "IPHS",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "oscili xamp, xcps[, ifn = -1, iphs = 0]",
  helpUrl: "http://www.csounds.com/manual/html/oscili.html",
};
const noise: any = {
  type: "noise",
  message0: "noise:a %1 %2", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "AMP",
    },
    {
      type: "input_value",
      name: "BETA",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "noise xamp, kbeta",
  helpUrl: "https://csound.com/docs/manual/noise.html",
};

// Envelope block definitions
const linen: any = {
  type: "linen",
  message0: "linen:%1 %2 %3 %4 %5", 
  inputsInline: true,
  args0: [
    {
      type: "field_dropdown",
      name: "RATE",
      options: [
        ["a", "audio-rate"],
        ["k", "control-rate"]
      ]
    },
    {
      type: "input_value",
      name: "AMP",
    },
    {
      type: "input_value",
      name: "RISE",
    },
    {
      type: "input_value",
      name: "DUR",
    },
    {
      type: "input_value",
      name: "DECAY",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "linen xamp, irise, idur, idec",
  helpUrl: "http://www.csounds.com/manual/html/linen.html",
};
const expon: any = {
  type: "expon",
  message0: "expon:%1 %2 %3 %4", 
  inputsInline: true,
  args0: [
    {
      type: "field_dropdown",
      name: "RATE",
      options: [
        ["a", "audio-rate"],
        ["k", "control-rate"]
      ]
    },
    {
      type: "input_value",
      name: "START",
    },
    {
      type: "input_value",
      name: "DUR",
    },
    {
      type: "input_value",
      name: "END",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "expon ia, idur, ib",
  helpUrl: "http://www.csounds.com/manual/html/expon.html",
};

// Filter block definitions
const lowpass: any = {
  type: "lowpass",
  message0: "lowpass:a %1 %2 %3", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "SIGNAL",
    },
    {
      type: "input_value",
      name: "CENTRE_FREQ",
    },
    {
      type: "input_value",
      name: "CUTOFF",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "lowpass2 asig, kcf, kq",
  helpUrl: "http://www.csounds.com/manual/html/lowpass2.html",
};
const highpass: any = {
  type: "highpass",
  message0: "highpass:a %1 %2 skip? %3", // 'highpass' instead of 'tone' to convey clearer meaning to user
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "SIGNAL",
    },
    {
      type: "input_value",
      name: "CUTOFF",
    },
    {
      type: "input_value",
      name: "ISKIP",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "atone asig, khp [, iskip]",
  helpUrl: "http://www.csounds.com/manual/html/atone.html",
};
const bandpass: any = {
  type: "bandpass",
  message0: "bandpass:a %1 %2 %3", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "SIGNAL",
    },
    {
      type: "input_value",
      name: "FREQ",
    },
    {
      type: "input_value",
      name: "BAND",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "butterbp asig, kcf, xband",
  helpUrl: "http://www.csounds.com/manual/html/butterbp.html",
};

// Delay block definitions
const delay: any = {
  type: "delay",
  message0: "delay:a %1 %2", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "SIGNAL",
    },
    {
      type: "input_value",
      name: "DELAY_TIME",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "delay asig, idlt",
  helpUrl: "http://www.csounds.com/manual/html/delay.html",
};
const reverb: any = {
  type: "reverb",
  message0: "reverb:a %1 %2", 
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "SIGNAL",
    },
    {
      type: "input_value",
      name: "REVERB_TIME",
    },
  ],
  output: null,
  colour: 250,
  tooltip: "reverb asig, krvt",
  helpUrl: "http://www.csounds.com/manual/html/reverb.html",
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  // General
  instrument,
  out,
  schedule,
  pField,
  pFieldSet,
  // Variables
  init,
  global_variable_get,
  global_variable_set,
  // Logic
  addition,
  while_loop,
  // Signal Generators
  oscili,
  noise,
  // Envelopes
  linen,
  expon,
  // Filters
  lowpass,
  highpass,
  bandpass,
  // Delays
  delay,
  reverb,
]);
