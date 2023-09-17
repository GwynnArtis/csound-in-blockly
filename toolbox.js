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
            "type": "performance"
          }
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
      },
      {
        "kind": "category",
        "name": "Variables",
        "custom": "VARIABLE", // allows user to make custom variable, but deletes all other block choices. Not sure where to put this
        "contents": [
          {
            "kind": "block",
            "type": "variables_get"
          },
          {
            "kind": "block",
            "type": "math_number"
          }
        ]
      }
    ]
  }