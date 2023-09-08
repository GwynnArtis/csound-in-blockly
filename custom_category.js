class CustomCategory extends Blockly.ToolboxCategory { // this doesn't work yet. Can delete if unused - corresponds to custom_category.js script in import
    constructor(categoryDef, tollbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
} 

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true
);