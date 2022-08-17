const {Types,Schema,model} = require('mongoose');

const paymentSchema = new Schema({

},{
    timestamps:true
})

const PaymentModel = model('payment',paymentSchema);

module.exports = {
    PaymentModel
}