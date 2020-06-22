var express = require('express');
var router = express.Router();
const Heart = require('../../models/collection/heart');

var collect = require('./getCollect.js');
var userInfo = require('./getUserInfo.js');

/*
    API Reference
    api/hearts                POST        '거인의 심장 정보' 생성
    api/hearts                GET         모든 '거인의 심장 정보' 조회
    api/hearts/user/:id       GET         id로 '거인의 심장 정보' 조회
    api/hearts/user/:id       PUT         id로 '거인의 심장 정보' 조회 후 수정
    api/hearts/user/:id       DELETE      id로 '거인의 심장 정보' 조회 후 삭제
*/

/* GET> Find All hearts */
router.get('/', (req, res) => {
    Heart.findAll()
        .then((hearts) => {
            if (!hearts.length) return res.status(404).send({ err: 'User not found' });
            res.json(hearts);
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err);
        });
});

//하나하나가 아니라 그냥 같이 가져옵시다?
// 4개를 하나의 Collection으로 생각해서
// 한꺼번에 갱신, 가져오면 될듯 합니다.

/* GET> Find One by userid */
router.get('/user/:userid', (req, res) => {
    let userid = req.params.userid;
    console.log(userid);
    Heart.findOneByUserid(userid)
        .then((heart) => {
            if (!heart) {
                //user에 대한 정보가 없으므로 
                // /api/collection/인게임닉네임 으로 요청 보내고 받기
                // req.url = '/api/collection/' + userid;
                console.log('정보없어요')
                userInfo.getUserInfo(req, res, userid)
                    .then((result) => {
                        console.log('유저 정보 헤더')
                        console.log(result)
                        return new Promise(resolve => {
                            console.log("getCollect1>>>");
                            resolve(collect.getCollect(result))
                                // console.dir(result.heart);
                        })
                    })
                    .then((result) => {
                        // console.log("collection1>>>" + result);
                        // console.dir(result);
                        //해당 정보 DB에 저장하고 빠지기
                        let obj = new Object();
                        obj.hearts = result;
                        obj.userid = userid;
                        console.log('디비에 들어가는 object 형태')
                        console.dir(result.heart);
                        // console.dir(obj.hearts.heart);
                        console.dir(obj.hearts.art);
                        Heart.create(obj)
                            .then((heart) => {
                                res.json(heart);
                                // res.send(obj);
                            })
                            .catch(err => res.status(500).send(err));
                    })
                    .catch(err => console.error(err))
                    // return router.handle(req, res, next);
                    // return res.status(404).send({ err: 'User not found' });
            } else {
                console.log('정보 있어요')
                    // res.send(`findOne successfully: ${heart}`);
                res.json(heart.hearts);
            }
        })
        .catch(err => {
            console.log('error 발생')
            res.status(500).send(err)

        });
})

/* POST> Create new heart document */
router.post('/', (req, res) => {
    Heart.create(req.body)
        .then((heart) => {
            res.send(heart);
        })
        .catch(err => res.status(500).send(err));
})

/* PUT> Create new user document */
router.put('/user/:userid', (req, res) => {
    Heart.updateByUserid(req.params.userid, req.body)
        .then((heart) => {
            res.send(heart);
        })
        .catch(err => res.status(500).send(err));
})

/* DELETE> Create new user document */
router.delete('/user/:userid', (req, res) => {
    Heart.deleteByUserid(req.params.userid)
        .then(() => {
            res.send(res.sendStatus(200));
        })
        .catch(err => res.status(500).send(err));
})


module.exports = router;