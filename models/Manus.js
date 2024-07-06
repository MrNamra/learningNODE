const mongoos = require('mongoose');

const menuItemSchema = new mongoos.Schema({
    name : {
        type: String,
        required: true
    },
    prise: {
        type: Number,
        required: true
    },
    test: {
        type: String,
        enum: ['spicy', 'sweet', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

const menuItem = mongoos.model('MenuItem', menuItemSchema);

module.exports = menuItem;