//https://lostark.game.onstove.com/Profile/Character/(게임 닉네임)
//https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4
// const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const qs = require('querystring');

var datas = {};

exports.getUserInfo = (req, res) => {
    // let url = "https://lostark.game.onstove.com/Profile/Character/%EB%88%88%EA%BD%83%EC%B8%84%EB%A5%B4";
    //url인코딩 처리 위한 한글 escape처리
    let url = `https://lostark.game.onstove.com/Profile/Character/${qs.escape(req.params.id)}`;

    return new Promise(resolve => {
        request.get(url, function(error, response, body) {
            let $ = cheerio.load(body);
            let tempArr;
            //사용자의 수집품을 불러오는 ajax부분 발췌하기 위한 filter
            var scripts = $('script').filter(function() {
                return ($(this).html().indexOf('var _memberNo =') > -1);
            });
            console.log("length>>" + scripts.length);
            // console.log("text >>>" + $.html());
            if (scripts.length === 1) {
                //각각 memberNo, pcId, worldNo를 추출
                var text = $(scripts[0]).html();
                tempArr = text.split("'", 6);
            }
            // console.log(tempArr);
            datas = {
                memberNo: tempArr[1],
                pcId: tempArr[3],
                worldNo: tempArr[5],
            }

            //위에서 추출한 data를 통해서 사이트에 POST형식으로 ajax요청
            let params = {
                'method': 'POST',
                'url': 'https://lostark.game.onstove.com/Profile/GetCollection',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas)
            };

            console.log(datas['memberNo']);
            console.log(datas['worldNo']);
            console.log(datas['pcId']);
            resolve(params);
        });
    })
}


// module.exports = getUserInfo;