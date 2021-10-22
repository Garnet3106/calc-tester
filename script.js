// note: undefined: 未設定; NaN: 無効な値
let nowAnswer = undefined;
let supportedOperators = ['+', '-', '*', '/', '^'];

$(() => {
    changeQuestion();

    let $answer = $('#answer');
    $answer.on('keydown', (event) => {
        if(event.code == 'Enter') {
            checkAnswer($answer.val(), changeQuestion, () => {
                let $answer = $('#answer');
                $answer.val('');
            });
        }
    });
});

function checkAnswer(usrAnswer, onSucceed, onFail) {
    console.log('ans');
    console.log(usrAnswer);
    let $answer = $('#answer');
    $answer.val('');

    let floatUsrAnswer = parseFloat(usrAnswer);

    if(nowAnswer == floatUsrAnswer) {
        onSucceed();
    } else {
        onFail();
    }
}

function changeQuestion() {
    let operator = getRandOperator();
    let leftSide = getRandNum(0, 19);
    let rightSide = getRandNum(0, 19);

    console.log(leftSide);
    console.log(rightSide);
    console.log(operator);

    let formula = formulaToString(operator, leftSide, rightSide);
    let generatedAnswer = calc(operator, leftSide, rightSide);

    // note: 指数が 3 以上の場合

    let isExponentMoreThanThree = false;

    if(operator == '^' && rightSide >= 3) {
        isExponentMoreThanThree = true;
    }

    // note: 小数点が 2 桁以上の場合

    let dividedAnswer = String(generatedAnswer).split('.');
    let isTwoOrMoreDigitNum = false;

    if(dividedAnswer.length == 2 && dividedAnswer[1].length >= 2) {
        isTwoOrMoreDigitNum = true;
    }

    if(generatedAnswer === undefined || generatedAnswer === NaN || isTwoOrMoreDigitNum || isExponentMoreThanThree) {
        changeQuestion();
        return;
    }

    nowAnswer = generatedAnswer;

    let $question = $('#question');
    $question.text(formula);

    let $answer = $('#answer');
    $answer.focus();
}

function getRandNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandOperator() {
    return supportedOperators[getRandNum(0, 4)];
}

function calc(operator, leftSide, rightSide) {
    switch(operator) {
        case '+':
        return leftSide + rightSide;

        case '-':
        return leftSide - rightSide;

        case '×':
        return leftSide * rightSide;

        case '÷':
        return leftSide / rightSide;

        case '^':
        return leftSide ** rightSide;
    }

    return NaN;
}

function formulaToString(operator, leftSide, rightSide) {
    return `${leftSide} ${operator} ${rightSide}`;
}
