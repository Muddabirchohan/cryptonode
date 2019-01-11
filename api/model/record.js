
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const recordSchema = new Schema({
    name: {
        type: String,
        required: [true, "name fields is required"]
    },

    volume_24h: {
        type: Number
    },

    circulating_supply: {
        type: String,
       
    },

    total_supply: {
     type: String,
    //  required: [true, "total supply field is required"]
    }, 

    max_supply: {
        type: String,
       }, 

       cmc_rank: {
        type: String,
        // required: [true, "rank field is required"]
       },

    priceGraph: {
        type: String
    }
})

const Crypto = mongoose.model('record',recordSchema);
module.exports = Crypto;

