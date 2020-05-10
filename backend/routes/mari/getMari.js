//https://lostark.game.onstove.com/Shop/Mari

const axios = require("axios");
const cheerio = require("cheerio");
const request = require('request');

// const getMari = async() => {
//     try {
//         return await axios.get("https://lostark.game.onstove.com/Shop/Mari");
//     } catch (error) {
//         console.error(error);
//     }
// };

/*

  Elements elementData = doc.select("ul#listItems > li");
  for (Element e : elementData) {
    img_url = new String("https:"+e.select("li div.wrapper div.thumbs img").attr("src"));
    name = new String(e.select("li div.wrapper div.item-desc span.item-name").text());
      price = new String(e.select("li div.wrapper div.area-amount span.amount").text());
  }
*/

// async function getHtml() {
//     let url = "https://lostark.game.onstove.com/Shop/Mari";
//     try {
//         return await axios.get(url);
//     } catch (error) {
//         console.error(error);
//     }
// }

// function getMari() {

// }

var getMari = {

    getMari: function(req, res) {
        // res.send('mari Stuff');
        // res.render('mari/mariStore', { data: 'test MariStore using ejs' });
        let url = "https://lostark.game.onstove.com/Shop/Mari";
        var jsonInfo;

        return new Promise(resolve => {
                request(url, function(error, response, body) {
                    let $ = cheerio.load(body);
                    // const $ = cheerio.load(body);
                    let colArr = $("#listItems").children();
                    var stuffObj = new Object();

                    //모든 것을 하나의 stuff로 정의 하지 말고
                    //하나의 stuff당 이름을 붙여서 5개의 객체로 받기
                    // console.log(colArr[0].children[1].children[1].children[0]);
                    // console.log(colArr[0].children[1].children[1].children[0].attribs.src);
                    console.dir(colArr);
                    for (let i = 0; i < colArr.length; i++) {
                        var temp = i;
                        // stuffName.push(colArr[i].$(".wrapper > .item-desc > .item-name").getText());
                        var stuffArr = new Array();
                        var tJson = new Object();
                        tJson.img = colArr[i].children[1].children[1].children[0].attribs.src;
                        tJson.name = colArr[i].children[1].children[3].children[1].children[0].data;
                        tJson.price = colArr[i].children[1].children[5].children[1].children[0].data;
                        tJson.priceInput = 0;
                        tJson.originGold = 0;
                        tJson.mariGold = 0;
                        tJson.profitGold = 0;

                        // stuffArr.push(tJson);
                        stuffObj[temp] = tJson;
                    }
                    // stuffObj.stuff = stuffArr;
                    jsonInfo = JSON.stringify(stuffObj);
                    // response.render("/", jsonInfo);
                    // console.log(jsonInfo);

                    resolve(jsonInfo);
                    // return jsonInfo;
                });
            })
            // var getHtml = function() {
            // };
            // return getHtml(url);
    }
};

module.exports = getMari;
/*

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('strong.news-tl a').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
          image_url: $(this).find('p.poto a img').attr('src'),
          image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
*/

//호출은 아래와 같이 될 것이다.
/*
$.ajax({
  url : '/club/',
  dataType : 'json',
  type : 'POST',	//생성은 POST 메서드 방식으로
  data : {clubNm :  '테니스코어'},
  success : function(data){

  },
  error: function(xhr,status, error){

  }
});
*/