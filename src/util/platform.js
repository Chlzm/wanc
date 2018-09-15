const { userAgent } = navigator;
const REG_APP_USERAGENT = /kdxj/;
const REG_APPVERSION_USERAGENT = /kdxj\/(\d{1,3}\.\d{1,3}\.\d{1,3})/;
const REG_IOS_USERAGENT = /\(i[^;]+;( U;)? CPU.+Mac OS X/;
const REG_ANDROID_USERAGENT = /Adr|Android/;
const REG_WEICHAT_USERAGENT = /MicroMessenger/;
const REG_QQ_USERAGENT = /\sQQ/i;

export default {
    isApp: REG_APP_USERAGENT.test(userAgent),
    isIos: REG_IOS_USERAGENT.test(userAgent),
    isAndroid: REG_ANDROID_USERAGENT.test(userAgent),
    isWeChat: REG_WEICHAT_USERAGENT.test(userAgent),
    isQQ: REG_QQ_USERAGENT.test(userAgent),
    version: userAgent.replace(REG_APPVERSION_USERAGENT, '$1'),
};
