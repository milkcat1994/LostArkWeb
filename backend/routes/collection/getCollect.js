//https://lostark.game.onstove.com/Profile/Character/(게임 닉네임)
//https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4
// const axios = require('axios');
const { json } = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');

exports.getCollect = (params) => {
        // console.log(url);

        return new Promise(resolve2 => {
            var jsonInfo = new Map();
            // var jsonInfo = {};
            request(params, function(error, response, body) {
                let $ = cheerio.load(body);

                // var scriptExps = $("script").text().split('\n');
                // console.log(scriptExps);
                // console.log($.text());
                //거인의 심장 div id
                //lui-tab1-1
                //섬의 마음, 오르페우스의 별, 거인의 심장, 위대한 미술품, 모코코 씨앗, 항해 모험물, 이그네아의 징표, 세계수의 잎
                //island, star, heart, art, mococo, adventure, ignea, leaf
                let fields = new Map();
                fields.set(1, 'island');
                fields.set(2, 'star');
                fields.set(3, 'heart');
                fields.set(4, 'art');
                fields.set(5, 'mococo');
                fields.set(6, 'adventure');
                fields.set(7, 'ignea');
                fields.set(8, 'leaf');
                
                // let fields = ['', 'island', 'star', 'heart', 'art', 'mococo', 'adventure', 'ignea', 'leaf'];
                for (let idx = 1; idx < fields.size; ++idx) {
                    // for (let idx = 3; idx < 4; ++idx) {
                    let target = "#lui-tab1-" + idx;
                    let colArr = $(target).find(".list").children();
                    // .(".list").children();
                    let obj = [];
                    console.log("colArr's length>>" + colArr.length);

                    // console.log(colArr[0].children[3].children[1]);
                    for (let i = 0; i < colArr.length; i++) {
                        var tJson = new Object();
                        switch (fields.get(idx)) {
                            //모코코의 경우 3번쨰에 존재함.
                            case 'mococo':
                                // tJson.name = colArr[i].children[2].data.replace(/[\t\n]/gi, "");
                                tJson.name = colArr[i].children[2].data.trim();
                                //모코코의 경우 children[3]에 모은 모코코의 정보가 보임
                                //정규식 이용하여 \t와 \n 제거
                                tJson.userCount = colArr[i].children[3].children[1].children[0].data.replace(/[\t\n]/gi, "");
                                tJson.totalCount = colArr[i].children[3].children[3].children[0].data.replace(/[\t\n]/gi, "");
                                break;
                            default:
                                tJson.name = colArr[i].children[1].data.replace(/^\s+|\s+$/gi, "");
                                if (colArr[i].attribs.class == 'complete') {
                                    tJson.complete = true;
                                } else {
                                    tJson.complete = false;
                                }
                                break;
                        }
                        obj.push(tJson);
                    }
                    // console.log(obj);

                    // Object.defineProperty(jsonInfo, fields.get(idx), {
                    //     value: obj,
                    //     enumerable: true
                    // });
                    jsonInfo.set(fields.get(idx), obj);

                    // jsonInfo.heart = obj;
                    // jsonInfo.set(fields[idx], obj);
                    // switch (idx) {
                    //     case 1:
                    //         jsonInfo.heart = obj;
                    //         break;
                    //     case 2:
                    //         jsonInfo.island = obj;
                    //         break;
                    //     case 3:
                    //         jsonInfo.mococo = obj;
                    //         break;
                    //     case 4:
                    //         jsonInfo.art = obj;
                    //         break;
                    // }
                    // jsonInfo[idx - 1] = obj;
                }
                console.log('불러온 json입니다');
                // console.log(jsonInfo);
                resolve2(jsonInfo);
            });
        });
    }
    // };

// module.exports = getCollect;