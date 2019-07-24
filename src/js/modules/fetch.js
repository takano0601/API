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
        const programDay =`http://api.nhk.or.jp/v2/pg/genre/400/g1/0409/${thisDay}.json?key=${NHKpass}`;
        return this.fetchFun(programDay);
    }

}

