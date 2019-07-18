'use strict';
import objectFitImages from 'object-fit-images';
import MicroModal from 'micromodal';
// import console from './modules/console';
import {NHKpass} from './modules/config.js';
import fetchFun from './modules/fetch.js'


var tableJs = document.querySelector('.tableJs');
var tableInner = "";
var holiday = document.getElementById('holiday');
// http://api.e-stat.go.jp/rest/2.1/app/json/getStatsList?appId=+7df9336aa4b63e9a82654cde526e6958d5ed8626&lang=J&openYears=201801-201907&statsCode=00130001&searchKind=1

//祝日一覧API
// fetch("https://holidays-jp.github.io/api/v1/date.json")
// .then(response=>{
//     if(response.ok){
//         return response.text();
//     }else{
//         return Promise.reject(new Error('エラーです'));
//     }
// })
// .then(response =>{
//     const objRes = JSON.parse(response);
//     createTable(objRes);
// });
let fetchPromiss = fetchFun("https://holidays-jp.github.io/api/v1/date.json");
console.log(fetchPromiss);
createTable(fetchPromiss);

function createTable(objData){
    Object.keys(objData).forEach(function(key){
        const getKey = conversion(key);
        tableInner += '<tr><th class="trJs">' + getKey + '</th>';
        tableInner += '<td class="tdJs">' + objData[key] + '</td></tr>';
    });
    tableJs.innerHTML += tableInner;
}

//2018-01-01　→2018年01月01日　に変換
function conversion(key){
    let cgKey = key.replace('-','年').replace('-','月');
    cgKey += '日';
    return cgKey;
}

// NHK 歌番組
let today =  new Date();
var mm = ('0' + (today.getMonth() + 1)).slice(-2);   //月
var dd = ('0' + today.getDate()).slice(-2);          //日
today = `${today.getFullYear()}-${mm}-${dd}`; //今日の日付

fetch("http://api.nhk.or.jp/v2/pg/genre/400/g1/0409/" + today + ".json?key=" + NHKpass)
.then(res =>{
    if(res.ok){
        return res.text();
    }else{
        return Promise.reject(new Error('エラーです'));
    }
})
.then(res=>{
    const objRes = JSON.parse(res);
    let programList = objRes.list.g1;
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
        const startDate = new Date(item.start_time);
        const dateElement = document.createElement('p');
        dateElement.className = 'dateNHK';
        dateElement.innerText = startDate.getHours() + '時' + startDate.getMinutes() + '分スタート！';
        NHKdisplay.appendChild(dateElement);
    });
}

//音楽番組数をグラフ化
fetch("http://api.nhk.or.jp/v2/pg/genre/400/e1/0409/2019-07-18.json?key=" + NHKpass)
.then(res =>{
    if(res.ok){
        return res.text();
    }else{
        return Promise.resject(new Error('エラーです'));
    }
})
.then(res =>{
    const objRes = JSON.parse(res);
    console.log(objRes);    //???
    // let progNum = objRes.
});
