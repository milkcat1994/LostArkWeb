const mongoose = require('mongoose');

/*
저장 정보 : id, pw, 대표캐릭터명
*/

//unique : 중복값 저장 불가
//required : 새로운 정보 저장 시 해당 필드 입력 필요
const userSchema = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    user_pw: { type: String, required: true },
    user_char: { type: String, required: true },
}, {
    timestamps: true
})

// Create new user document
// POST-api/users
userSchema.statics.create = function(payload) {
    // this == Model
    const user = new this(payload);
    // return Pormise
    return user.save();
}

//Find All
// GET-api/users
userSchema.statics.findAll = function() {
    //return promise
    // V4부터 exec() 필요 없음
    return this.find({});
}

// Login
// POST-api/users/user/login
userSchema.statics.login = function(userid) {
    return this.findOne({ userid });
}

// Find One by userid
// GET-api/users/user/:id
userSchema.statics.findOneByUserid = function(userid, userpw) {
    return this.findOne({ "user_id": userid, "user_pw": userpw });
}

// Update by userid
// PUT-api/users/user/:id
userSchema.statics.updateByUserid = function(userid, payload) {
    return this.findOneAndUpdate({ userid }, payload, { new: true });
}

// Delete by userid
// DELETE-api/users/user/:id
userSchema.statics.deleteByUserid = function(userid) {
    return this.remove({ userid });
}

//Create Model & Export
module.exports = mongoose.model('User', userSchema);


// API Reference
// api/users                POST        user생성
// api/users/user/login     POST         Login진행
// api/users                GET         모든 user조회
// api/users/user/:id       GET         id로 user조회
// api/users/user/:id       PUT         id로 user조회 후 수정
// api/users/user/:id       DELETE      id로 user조회 후 삭제