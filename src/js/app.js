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
var tableJs = document.querySelector('.tableJs');
var tableInner = "";

//祝日一覧API
fetches.fetchFun("https://holidays-jp.github.io/api/v1/date.json")
.then(response =>{
    createTable(response);
});

function createTable(objData){
    Object.keys(objData).forEach(function(key){
        const getKey = moment(key).format('YYYY年MM月DD日');
        tableInner += '<tr><th class="trJs">' + getKey + '</th>';
        tableInner += '<td class="tdJs">' + objData[key] + '</td></tr>';
    });
    tableJs.innerHTML += tableInner;
}

// NHK 歌番組


fetches.fetchNHK()
.then(response =>{
    let programList = response.list.g1;
    progDisplay(programList);
});

//取得した番組情報を表示
function progDisplay(list){
    const NHKdisplay = document.getElementById('NHK');
    list.forEach(item=>{

        //番組タイトル
        const title = document.createElement('h3');
        title.className = 'titleNHK';
        title.innerText = item.title;
        NHKdisplay.appendChild(title);

        //スタート時間
        const startDate = moment(item.start_time);
        const dateElement = document.createElement('p');
        dateElement.className = 'dateNHK';
        dateElement.innerText = startDate.format('HH時mm分スタート！');
        NHKdisplay.appendChild(dateElement);
    });
}



//音楽番組数をグラフ化
fetches.fetchNHK(1)
.then(response=>{
    console.log(response);
})

