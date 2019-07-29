'use strict';
import objectFitImages from 'object-fit-images';
import MicroModal from 'micromodal';
// import console from './modules/console';
import {NHKpass} from './modules/config.js';
import Fetches from './modules/fetch.js';

import moment from 'moment';
import 'moment/locale/ja';
moment.locale('ja');

const fetches = new Fetches();


//祝日一覧API
fetches.fetchFun("https://holidays-jp.github.io/api/v1/date.json")
.then(response =>{
    fetches.createTable(response,'.tableJs');
});


// NHK 歌番組
fetches.fetchNHK()
.then(response =>{
    let programList = response.list.e1;
    fetches.progDisplay(programList,'NHK');
});

//音楽番組数をグラフ化
const DATA_DAYS = 7;  //取得する日数
let day = [];   //放送日を入れる配列
let count = [];  //番組数を入れる配列
let array = [];


let promises = [];
for(let i=0;i<DATA_DAYS;i++){
  promises[i]=
    fetches.fetchNHK(i)
    .then(res=>{
      count[i] = res.list.e1.length;
      day[i] = moment(i,'days').format('MM月DD日');
    })
}



///////グラフ描画
var ctx = document.getElementById('myChart').getContext('2d');
Promise.all(promises)
.then(res =>{
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: day,
      datasets: [{
        data: count,
        backgroundColor: 'rgba(153,255,51,0.4)'
      }],
    }
  });

})
