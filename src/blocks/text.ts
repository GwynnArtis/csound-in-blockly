/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

const addText: any = {
  type: "add_text",
  message0: "Add text %1 with color %2",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
    {
      type: "input_value",
      name: "COLOR",
      check: "Colour",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: "",
  helpUrl: "",
};

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
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
const out: any = {
  type: "out",
  message0: "out %1 %2",
  args0: [
    {
      type: "field_variable",
      name: "ARG1",
    },
    {
      type: "field_variable",
      name: "ARG2",
    },
  ],
  previousStatement: null,
  colour: 160,
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
const UDO: any = {
  type: "UDO",
  message0: "opcode %1 %2, %3", // ideally, the translator will automatically fill in the input/output rates
  args0: [
    {
      type: "field_input", // might change to variable name?
      name: "NAME",
    },
    {
      type: "field_input",
      name: "IN_ARG_RATE",
    },
    {
      type: "field_input",
      name: "OUT_ARG_RATE",
    },
  ],
  message1: "%1 endop",
  args1: [
    {
      type: "input_statement",
      name: "ELEMENTS",
    },
  ],
  colour: 20,
  tooltip: "user-defined opcode", // change later
  helpUrl: "https://csound.com/docs/manual/OrchUDO.html",
};
const xin: any = {
  type: "xin",
  message0: "inputs: %1", // need to be able to dynamically add connections
  args0: [
    {
      type: "field_statement",
      name: "ARGS",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 20,
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
const xout: any = {
  type: "xout",
  message0: "xout %1", // need to be able to dynamically add connections
  args0: [
    {
      type: "field_variable",
      name: "ARG1",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 20,
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};

// Performance block definitions
const scheduleInInstr: any = {
  type: "schedule_in_instr",
  message0: "play instr: %1, start: %2, dur: %3", // need to add dynamic resizing
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
  previousStatement: null, // might add 'schedule_in_block' separately and put these lines in there instead
  nextStatement: null,
  colour: 160,
  tooltip:
    "Plays an instance of a specified instrument at given start and duration times. Use p-fields as additional arguments",
  helpUrl: "http://www.csounds.com/manual/html/schedule.html",
};
const scheduleGlobally: any = {
  type: "schedule_global",
  message0: "play instr: %1, start: %2, dur: %3", // need to add dynamic resizing
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
  colour: 160,
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
  colour: 160,
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};
export const pFieldSet: any = {
  type: "pfield_set",
  message0: "p%1 = %2",
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
  colour: 160,
  tooltip: "instrument block", // change later
  helpUrl: "https://csound.com/docs/manual/instr.html",
};

// Variable block definitions
const variable_get: any = {
  type: "variable_get",
  message0: "%1",
  args0: [
    {
      type: "field_variable",
      name: "NAME", // Static name of the field
      variable: "%{BKY_VARIABLES_DEFAULT_NAME}", // Given at runtime
    },
  ],
  output: null, // Null means the return value can be of any type
  colour: 200,
};
const variable_set: any = {
  type: "variable_set",
  message0: "set %1 to %2",
  args0: [
    {
      type: "field_variable",
      name: "NAME",
      variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
      variableTypes: ["String"],
      defaultType: "String",
    },
    {
      type: "input_value",
      name: "VALUE",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 200,
};
// const variable_change: any = { // might remove
//   type: "variable_change",
//   message0: "change %1 by %2",
//   args0: [
//     {
//       type: "field_variable",
//       name: "NAME",
//       variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
//     },
//     {
//       type: "input_value", // This expects an input of any type
//       name: "VALUE",
//     },
//   ],
//   previousStatement: null,
//   nextStatement: null,
//   colour: 200,
// };

// Math block definitions
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
        ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
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
  extensions: ["math_op_tooltip"]
};

// Oscillator block definitions
const oscili: any = {
  type: "oscili",
  message0: "oscili %1 %2", // figure out how to add option for 2, 3, and 4 arguments to be passed
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "AMP",
    },
    {
      type: "input_value",
      name: "FREQ",
    },
  ],
  message1: "ifn? %1 iphs? %2",
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
  colour: 290,
  tooltip: "oscili xamp, xcps[, ifn = -1, iphs = 0]",
  helpUrl: "http://www.csounds.com/manual/html/oscili.html",
};
const vco2: any = {
  type: "vco2",
  message0: "vco2 %1 %2 imode? %3", // add more optional arguments
  inputsInline: true,
  args0: [
    {
      type: "input_value",
      name: "AMP",
    },
    {
      type: "input_value",
      name: "FREQ",
    },
    {
      type: "input_value",
      name: "IMODE",
    },
    // {
    //   type: "input_value",
    //   name: "KPW",
    // },
    // {
    //   type: "input_value",
    //   name: "KPHS",
    // },
    // {
    //   type: "input_value",
    //   name: "INYX",
    // },
  ],
  output: null,
  colour: 290,
  tooltip: "vco2 xamp, xcps[, ifn, iphs]",
  helpUrl: "http://www.csounds.com/manual/html/vco2.html",
};
const noise: any = {
  type: "noise",
  message0: "noise %1, %2", // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
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
  colour: 290,
  tooltip: "noise xamp, kbeta",
  helpUrl: "https://csound.com/docs/manual/noise.html",
};

// Envelope block definitions
const linen: any = {
  type: "linen",
  message0: "linen %1, %2, %3, %4", // figure out how to add option for 2, 3, and 4 arguments to be passed
  inputsInline: true,
  args0: [
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
  colour: 330,
  tooltip: "linen xamp, irise, idur, idec",
  helpUrl: "http://www.csounds.com/manual/html/linen.html",
};
const expon: any = {
  type: "expon",
  message0: "expon %1, %2, %3", // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
  inputsInline: true,
  args0: [
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
  colour: 330,
  tooltip: "expon ia, idur, ib",
  helpUrl: "http://www.csounds.com/manual/html/expon.html",
};

// Filter block definitions
const lowpass: any = {
  type: "lowpass",
  message0: "lowpass %1, %2, %3", // figure out how to add option for 2, 3, and 4 arguments to be passed
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
  colour: 360,
  tooltip: "lowpass2 asig, kcf, kq",
  helpUrl: "http://www.csounds.com/manual/html/lowpass2.html",
};
const highpass: any = {
  type: "highpass",
  message0: "highpass %1 %2 skip? %3", // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
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
  colour: 360,
  tooltip: "atone asig, khp [, iskip]",
  helpUrl: "http://www.csounds.com/manual/html/atone.html",
};
const bandpass: any = {
  type: "bandpass",
  message0: "bandpass %1, %2, %3", // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
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
  colour: 360,
  tooltip: "butterbp asig, kcf, xband",
  helpUrl: "http://www.csounds.com/manual/html/butterbp.html",
};

// Delay block definitions
const delay: any = {
  type: "delay",
  message0: "delay %1, %2", // figure out how to add option for 2, 3, and 4 arguments to be passed
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
  colour: 360,
  tooltip: "delay asig, idlt",
  helpUrl: "http://www.csounds.com/manual/html/delay.html",
};
const reverb: any = {
  type: "reverb",
  message0: "reverb %1, %2", // figure out how to add option for 2, 3, 4, 5 and 6 arguments to be passed
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
  colour: 360,
  tooltip: "reverb asig, krvt",
  helpUrl: "http://www.csounds.com/manual/html/reverb.html",
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  // General
  instrument,
  out,
  UDO,
  xin,
  xout,
  // Performance
  scheduleInInstr,
  scheduleGlobally,
  pField,
  pFieldSet,
  // Variables
  variable_get,
  variable_set,
  // variable_change, // remove?
  // Arrays

  // Math
  addition,
  // Control flow

  // Oscillators
  oscili,
  vco2,
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
  // Other
]);
