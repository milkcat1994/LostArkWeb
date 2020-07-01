var express = require('express');
var router = express.Router();
const User = require('../../models/user/user');

/*
API Reference
api/users                GET         모든 user조회          findAll
api/users/user/login     POST        Login진행              login
api/users/user/:id       GET         id로 user조회          findOneByUserid
api/users                POST        user생성               create
api/users/user/:id       PUT         id로 user조회 후 수정   updateByUserid
api/users/user/:id       DELETE      id로 user조회 후 삭제   deleteByUserid
*/

/* GET> Find All user */
router.get('/', (req, res) => {
    // console.log('success get');
    User.findAll()
        .then((users) => {
            // console.log(users);
            if (!users.length) return res.status(404).send({ err: 'User not found' });
            // res.send(`find successfully: ${users}`);
            // console.log(users);
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err);

        });
});

/* GET> Find One by userid */
router.get('/user/:userid', (req, res) => {
    User.findOneByUserid(req.params.userid)
        .then((user) => {
            if (!user) return res.status(404).send({ err: 'User not found' });
            //새로운 obj만들어서 id,대표 캐릭터명만 전달
            let obj = new Object();
            obj.userId = user.user_id;
            obj.userChar = user.user_char;
            res.send(obj);
        })
        .catch(err => res.status(500).send(err));
})

/* POST> Login */
router.post('/user/login', (req, res) => {
    let userId = req.body.user_id;
    let userPw = req.body.user_pw;

    User.findOneByUserid(userId, userPw)
        .then((user) => {
            if (!user) return res.status(404).send({ err: 'User not found' });
            //새로운 obj만들어서 id,대표 캐릭터명만 전달
            let obj = new Object();
            obj.userId = user.user_id;
            obj.userChar = user.user_char;
            res.send(obj);
        })
        .catch(err => res.status(500).send(err));
})

/* POST> Create new user document */
router.post('/', (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.send(user);
        })
        .catch(err => res.status(500).send(err));
})

/* PUT> Create new user document */
router.put('/user/:userid', (req, res) => {
    User.updateByUserid(req.params.userid, req.body)
        .then((user) => {
            res.send(user);
        })
        .catch(err => res.status(500).send(err));
})

/* DELETE> Create new user document */
router.delete('/user/:userid', (req, res) => {
    User.deleteByUserid(req.params.userid)
        .then(() => {
            res.send(res.sendStatus(200));
        })
        .catch(err => res.status(500).send(err));
})


module.exports = router;