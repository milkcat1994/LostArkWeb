var express = require('express');
var router = express.Router();

var collect = require('./getCollect.js');
var userInfo = require('./getUserInfo.js');

//추후 DB사용시 해당 정보 DB에 저장하고 DB내용을 불러 올 것.

//nav에서 수집형 포인트' 클릭시 가져올 정보
router.get('/:id', (req, res) => {
    // console.log('id받았음.>>' + req.params.id);
    console.log('id받음');
    collect.getCollect(req, res).then((result) => {
        console.dir("collection>>>" + result);
        res.json(result);
    });
});

router.get('/', (req, res) => {
    console.log('id안받음');
    userInfo.getUserInfo(req, res)
        .then((result) => {
            return new Promise(resolve => {
                console.log("getCollect>>>" + result);
                resolve(collect.getCollect(result))
            })
        })
        .then((result) => {
            console.log("collection>>>" + result);
            console.dir(result);
            res.json(result);
        })
        .catch(console.error())
});

// 수집형 포인트가 거심, 섬의 마음, 모코코씨앗, 위대한 미술품 인지 따라
// url을 조절하여 getCollect호출 할 것.


module.exports = router;