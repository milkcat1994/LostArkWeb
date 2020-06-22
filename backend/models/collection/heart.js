const mongoose = require('mongoose');

//unique : 중복값 저장 불가
//required : 새로운 정보 저장 시 해당 필드 입력 필요
const heartSechema = new mongoose.Schema({
    userid: { type: String, unique: true, required: true },
    hearts: { type: Map, required: true }
}, {
    timestamps: true
})

// Create new user document
heartSechema.statics.create = function(payload) {
    // this == Model
    const heart = new this(payload);
    // return Pormise
    return heart.save();
}

//Find All heartCollection
heartSechema.statics.findAll = function() {
    //return promise
    // V4부터 exec() 필요 없음
    return this.find({});
}

// Find One collection by userid
heartSechema.statics.findOneByUserid = function(userid) {
    return this.findOne({ userid });
}

// Update by userid
heartSechema.statics.updateByUserid = function(userid, payload) {
    return this.findOneAndUpdate({ userid }, payload, { new: true });
}

// Delete by userid
heartSechema.statics.deleteByUserid = function(userid) {
    return this.remove({ userid });
}

//Create Model & Export
module.exports = mongoose.model('Heart', heartSechema);


// API Reference
// api/hearts                POST        '거인의 심장 정보' 생성
// api/hearts                GET         모든 '거인의 심장 정보' 조회
// api/hearts/user/:id       GET         id로 '거인의 심장 정보' 조회
// api/hearts/user/:id       PUT         id로 '거인의 심장 정보' 조회 후 수정
// api/hearts/user/:id       DELETE      id로 '거인의 심장 정보' 조회 후 삭제