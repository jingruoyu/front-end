/**
 * Created by WeiWang on 2016/12/11.
 */
var _ = require('../../../lib/underscore.v1.8.3.js');
var parentList = [];
Date.prototype.DateToParse = function () {
    var d = this;
    return Date.parse(d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate());
};
var getElementLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
};
var getElementTop = function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
};
var formatTime = function (str) {
    var year = str.substr(0, 4);
    var month = str.substr(4, 2);
    var date = str.substr(6, 2);
    return new Date(year + '-' + month + '-' + date).getTime();
};
var handlePrice = function (priceData) {
    var periodCount = 0;
    var periodArray = [];
    var periodObj = {};
    var priceDataTemp = {};
    var len = priceData.length;
    for (var i = 0; i < len; i++) {
        if (!priceDataTemp[priceData[i].date]) {
            priceDataTemp[priceData[i].date] = {
                dateId: priceData[i].date,
                price: priceData[i].price,
                available: priceData[i].available,
                status: priceData[i].status,
                dateTimestamp: formatTime(priceData[i].date)
            };
            if (priceData[i].available) {
                periodArray.push(priceData[i].date);
            }
        }
    }

    var jLen = periodArray.length;
    var temp = [];
    for (var j = 0; j < jLen - 1; j++) {
        var time = formatTime(periodArray[j]);
        var next_time = formatTime(periodArray[j + 1]);
        var minus = next_time - time;
        if (minus > 86400000) {
            temp.push(j)
        }
    }
    temp.unshift(-1);
    temp.push(jLen);
    var pLen = periodArray.length;
    var xLen = temp.length;
    var z = 1;
    for (var k = 0; k < pLen; k++) {
        for (var x = 0; x < xLen - 1; x++) {
            var y = temp[x];
            if (k > temp[x] && k <= temp[x + 1]) {
                _.extend(priceDataTemp[periodArray[k]], {
                    series: x
                });
            }
        }
    }

    return priceDataTemp;
};
var getData = function (price, year, month) {
    var priceData = handlePrice(price);
    ly = parseInt(year) || new Date().getFullYear();
    lm = parseInt(month) || new Date().getMonth() + 1;

    ry = ly;
    rm = lm + 1;
    if (rm > 12) {
        ry = parseInt(ry) + 1;
        rm = rm % 12
    }
    var data = {
        leftData: {
            title: ly + '-' + (lm < 10 ? '0' + lm.toString() : lm),
            data: getMonthData(ly, lm, priceData)
        },
        rightData: {
            title: ry + '-' + (rm < 10 ? '0' + rm.toString() : rm),
            data: getMonthData(ry, rm, priceData)
        }
    };
    return data;
};
var getMonthData = function (y, m, priceData) {
    var month = [];
    var maxdays = (new Date(Date.parse(new Date(y, m, 1)) - 86400000)).getDate();  //当前月的天数
    d1 = new Date(y, m - 1); //要显示的日期
    //alert("要显示的日期"+d1);
    i1 = d1.getDay(); //这个月的第一天是星期几
    var len = 5;
    if ((i1 == 5 && maxdays == 31) || (i1 == 6 && maxdays > 29)) {
        len = 6
    }
    var today = new Date();//获取当前日期
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    today = today.DateToParse();
    for (j = 1; j <= len; j++) {
        var week = [];
        for (var k = 1; k <= 7; k++) {
            i2 = (j - 1) * 7 + k - i1;//alert("i2=" + i2);i2为格子的位置已当月第一天为1，前为0，-1，-2，后为2,3,4
            if (i2 < 1 || i2 > maxdays) {
                i2 = 0;
            }
            var obj = {date: i2}
            i3 = Date.parse(new Date(y, m - 1, i2));//当前格子的日期

            obj.today = today == i3 ? 0 : (today > i3 ? -1 : 1)

            var thisDate = y.toString() + (m < 10 ? '0' + m.toString() : m.toString() ) + (i2 < 10 ? '0' + i2.toString() : i2.toString());

            if (priceData[thisDate]) {
                _.extend(obj, {
                    date: i2,
                    price: priceData[thisDate].price,
                    available: priceData[thisDate].available,
                    status: priceData[thisDate].status,
                    dateId: priceData[thisDate].dateId,
                    dateTimestamp: priceData[thisDate].dateTimestamp,
                    series: priceData[thisDate].series
                });
            }
            week.push(obj);
        }
        month.push(week);
    }
    return month;
};
var getPosition = function (element) {
    return {
        top: getElementTop(element),
        left: getElementLeft(element)
    }
};
var getParents = function (element) {
    if (element.parentNode === null) {
        return;
    }
    parentList.push(element.parentNode);
    getParents(element.parentNode);
};
var isParent = function (child, parent) {
    parentList = [];
    getParents(child);
    return _.indexOf(parentList, parent) >= 0;
};
module.exports = {
    monthData: getData,
    getPosition: getPosition,
    isParent: isParent
};
