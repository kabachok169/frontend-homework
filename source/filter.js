'use strict';


const changer = {
    '<' : '&lt;',
    '>' : '&gt;',
    '&' : '&amp;',
    '\"' : '&quot;',
    '\'' : '&#39;'
};


const screen = (input, beginPos, endPos) => input.slice(beginPos, endPos).replace(/(['"&<>])/gi, function ($0) {
        return changer[$0];
    });


const createReg = function (tags) {

    let regPattern = '';

    tags.forEach(function (item, i, arr) {
        regPattern += `\<${item}\>|\<\/${item}\>|`;
    });

    regPattern = regPattern.slice(0, regPattern.length - 1);

    return regPattern;
};


const filter = function (input, tags) {

    if(!input) {
        return '';
    }
    else if(!tags.length) {
        return screen(input, 0, input.length);
    }

    let result = '';
    let compareResult = '';

    let reg = new RegExp(createReg(tags), 'gi');

    let prevIndex = 0;
    
    while (compareResult = reg.exec(input)) {

        if (prevIndex < compareResult.index) {
            result += screen(input, prevIndex, compareResult.index);
        }

        result += compareResult[0];

        prevIndex = compareResult.index + compareResult[0].length;
    }

    result += screen(input, prevIndex, input.length);

    return result;
};
