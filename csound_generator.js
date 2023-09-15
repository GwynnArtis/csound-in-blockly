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
    return ['okay', Order.ATOMIC];
}