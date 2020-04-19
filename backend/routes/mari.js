var express = require('express');
var router = express.Router();

/*
BaseUrl : server.js router에 선언한 BaseUrl을 표시
          request url을 쉽게 파악하기 위함이다.
        : /mari
*/

/*
실제 업무처리 로직이 명시된 router import
*/

// var mariStore = require('./mariStore'); //마리 상점 ejs
var getMari = require('./getMari.js'); //마리 상점 파싱

/* 마리 상점 출력*/
router.get('/', function(req, res) {
    // mariStore.store(req, res);
    // getMari.getMari(req, res);
    // getMari.getMari();
    // console.log(temp);
    getMari.getMari(req, res).then(function(result) {
        console.log(result);
        res.json(result);
    });
    // console.dir(temp);
    // res.send(temp);
});

// router.get('/getMari', function(req, res) {
// getMari.getMari(req, res);
// });

module.exports = router;