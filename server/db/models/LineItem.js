const conn = require('../conn');
const { Sequelize } = conn;

const LineItem = conn.define(
    'lineItem',
    {
        qty: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    },
    {
        hooks: {
            beforeCreate: async lineItem => {
                //TODO: check for duplicate items
                console.log('does before create fire?');
            },
            beforeSave: async lineItem => {
                if (lineItem.qty < 1)
                    throw new Error('Qty cannot be less than 1');
                const product = await lineItem.getProduct();
                if (lineItem.qty > product.stock)
                    throw new Error('Qty cannot be more than amount in stock');
            },
        },
    }
);

module.exports = LineItem;
