
// URLをfetchして、JSONをパースした状態のpromiseを返す
export default function fetchFun(url){
    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.text();
        }else{
            return Promise.reject(new Error('エラーです'));
        }
    })
    .then(response =>{
        const objRes = JSON.parse(response);
        return objRes;
    });

};