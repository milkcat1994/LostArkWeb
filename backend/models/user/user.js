const mongoose = require('mongoose');

//unique : 중복값 저장 불가
//required : 새로운 정보 저장 시 해당 필드 입력 필요
const userSchema = new mongoose.Schema({
    userid: { type: String, unique: true, required: true },
    userpw: { type: String, required: true }
}, {
    timestamps: true
})

// Create new user document
userSchema.statics.create = function(payload) {
    // this == Model
    const user = new this(payload);
    // return Pormise
    return user.save();
}

//Find All
userSchema.statics.findAll = function() {
    //return promise
    // V4부터 exec() 필요 없음
    return this.find({});
}

// Find One by userid
userSchema.statics.findOneByUserid = function(userid) {
    return this.findOne({ userid });
}

// Update by userid
userSchema.statics.updateByUserid = function(userid, payload) {
    return this.findOneAndUpdate({ userid }, payload, { new: true });
}

// Delete by userid
userSchema.statics.deleteByUserid = function(userid) {
    return this.remove({ userid });
}

//Create Model & Export
module.exports = mongoose.model('User', userSchema);


// API Reference
// api/users                POST        user생성
// api/users                GET         모든 user조회
// api/users/user/:id       GET         id로 user조회
// api/users/user/:id       PUT         id로 user조회 후 수정
// api/users/user/:id       DELETE      id로 user조회 후 삭제