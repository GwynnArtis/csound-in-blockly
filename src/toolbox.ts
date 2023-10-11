export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "General",
      contents: [
        {
          kind: "block", // need to create custom blocks
          type: "instrument",
        },
        {
          kind: "block",
          type: "out",
        },
        {
          kind: "block",
          type: "UDO",
        },
        {
          kind: "block",
          type: "xin",
        },
        {
          kind: "block",
          type: "xout",
        },
      ],
    },
    {
      kind: "category",
      name: "Performance",
      contents: [
        {
          kind: "block",
          type: "schedule_in_instr",
        },
        { 
          "kind": "block",
          "type": "schedule_global"
        },
        {
          kind: "block",
          type: "pfield",
        },
        {
          kind: "block",
          type: "pfield_set",
        }
      ],
    },
    {
      kind: "category",
      name: "Numbers and Strings",
      contents: [
        // {
        //   kind: "block",
        //   type: "variable_get",
        // },
        // {
        //   kind: "block",
        //   type: "variable_set",
        // },
        {
          kind: "block",
          type: "math_number",
        },
        {
          kind: "block",
          type: "text",
        }
      ],
    },
    {
      kind: "category",
      name: "Variables",
      custom: "CREATE_TYPED_VARIABLE",
      contents: [
        {
          kind: "block",
          type: "variables_get_dynamic",
        },
        {
          kind: "block",
          type: "variables_set_dynamic",
        }
      ],
    },
    {
      "kind": "category",
      "name": "F-tables",
      "contents": [
        {
          "kind": "block",
          "type": "lists_create_with"
        },
      ]
    },
    {
      kind: "category",
      name: "Logic",
      contents: [
        {
          kind: "block",
          type: "addition",
        },
        {
          kind: "block",
          type: "logic_compare",
        },
        {
          kind: "block",
          type: "controls_if"
        },
        {
          kind: "block",
          type: "while_loop"
        }
      ],
    },
    {
      kind: "category",
      name: "Signal Generators",
      contents: [
        {
          kind: "block",
          type: "oscili",
        },
        {
          kind: "block",
          type: "vco2",
        },
        {
          kind: "block",
          type: "noise",
        },
      ],
    },
    {
      kind: "category",
      name: "Envelopes",
      contents: [
        {
          kind: "block",
          type: "linen",
        },
        {
          kind: "block",
          type: "expon",
        },
      ],
    },
    {
      kind: "category",
      name: "Filters",
      contents: [
        {
          kind: "block",
          type: "lowpass",
        },
        {
          kind: "block",
          type: "highpass",
        },
        {
          kind: "block",
          type: "bandpass",
        },
      ],
    },
    {
      kind: "category",
      name: "Delays",
      contents: [
        {
          kind: "block",
          type: "delay",
        },
        {
          kind: "block",
          type: "reverb",
        },
      ],
    },
    {
      kind: "category",
      name: "Constants",
      contents: [
        {
          kind: "block",
          type: "samplerate",
        },
        {
          kind: "block",
          type: "ksmps",
        },
        {
          kind: "block",
          type: "nchnls",
        },
        {
          kind: "block",
          type: "0dbfs"
        },
      ],
    },
  ],
};
