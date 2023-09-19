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
            "type": "UDO",
          },
          {
            "kind": "block",
            "type": "schedule"
          },
          // { // might add for more clarity - not sure yet
          //   "kind": "block",
          //   "type": "schedule_in_block"
          // }
        ]
      },
      {
        "kind": "category",
        "name": "Oscillators",
        "contents": [
          {
            "kind": "block", // need to create custom blocks 
            "type": "oscili"
          },
          {
            "kind": "block", // need to create custom blocks 
            "type": "vco2"
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
        ]
      },
      {
        "kind": "category",
        "name": "Filters",
        "contents": [
          {
            "kind": "block",
            "type": "math_number"
          },
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
      }
    ]
  }