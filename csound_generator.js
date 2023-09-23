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

// General block generators
csoundGenerator.forBlock['instrument'] = function(block, generator) {
    const name = block.getFieldValue('NAME');
    const elements = generator.statementToCode(block, 'ELEMENTS');
    //const value = generator.valueToCode(block, 'VALUES', Order.ATOMIC);
    const code = 
`instr ${name}
${elements}
endin`; 
    return code;
}
csoundGenerator.forBlock['out'] = function(block) {
    const arg1 = block.getField('ARG1').variable.name;
    const arg2 = block.getField('ARG2').variable.name;
    const code = `out ${arg1}, ${arg2}`;
    return code;
}
csoundGenerator.forBlock['UDO'] = function(block, generator) {
    const name = block.getFieldValue('NAME');
    const elements = generator.statementToCode(block, 'ELEMENTS');
    // if xin != null then extract input arg rates and add them next to the opcode name 
    const code = 
`opcode ${name}
${elements}
endop`;
    return code;
}

// Variable block generators
csoundGenerator.forBlock['variable_get'] = function(block) {
    const name = block.getFieldValue('NAME');
    const code = `${name}`;
    return [code, Order.ATOMIC];
}

csoundGenerator.forBlock['variable_set'] = function(block, generator) {
    // console.log(block, block.getField('NAME')); // testing purposes
    const name = block.getField('NAME').variable.name;
    const value = (generator.valueToCode(block, 'VALUE', Order.ATOMIC));
    const code = `${name} ${value}`;
    return code;
} 

csoundGenerator.forBlock['oscili'] = function(block, generator) {
    const amp = generator.valueToCode(block, 'AMP', Order.ATOMIC);
    const freq = generator.valueToCode(block, 'FREQ', Order.ATOMIC);
    const code = `oscili ${amp}, ${freq}`;
    return [code, Order.ATOMIC];
}

csoundGenerator.forBlock['math_number'] = function(block) {
    const code = String(block.getFieldValue('NUM'));
    return [code, Order.ATOMIC];
};

