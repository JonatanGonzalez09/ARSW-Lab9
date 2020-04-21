var bigInt = require("big-integer");

var memo = [];

function f(n) {
    var value;

    if (n === 0 || n === 1) {
        value = bigInt.one;
    } else {
        if (memo[n] != '') {
            value = memo[n];
        } else {
            memo[n] = f(n - 1) + f(n - 2);
            value = memo[n];
        }
    }
    return value;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        if (nth + 1 > memo.length) {
            memo = [];
            for (var i = 0; i < nth + 1; i++) {
                memo.push('');
            }
        }
        answer = f(nth);
    }

    context.res = {
        body: answer.toString()
    };
}