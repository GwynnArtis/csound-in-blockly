import * as Blockly from "blockly/core";
import { pFieldSet } from "../blocks/text";

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
    console.log(block.type, code, thisOnly, nextBlock);
    if (nextBlock && !thisOnly) {
      const sep = this.inlineBlocks.includes(block.type) ? ", " : "\n";
      return code + sep + csoundGenerator.blockToCode(nextBlock);
    }
    return code;
  }
}
export const csoundGenerator = new CsoundGenerator();

const Order = {
  ATOMIC: 0,
};

// General block generators
csoundGenerator.forBlock["instrument"] = function (block, generator) {
  const name = block.getFieldValue("NAME");
  const elements = generator.statementToCode(block, "ELEMENTS");
  const code = `instr ${name}
${elements}
endin`;
  console.log(code);
  return code;
};
csoundGenerator.forBlock["out"] = function (block) {
  const arg1 = block.getField("ARG1").getText(); // gets name of variable for all field types - in this case, field variable
  const arg2 = block.getField("ARG2").getText();
  const code = `out ${arg1}, ${arg2}`;
  return code;
};
csoundGenerator.forBlock["UDO"] = function (block, generator) {
  const name = block.getFieldValue("NAME");
  const elements = generator.statementToCode(block, "ELEMENTS");
  // if xin != null then extract input arg rates and add them next to the opcode name
  const code = `opcode ${name}
${elements}
endop`;
  return code;
};
csoundGenerator.forBlock["xin"] = function (block, generator) {
  const args = generator.statementToCode(block, "ARGS");
  //const value = generator.valueToCode(block, 'VALUES', Order.ATOMIC);
  const code = `${args} xin`;
  return code;
};
csoundGenerator.forBlock["xout"] = function (block, generator) {
  const arg = block.getField("ARG1").getText();
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
  const code = `schedule ${instr}, ${start}, ${dur}, ${pFields.trim()}`;
  return code;
};
csoundGenerator.forBlock["schedule_global"] = function (block, generator) {
  const instr = generator.valueToCode(block, "INSTR", Order.ATOMIC);
  const start = generator.valueToCode(block, "START", Order.ATOMIC);
  const dur = generator.valueToCode(block, "DUR", Order.ATOMIC);
  const pFields = generator.statementToCode(block, "PFIELDS");
  console.log(pFields);
  // TODO: figure out where spaces are coming from
  if (!pFields) {
    const code = `schedule ${instr}, ${start}, ${dur}`;
    return code;
  } else {
    const code = `schedule ${instr}, ${start}, ${dur}, ${pFields.trim()}`;
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
  const name = block.getFieldValue("NAME");
  const code = `${name}`;
  return [code, Order.ATOMIC];
};

csoundGenerator.forBlock["variable_set"] = function (block, generator) {
  // console.log(block, block.getField('NAME')); // testing purposes
  const name = block.getField("NAME").getText();
  const value = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  const code = `${name} ${value}`;
  return code;
};

csoundGenerator.forBlock["oscili"] = function (block, generator) {
  const amp = generator.valueToCode(block, "AMP", Order.ATOMIC);
  const freq = generator.valueToCode(block, "FREQ", Order.ATOMIC);
  const code = `oscili ${amp}, ${freq}`;
  return [code, Order.ATOMIC];
};

csoundGenerator.forBlock["math_number"] = function (block) {
  const code = String(block.getFieldValue("NUM"));
  return [code, Order.ATOMIC];
};

// Mutator?
