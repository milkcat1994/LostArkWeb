const mongoose = require('mongoose');

//unique : 중복값 저장 불가
//required : 새로운 정보 저장 시 해당 필드 입력 필요
const collectSechema = new mongoose.Schema({
    userid: { type: String, unique: true, required: true },
    collections: { type: Map, required: true }
}, {
    timestamps: true
})

// Create new user document
collectSechema.statics.create = function(payload) {
    // this == Model
    const colleciton = new this(payload);
    // return Pormise
    return colleciton.save();
}

//Find All heartCollection
collectSechema.statics.findAll = function() {
    //return promise
    // V4부터 exec() 필요 없음
    return this.find({});
}

// Find One collection by userid
collectSechema.statics.findOneByUserid = function(userid) {
    return this.findOne({ userid });
}

// Update by userid
collectSechema.statics.updateByUserid = function(userid, payload) {
    return this.findOneAndUpdate({ userid }, payload, { new: true });
}

// Delete by userid
collectSechema.statics.deleteByUserid = function(userid) {
    return this.remove({ userid });
}

//Create Model & Export
module.exports = mongoose.model('Collections', collectSechema);

//hearts => collections

// API Reference
// api/collections                POST        '거인의 심장 정보' 생성
// api/collections                GET         모든 '거인의 심장 정보' 조회
// api/collections/user/:id       GET         id로 '거인의 심장 정보' 조회
// api/collections/user/:id       PUT         id로 '거인의 심장 정보' 조회 후 수정
// api/collections/user/:id       DELETE      id로 '거인의 심장 정보' 조회 후 삭제