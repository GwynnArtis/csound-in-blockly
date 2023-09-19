export const csoundGenerator= new Blockly.Generator('CSOUND');

const Order = {
    ATOMIC: 0,
};

csoundGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + csoundGenerator.blockToCode(nextBlock);
    }
    return code;
};

csoundGenerator.forBlock['instrument'] = function(block) {
    const name = block.getFieldValue('NAME');
    //const elements = generator.statementToCode(block, 'ELEMENTS');
    //const value = generator.valueToCode(block, 'VALUES', Order.ATOMIC);
    const code = 
`instr ${name}
    asig = 
    out asig, asig
endin`; 
    return code;
}

// csoundGenerator.forBlock['oscili'] = function(block) {
//     const 
// }

// csoundGenerator.forBlock['variable_string']

csoundGenerator.forBlock['math_number'] = function(block) {
    const code = String(block.getFieldValue('NUM'));
    return [code, Order.ATOMIC];
  };