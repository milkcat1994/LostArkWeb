//https://lostark.game.onstove.com/Profile/Character/(게임 닉네임)
//https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4
// const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

exports.getCollect = (params) => {
        // console.log("getCollect>>" + params);
        // console.log(req.params.id);
        // let url = "https://lostark.game.onstove.com/Profile/Character/" + req.params.id;
        //%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4
        // let url = "https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4";
        // url = url + '/Profile/GetCollection';
        // console.log(url);

        return new Promise(resolve2 => {
            var jsonInfo;
            request(params, function(error, response, body) {
                let $ = cheerio.load(body);

                // var scriptExps = $("script").text().split('\n');
                // console.log(scriptExps);
                // console.log($.text());
                //거인의 심장 div id
                //lui-tab1-1
                let colArr = $("#lui-tab1-1").find(".list").children();
                // .(".list").children();
                var obj = new Object();
                console.log("colArr's length>>" + colArr.length);

                console.log(colArr[0]);
                for (let i = 0; i < colArr.length; i++) {
                    var temp = i;
                    var tJson = new Object();
                    tJson.name = colArr[i].children[1].data;
                    if (colArr[i].attribs.class == 'complete') {
                        tJson.complete = true;
                    } else {
                        tJson.complete = false;
                    }
                    obj[temp] = tJson;
                }
                jsonInfo = JSON.stringify(obj);
                console.log(jsonInfo);

                resolve2(jsonInfo);
            });
        });
    }
    // };

// module.exports = getCollect;