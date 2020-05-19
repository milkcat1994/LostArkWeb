var express = require('express');
var router = express.Router();

var collect = require('./getCollect.js');
var userInfo = require('./getUserInfo.js');

//추후 DB사용시 해당 정보 DB에 저장하고 DB내용을 불러 올 것.

//nav에서 수집형 포인트' 클릭시 가져올 정보
router.get('/:id', (req, res) => {
    // console.log('id받았음.>>' + req.params.id);
    console.log('id받음');
    userInfo.getUserInfo(req, res)
        .then((result) => {
            return new Promise(resolve => {
                console.log("getCollect1>>>" + result);
                resolve(collect.getCollect(result))
            })
        })
        .then((result) => {
            console.log("collection1>>>" + result);
            console.dir(result);
            res.send(result);
        })
        .catch(console.error())
});

//id를 받지 않는 URL
// router.get('/', (req, res) => {
//     console.log('id안받음');
//     userInfo.getUserInfo(req, res)
//         .then((result) => {
//             return new Promise(resolve => {
//                 // console.log("getCollect>>>" + result);
//                 //해당 수집품목들을 모아 반환
//                 resolve(collect.getCollect(result))
//             })
//         })
//         .then((result) => {
//             console.log("collection>>>" + result);
//             console.dir(result);
//             //vue에 결과물 전달
//             res.json(result);
//         })
//         .catch(console.error())
// });



module.exports = router;