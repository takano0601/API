import moment from 'moment';
import 'moment/locale/ja';
moment.locale('ja');

import {NHKpass} from './config.js';
// URLをfetchして、JSONをパースした状態のpromiseを返す
export default class Fetches{
    fetchFun(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
            .then(response =>{
                if(response.ok){
                    return response.text();
                }else{
                    return reject(new Error('エラーです'));
                }
            })
            .then(response =>{
                const resObj = JSON.parse(response);
                return resolve(resObj);
            })
        });
    };

    //指定した日のEテレNHK番組データが閲覧できる。 deyDelta:今日を0として、何日後のものか。(0~6)(初期値0)
    fetchNHK(dayDelta=0){
        const thisDay = moment().add(dayDelta,'days').format('YYYY-MM-DD');
        const programDay =`http://api.nhk.or.jp/v2/pg/genre/400/e1/0409/${thisDay}.json?key=${NHKpass}`;
        return this.fetchFun(programDay);
    };

    //パースしたデータを元にテーブルを生成
    createTable(objData,className){
        var tableJs = document.querySelector(className);
        var tableInner = "";
        Object.keys(objData).forEach(function(key){
            const getKey = moment(key).format('YYYY年MM月DD日');
            tableInner += '<tr><th class="trJs">' + getKey + '</th>';
            tableInner += '<td class="tdJs">' + objData[key] + '</td></tr>';
        });
        tableJs.innerHTML += tableInner;
    };

    //パースしたデータを元に番組表を表示
    progDisplay(list,idName){
        const NHKdisplay = document.getElementById(idName);
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
}

