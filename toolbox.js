
export const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "General",
        "contents": [
          {
            "kind": "block", // need to create custom blocks 
            "type": "instrument"
          },
          {
            "kind": "block",
            "type": "out"
          },
          {
            "kind": "block",
            "type": "UDO",
          },
          {
            "kind": "block",
            "type": "xin",
          },
          {
            "kind": "block",
            "type": "xout",
          },
        ],
      },
      {
        "kind": "category",
        "name": "Performance",
        "contents": [
          {
            "kind": "block",
            "type": "lists_create_with"
          },
          {
            "kind": "block",
            "type": "schedule" // need to modify to accept at least 3 inputs and change output
          },
          // { // might add for more clarity - not sure yet
          //   "kind": "block",
          //   "type": "schedule_in_block"
          // }
          {
            "kind": "block",
            "type": "p-fields"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Variables",
        "contents": [
          {
            "kind": "block",
            "type": "variable_get"
          },
          {
            "kind": "block",
            "type": "variable_set"
          },
          {
            "kind": "block",
            "type": "variable_change"
          },
          {
            "kind": "block",
            "type": "math_number"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Arrays and f-tables",
        "contents": [
          {
            "kind": "block",
            "type": "array"
          },
          {
            "kind": "block",
            "type": "ftable"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Control flow",
        "contents": [
          {
            "kind": "block",
            "type": "controls_if"
          },
          {
            "kind": "block",
            "type": "logic_compare"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Oscillators",
        "contents": [
          {
            "kind": "block",  
            "type": "oscili"
          },
          {
            "kind": "block", 
            "type": "vco2"
          },
          {
            "kind": "block", 
            "type": "noise"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Envelopes",
        "contents": [
          {
            "kind": "block",
            "type": "linen"
          },
          {
            "kind": "block",
            "type": "expon"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Filters",
        "contents": [
          {
            "kind": "block",
            "type": "lowpass"
          },
          {
            "kind": "block",
            "type": "highpass"
          },
          {
            "kind": "block",
            "type": "bandpass"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Delays",
        "contents": [
          {
            "kind": "block",
            "type": "delay"
          },
          {
            "kind": "block",
            "type": "reverb"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Other",
        "contents": [
          {
            "kind": "block",
            "type": "pan2"
          },
          {
            "kind": "block",
            "type": "cpspch"
          },
          {
            "kind": "block",
            "type": "ampdb"
          }
        ]
      }
    ]
  }