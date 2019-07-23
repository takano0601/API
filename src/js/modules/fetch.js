
// URLをfetchして、JSONをパースした状態のpromiseを返す
export default function fetchFun(url){
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

