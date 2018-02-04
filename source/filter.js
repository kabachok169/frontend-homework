'use strict';


const changer = {
    '<' : '&lt;',
    '>' : '&gt;',
    '&' : '&amp;',
    '\"' : '&quot;',
    '\'' : '&#39;'
};

const screen = (input, beginPos, endPos) => input.slice(beginPos, endPos).replace(/(['"&<>])/gi, (specialSymbol) =>
        changer[specialSymbol]);

const createReg = (tags) => tags.reduce((pattern, item) => 
        pattern + `\<${item}\>|\<\/${item}\>|`, '').slice(0, -1);

const filter = function (input, tags) {

    if (!input) {
        return '';
    } else if (!tags.length) {
        return screen(input, 0, input.length);
    }

    let result = '';
    let compareResult = '';

    let reg = new RegExp(createReg(tags), 'gi');

    let previousIndex = 0;
    
    while (compareResult = reg.exec(input)) {

        if (previousIndex < compareResult.index) {
            result += screen(input, previousIndex, compareResult.index);
        }

        result += compareResult[0];
        previousIndex = compareResult.index + compareResult[0].length;
    }

    result += screen(input, previousIndex, input.length);

    return result;
};

