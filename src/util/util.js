export const isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

export const isAPP = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('android') > -1 || ua.indexOf('ios') > -1 ) {
        return true;
    } else {
        return false;
    }
}