

export function getLongCurrentTime() {
    //console.log("##### DATA IN getLongCurrentTime########");
    return new Promise(resolve => {
       //console.log("longDate begin:");
       const date =  new Date();      
       resolve(
              date.getTime()
       )
    })
}


