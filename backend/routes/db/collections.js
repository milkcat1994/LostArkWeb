var express = require('express');
var router = express.Router();
const Collections = require('../../models/collection/collections');

var collect = require('../collection/getCollect.js');
var userInfo = require('../collection/getUserInfo.js');

/*
    API Reference
    api/collections                POST        '수집품 정보' 생성
    api/collections                GET         모든 '수집품 정보' 조회
    api/collections/user/:id       GET         id로 '수집품 정보' 조회
    api/collections/user/:id       PUT         id로 '수집품 정보' 조회 후 수정
    api/collections/user/:id       DELETE      id로 '수집품 정보' 조회 후 삭제
*/

/* GET> Find All collections */
router.get('/', (req, res) => {
    Collections.findAll()
        .then((collections) => {
            if (!collections.length) return res.status(404).send({ err: 'User not found' });
            res.json(collections);
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err);
        });
});

/* GET> Find One by userid */
router.get('/user/:userid', (req, res) => {
    let userid = req.params.userid;
    console.log(userid);
    Collections.findOneByUserid(userid)
        .then((collection) => {
            if (!collection) {
                // user에 대한 정보가 없으므로 
                // /api/collection/인게임닉네임 으로 요청 보내고 받기
                // req.url = '/api/collection/' + userid;
                console.log('정보없어요')
                userInfo.getUserInfo(req, res, userid)
                    .then((result) => {
                        // result : ajax 요청 위한 user정보 Header
                        return new Promise(resolve => {
                            resolve(collect.getCollect(result))
                        })
                    })
                    .then((result) => {
                        //해당 정보 DB에 저장하고 빠지기
                        let obj = new Object();
                        obj.collections = result;
                        obj.userid = userid;
                        Collections.create(obj)
                            .then((collection) => {
                                res.json(collection);
                                // res.send(obj);
                            })
                            .catch(err => res.status(500).send(err));
                    })
                    .catch(err => console.error(err))
            } else {
                console.log('정보 있어요')
                res.json(collection.collections);
            }
        })
        .catch(err => {
            console.log('error 발생')
            res.status(500).send(err)

        });
})

/* POST> Create new user's collections document */
router.post('/', (req, res) => {
    Collections.create(req.body)
        .then((collection) => {
            res.send(collection);
        })
        .catch(err => res.status(500).send(err));
})

/* PUT> Update user's collections document */
router.put('/user/:userid', (req, res) => {
    Collections.updateByUserid(req.params.userid, req.body)
        .then((collection) => {
            res.send(collection);
        })
        .catch(err => res.status(500).send(err));
})

/* DELETE> Delete user's collections document */
router.delete('/user/:userid', (req, res) => {
    Collections.deleteByUserid(req.params.userid)
        .then(() => {
            res.send(res.sendStatus(200));
        })
        .catch(err => res.status(500).send(err));
})


module.exports = router;