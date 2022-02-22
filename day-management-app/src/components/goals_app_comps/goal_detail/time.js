function convertTimeToSecond(time){
    

    var a = time.split(':')
    return (+parseFloat(a[0])) * 60 * 60 + (+parseFloat(a[1])) * 60 + (+parseFloat(a[2]))

}

function converSecondsToTime(seconds){
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

function checkTime(t) {
    if (t < 10) {
      t = "0" + t;
    }
    return t;
}

function getLocalTime(){

    var today = new Date();
    var h = checkTime(today.getHours());
    var m = checkTime(today.getMinutes());
    var s = checkTime( today.getSeconds());
    return h+":"+m+":"+s

}

export { converSecondsToTime, convertTimeToSecond , checkTime , getLocalTime }