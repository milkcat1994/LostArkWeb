//https://lostark.game.onstove.com/Profile/Character/(게임 닉네임)
//https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4
// const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

exports.getCollect = (params) => {
        // console.log(url);

        return new Promise(resolve2 => {
            var jsonInfo = new Object();
            request(params, function(error, response, body) {
                let $ = cheerio.load(body);

                // var scriptExps = $("script").text().split('\n');
                // console.log(scriptExps);
                // console.log($.text());
                //거인의 심장 div id
                //lui-tab1-1
                //거인의 심장, 섬의 마음, 모코코, 위대한 미술품
                for (let idx = 1; idx < 5; ++idx) {
                    // for (let idx = 3; idx < 4; ++idx) {
                    let target = "#lui-tab1-" + idx;
                    let colArr = $(target).find(".list").children();
                    // .(".list").children();
                    var obj = [];
                    console.log("colArr's length>>" + colArr.length);

                    // console.log(colArr[0].children[3].children[1]);
                    for (let i = 0; i < colArr.length; i++) {
                        var tJson = new Object();
                        switch (idx) {
                            //모코코의 경우 3번쨰에 존재함.
                            case 3:
                                tJson.name = colArr[i].children[2].data.replace(/[\t\n]/gi, "");
                                //모코코의 경우 children[3]에 모은 모코코의 정보가 보임
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
                    jsonInfo[idx - 1] = obj;
                    console.log(jsonInfo);
                }
                resolve2(jsonInfo);
            });
        });
    }
    // };

// module.exports = getCollect;