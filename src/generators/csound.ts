import * as Blockly from "blockly/core";
import { pFieldSet } from "../blocks/text";
import { UPDATE_RATE as UpdateRate } from "src";

const VAR_RATE_PREFIX: { [key in UpdateRate]: string } = {
  "audio-rate": "a",
  "control-rate": "k",
  "init-rate": "i",
};

class CsoundGenerator extends Blockly.CodeGenerator {
  inlineBlocks = [pFieldSet.type];
  constructor() {
    super("CsoundGenerator");
  }
  protected scrub_(
    block: Blockly.Block,
    code: string,
    thisOnly?: boolean | undefined
  ): string {
    const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      const sep = this.inlineBlocks.includes(block.type) ? ", " : "\n";
      return code + sep + csoundGenerator.blockToCode(nextBlock);
    }
    return code;
  }
}
export const csoundGenerator = new CsoundGenerator();

interface ListBlockCount extends Blockly.Block { // for lists_create_with generator
  itemCount_: number;
}

const Order = {
  ATOMIC: 0,
  EXPONENTIATION: 1,
  MULTIPLICATION: 2,
  DIVISION: 3,
  SUBTRACTION: 4,
  ADDITION: 5,
  NONE: 99
};

// General block generators
csoundGenerator.forBlock["instrument"] = function (block, generator) {
  const name = block.getFieldValue("NAME");
  const elements = generator.statementToCode(block, "ELEMENTS");
  const code = `instr ${name}
${elements}
endin
`;
  return code;
};
csoundGenerator.forBlock["out"] = function (block, generator) {
  const arg1 = generator.valueToCode(block, "ARG1", Order.ATOMIC); // gets name of variable for all field types - in this case, field variable
  const arg2 = generator.valueToCode(block, "ARG2", Order.ATOMIC);
  const code = `out ${arg1}, ${arg2}`;
  return code;
};
csoundGenerator.forBlock["UDO"] = function (block, generator) {
  const name = block.getFieldValue("NAME");
  const inArgRate = block.getFieldValue("IN_ARG_RATE");
  const outArgRate = block.getFieldValue("OUT_ARG_RATE");
  const elements = generator.statementToCode(block, "ELEMENTS");
  // if xin != null then extract input arg rates and add them next to the opcode name
  const code = `opcode ${name} ${inArgRate}, ${outArgRate}
${elements}
endop
`;
  return code;
};
csoundGenerator.forBlock["xin"] = function (block, generator) {
  const args = generator.valueToCode(block, "ARGS", Order.ATOMIC);
  //const value = generator.valueToCode(block, 'VALUES', Order.ATOMIC);
  const code = `${args} xin`;
  return code;
};
csoundGenerator.forBlock["xout"] = function (block, generator) {
  const arg = generator.valueToCode(block, "ARG1", Order.ATOMIC);
  //const value = generator.valueToCode(block, 'VALUES', Order.ATOMIC);
  const code = `xout ${arg}`;
  return code;
};

// Performance block generators
csoundGenerator.forBlock["schedule_in_instr"] = function (block, generator) {
  const instr = generator.valueToCode(block, "INSTR", Order.ATOMIC);
  const start = generator.valueToCode(block, "START", Order.ATOMIC);
  const dur = generator.valueToCode(block, "DUR", Order.ATOMIC);
  const pFields = generator.statementToCode(block, "PFIELDS");
  // TODO: figure out where spaces are coming from
  if (!pFields) {
    const code = `schedule ${instr}, ${start}, ${dur}`;
    return code;
  } else {
    const code = `schedule ${instr}, ${start}, ${dur}, ${pFields.trim()}`;
    return code;
  }
};
csoundGenerator.forBlock["schedule_global"] = function (block, generator) {
  const instr = generator.valueToCode(block, "INSTR", Order.ATOMIC);
  const start = generator.valueToCode(block, "START", Order.ATOMIC);
  const dur = generator.valueToCode(block, "DUR", Order.ATOMIC);
  const pFields = generator.statementToCode(block, "PFIELDS");
  // TODO: figure out where spaces are coming from
  if (!pFields) {
    const code = `schedule ${instr}, ${start}, ${dur}
    `;
    return code;
  } else {
    const code = `schedule ${instr}, ${start}, ${dur}, ${pFields.trim()}
    `;
    return code;
  }
};
csoundGenerator.forBlock["pfield"] = function (block) {
  const arg = block.getField("NUMBER").getText();
  const code = `p${arg}`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["pfield_set"] = function (block, generator) {
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = `${value}`;
  return code;
};

// Variable block generators
csoundGenerator.forBlock["variable_get"] = function (block) {
  const name = block.getField("NAME").getText();
  const code = `${name}`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["variable_set"] = function (block, generator) {
  // console.log(block, block.getField('NAME')); // testing purposes
  const name = block.getField("NAME").getText();
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = `${name} = ${value}`;
  return code;
};

csoundGenerator.forBlock["math_number"] = function (block) {
  const code = String(block.getFieldValue("NUM"));
  return [code, Order.ATOMIC];
};

csoundGenerator.forBlock["variables_get_dynamic"] = function (block) {
  const name = block.getField("VAR").getText();
  const type = block.getVarModels()[0].type as UpdateRate;
  const prefix = VAR_RATE_PREFIX[type];
  const code = `${prefix}${name}`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["variables_set_dynamic"] = function (
  block,
  generator
) {
  const name = block.getField("VAR").getText();
  const type = block.getVarModels()[0].type as UpdateRate;
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const prefix = VAR_RATE_PREFIX[type];
  const code = `${prefix}${name} = ${value}`;
  return code;
};

// Array block generators
csoundGenerator.forBlock["lists_create_with"] = function (block, generator) {
  const elements = new Array((block as ListBlockCount).itemCount_);
  for (let i = 0; i < (block as ListBlockCount).itemCount_; i++) {
    elements[i] = generator.valueToCode(block, 'ADD' + i, Order.NONE) || 'None'; 
  }
  const code = `ftgen ` + elements.join(', ') + ``;
  return [code, Order.ATOMIC];
};

// Control flow block generators
csoundGenerator.forBlock["addition"] = function (block, generator) {
  const arg1 = generator.valueToCode(block, "A", Order.ATOMIC);
  const arg2 = generator.valueToCode(block, "B", Order.ATOMIC);
  const OPERATORS = {
    ADD: [" + ", Order.ADDITION],
    MINUS: [" - ", Order.SUBTRACTION],
    MULTIPLY: [" * ", Order.MULTIPLICATION],
    DIVIDE: [" / ", Order.DIVISION],
    POWER: ["^", Order.EXPONENTIATION],
  } as const; // immutable
  const tuple = OPERATORS[block.getFieldValue("OP") as keyof typeof OPERATORS];
  const operator = tuple[0];
  const order = tuple[1];
  const code = `${arg1} ${operator} ${arg2}`;
  return [code, order];
};

// Oscillator block generators
csoundGenerator.forBlock["oscili"] = function (block, generator) {
  const rate = block.getField("RATE").getText();
  const amp = generator.valueToCode(block, "AMP", Order.ATOMIC);
  const freq = generator.valueToCode(block, "FREQ", Order.ATOMIC);
  const ifn = generator.valueToCode(block, "IFN", Order.ATOMIC);
  const iphs = generator.valueToCode(block, "IPHS", Order.ATOMIC);
  if (iphs) {
    if (ifn) {
      const code = `oscili:${rate}(${amp}, ${freq}, ${ifn}, ${iphs})`;
      return [code, Order.ATOMIC];
    } else {
      const code = `oscili:${rate}(${amp}, ${freq}, -1, ${iphs})`;
      return [code, Order.ATOMIC];
    }
  } else if (ifn && !iphs) {
    const code = `oscili:${rate}(${amp}, ${freq}, ${ifn})`;
    return [code, Order.ATOMIC];
  } else {
    const code = `oscili:${rate}(${amp}, ${freq})`;
    return [code, Order.ATOMIC];
  }
};
csoundGenerator.forBlock["vco2"] = function (block, generator) {
  const amp = generator.valueToCode(block, "AMP", Order.ATOMIC);
  const freq = generator.valueToCode(block, "FREQ", Order.ATOMIC);
  const imode = generator.valueToCode(block, "IMODE", Order.ATOMIC);
  if (imode) {
    const code = `vco2:a(${amp}, ${freq}, ${imode})`;
    return [code, Order.ATOMIC];
  } else {
    const code = `vco2:a(${amp}, ${freq})`;
    return [code, Order.ATOMIC];
  }
};
csoundGenerator.forBlock["noise"] = function (block, generator) {
  const amp = generator.valueToCode(block, "AMP", Order.ATOMIC);
  const beta = generator.valueToCode(block, "BETA", Order.ATOMIC);
  const code = `noise:a(${amp}, ${beta})`;
  return [code, Order.ATOMIC];
};

// Envelope block generators
csoundGenerator.forBlock["linen"] = function (block, generator) {
  const rate = block.getField("RATE").getText();
  const amp = generator.valueToCode(block, "AMP", Order.ATOMIC);
  const rise = generator.valueToCode(block, "RISE", Order.ATOMIC);
  const dur = generator.valueToCode(block, "DUR", Order.ATOMIC);
  const decay = generator.valueToCode(block, "DECAY", Order.ATOMIC);
  const code = `linen:${rate}(${amp}, ${rise}, ${dur}, ${decay})`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["expon"] = function (block, generator) {
  const rate = block.getField("RATE").getText();
  const start = generator.valueToCode(block, "START", Order.ATOMIC);
  const dur = generator.valueToCode(block, "DUR", Order.ATOMIC);
  const end = generator.valueToCode(block, "END", Order.ATOMIC);
  const code = `expon:${rate}(${start}, ${dur}, ${end})`;
  return [code, Order.ATOMIC];
};

// Filter block generators
csoundGenerator.forBlock["lowpass"] = function (block, generator) {
  const signal = generator.valueToCode(block, "SIGNAL", Order.ATOMIC);
  const centre_freq = generator.valueToCode(block, "CENTRE_FREQ", Order.ATOMIC);
  const cutoff = generator.valueToCode(block, "CUTOFF", Order.ATOMIC);
  const code = `lowpass2:a(${signal}, ${centre_freq}, ${cutoff})`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["highpass"] = function (block, generator) {
  const signal = generator.valueToCode(block, "SIGNAL", Order.ATOMIC);
  const cutoff = generator.valueToCode(block, "CUTOFF", Order.ATOMIC);
  const iskip = generator.valueToCode(block, "ISKIP", Order.ATOMIC);
  if (iskip) {
    const code = `atone:a(${signal}, ${cutoff}, ${iskip})`;
    return [code, Order.ATOMIC];
  } else {
    const code = `atone:a(${signal}, ${cutoff})`;
    return [code, Order.ATOMIC];
  }
};
csoundGenerator.forBlock["bandpass"] = function (block, generator) {
  const signal = generator.valueToCode(block, "SIGNAL", Order.ATOMIC);
  const freq = generator.valueToCode(block, "FREQ", Order.ATOMIC);
  const band = generator.valueToCode(block, "BAND", Order.ATOMIC);
  const code = `butterbp:a(${signal}, ${freq}, ${band})`;
  return [code, Order.ATOMIC];
};

// Delay block generators
csoundGenerator.forBlock["delay"] = function (block, generator) {
  const signal = generator.valueToCode(block, "SIGNAL", Order.ATOMIC);
  const idlt = generator.valueToCode(block, "DELAY_TIME", Order.ATOMIC);
  const code = `delay:a(${signal}, ${idlt})`;
  return [code, Order.ATOMIC];
};
csoundGenerator.forBlock["reverb"] = function (block, generator) {
  const signal = generator.valueToCode(block, "SIGNAL", Order.ATOMIC);
  const krvt = generator.valueToCode(block, "REVERB_TIME", Order.ATOMIC);
  const code = `reverb:a(${signal}, ${krvt})`;
  return [code, Order.ATOMIC];
};

// Constants block generators
