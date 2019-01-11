const express = require('express');
const router = express.Router();
const record = require('../model/record');

var ccxt = require ('ccxt')

 const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 5000,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'f6540618-c8e9-4124-9eca-d6e8de882f02'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
    console.log("hello", response.data);

    router.post('/postrecord',(req,res,next)=>{
        
        for(let i=0; i<=2000; i++){
        let userObject = {
            name: response.data[i].name,
            volume_24h: response.data[i].volume_24h,
            circulating_supply: response.data[i].circulating_supply,
            total_supply:  response.data[i].total_supply,
            max_supply: response.data[i].max_supply,
            cmc_rank: response.data[i].cmc_rank
        }
        record.create(userObject).then(function (user) {
             console.log(user)
            res.send(user)
        }).catch(next)
    }
    })

  console.log("hello" ,response.data[0])

}).catch((err) => {
//   console.log('API call error:', err.message);
});

router.get('/getrecord',(req,res,next)=>{
    let i=0;
    record.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i++] = user;
        });
        res.send(userMap);
    });
});

router.get('/:id',(req,res,next)=>{

    record.findById(req.params.id)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})

module.exports = router;