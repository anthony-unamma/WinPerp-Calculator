/* SWITCH BETWEEN BUY AND SELL ON THE CALCULATOR */

/* Immediately set the active-buy class on the checked option when the page loads */
document.addEventListener('DOMContentLoaded', function() {
    if(buySellChecked[0].checked) {
        buySellButton[0].classList.add('active-buy');
    }

    /* Assign green to the calculate button when the page loads */
    if(buySellButton[0].classList.contains('active-buy')) {
        calculateButton.classList.add('calc-buy');
        calculateButton.classList.remove('calc-sell');
    }
})


let buySellButton = document.querySelectorAll('label.button');
let buySellChecked = document.querySelectorAll('label.button > input');

/* Listener event to switch the highlighter between buy and sell */
buySellChecked[0].addEventListener('change', function() {
    if(buySellChecked[0].checked) {
        buySellButton[0].classList.add('active-buy');
        buySellButton[1].classList.remove('active-sell');

        /* Assign green or red based on the selected trade direction */
        calculateButton.classList.add('calc-buy');
        calculateButton.classList.remove('calc-sell');

    }
    else{
        buySellButton[0].classList.remove('active-buy');
        buySellButton[1].classList.add('active-sell');

        /* Assign green or red based on the selected trade direction */
        calculateButton.classList.remove('calc-buy');
        calculateButton.classList.add('calc-sell');


    }
})

buySellChecked[1].addEventListener('change', function() {
    if(buySellChecked[1].checked) {
        buySellButton[1].classList.add('active-sell');
        buySellButton[0].classList.remove('active-buy');

        /* Assign green or red based on the selected trade direction */
        calculateButton.classList.add('calc-sell');
        calculateButton.classList.remove('calc-buy');
    }
    else {
        buySellButton[1].classList.remove('active-sell');
        buySellButton[0].classList.add('active-buy');

        /* Assign green or red based on the selected trade direction */
        calculateButton.classList.add('active-buy');
        calculateButton.classList.remove('active-buy');
    }
})



/* SWITCH THE TEXT FROM % TO ENTRY/EXIT VALUE AND VICE VERSA */
let switchSlButton = document.querySelector('a.switch-sl-button');

let slPercent = document.querySelector('.inputs.sl-percent');

let slEntryExit = document.querySelector('.entry-exit');

let text1 = 'Switch to % value';
let text2 = 'Switch to Entry/Exit value'

switchSlButton.addEventListener('click', function() {
    slPercent.classList.toggle('remove');
    slEntryExit.classList.toggle('remove');
    switchSlButton.innerText = text2;

    if (slEntryExit.classList.contains('remove') == false) {
        switchSlButton.innerText = text1;
    }

})



const riskInfo = document.querySelector('.risk-field .info-tooltip');

const riskToolTip = document.querySelector('.risk-field .tooltip.risk');

/* Function to show and hide tooltip elements */
function show(tooltipElement) {
    tooltipElement.classList.add('show-tooltip');
}
function hide(tooltipElement) {
    tooltipElement.classList.remove('show-tooltip');
}

/* Event listeners to listen for hover and apply the show and hide functions for the risk amount tooltip */
riskInfo.addEventListener('mouseenter', function() {
    show(riskToolTip);
})

riskInfo.addEventListener('mouseleave', function() {
    hide(riskToolTip);
})

/* Event listeners to listen for hover and apply the show and hide functions for the SL % tooltip */
const slPercentInfo = document.querySelector('.sl-percent .info-tooltip');
const slPercentTooltip = document.querySelector('.percent-stoploss');

slPercentInfo.addEventListener('mouseenter', function() {
    show(slPercentTooltip);
})

slPercentInfo.addEventListener('mouseleave', function() {
    hide(slPercentTooltip);
})



const leverageInfo = document.querySelector('.leverage-input .info-tooltip');
const leverageTooltip = document.querySelector('.tooltip.lvg-input');

leverageInfo.addEventListener('mouseenter', function() {
    show(leverageTooltip);
})

leverageInfo.addEventListener('mouseleave', function() {
    hide(leverageTooltip);
})



function roundUpToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}

function resultsPercent(risk, stopLoss, leverage) {
    let posSize = (risk * 100)/stopLoss;
    let margin = posSize/leverage;
    posSize = (roundUpToTwoDecimalPlaces(posSize));
    margin = (roundUpToTwoDecimalPlaces(margin));
    let resultPercent = [posSize, margin];
    return resultPercent;
}

function resultsEntryExit(risk, entry, exit, leverage) {
    //for buy trades
    if(buySellButton[0].classList.contains('active-buy') && buySellButton[1].classList.contains('active-sell') == false) {
        //exit price cannot be greater than entry price for buy trades
        if(entry >= exit) {
            var stoplossPercent = ((entry - exit)/entry) * 100;
            console.log('buy');
        }
            
        //output error alert if exit is greater than entry price
        else if(entry < exit) {
            alert('Exit price cannot be greater than Entry price for Buy trades!')
        }   
    }

    //for sell trades
    else if(buySellButton[0].classList.contains('active-buy') == false && buySellButton[1].classList.contains('active-sell')) {
        if(exit >= entry) {
           var stoplossPercent = ((exit - entry)/entry) * 100;
            console.log('sell'); 
        }
        else if(exit < entry) {
            alert('Exit price cannot be less than Entry price for Sell trades!')
        }
        
    }

    var posSizeEnEx = (risk * 100)/stoplossPercent;
    var marginEnEx = posSizeEnEx/leverage;
    posSizeEnEx = (roundUpToTwoDecimalPlaces(posSizeEnEx));
    marginEnEx = (roundUpToTwoDecimalPlaces(marginEnEx));
    var resultsEnEX = [posSizeEnEx, marginEnEx];
    return resultsEnEX;
}

const inputFields = document.querySelectorAll('input.input-field');

let riskVal = 0;
let stopLossVal = 0;
let entryVal = 0;
let exitVal = 0;
let leverageVal = 0;



const calculateButton = document.querySelector('.calculate');

inputFields[0].addEventListener('input', function() {
    riskVal = parseFloat(this.value);
})

inputFields[1].addEventListener('input', function() {
    stopLossVal = parseFloat(this.value);
})

inputFields[2].addEventListener('input', function() {
    entryVal = parseFloat(this.value);
})

inputFields[3].addEventListener('input', function() {
    exitVal = parseFloat(this.value);
})

inputFields[4].addEventListener('input', function() {
        leverageVal = parseFloat(this.value);
})

    

function calculateEntryExit() {
    let resultsForEntryExit = resultsEntryExit(riskVal, entryVal, exitVal, leverageVal);

    console.log(resultsForEntryExit)
    if(isNaN(resultsForEntryExit[0]) || resultsForEntryExit[0] == Infinity) {
        resultPosSize.innerText = '--.-'
        resultMargin.innerText = '--.-'
    }  
    else {
        resultPosSize.innerText = resultsForEntryExit[0]
        resultMargin.innerText = resultsForEntryExit[1]
    }
    

}

function calculatePercent() {
    let resultsForPercent = resultsPercent(riskVal, stopLossVal, leverageVal);

    if(isNaN(resultsForPercent[0]) || resultsForPercent[0] == Infinity) {
        resultPosSize.innerText = '--.-'
        resultMargin.innerText = '--.-'
    }
    else {
        resultPosSize.innerText = resultsForPercent[0];
        resultMargin.innerText = resultsForPercent[1];
    }
    
}

//When the user clicks the 'calculate' button
calculateButton.addEventListener('mousedown', function() {
    if(switchSlButton.innerText == text1) {
        calculateEntryExit();
    }

    else if(switchSlButton.innerText == text2) {
       calculatePercent(); 
    }

})

/* When the user presses the enter key */
calculateButton.addEventListener('keydown', function (event) {
    if (event.key == 'Enter' || event.key == ' ') {
        if (switchSlButton.innerText == text1) {
            calculateEntryExit();
        }

        else if (switchSlButton.innerText == text2) {
            calculatePercent();
        }
    }


})




/* DISPLAY RESULTS */
let resultPosSize = document.querySelector('.amount h3');
let resultMargin = document.querySelector('.amount h6');
   

/* Click Reset button to reset the form */
let formInput = document.querySelector('.calc-fields');
let resetButton = document.querySelector('.button.rst');

function resetForm() {
    formInput.reset();
}
resetButton.addEventListener('mousedown', resetForm);



//Click the copy icon to copy the position size amount and display a copy successful message
const copyPosSizeIcon = document.querySelector('.copy-div');
const posSize = document.querySelector('div.amount h3');
const copySuccessMessage = document.querySelector('.success-msg');

copyPosSizeIcon.addEventListener('mousedown', function() {
    navigator.clipboard.writeText(posSize.textContent);
    copySuccessMessage.classList.remove('remove');

    setTimeout(function() {
        copySuccessMessage.classList.add('remove');
    }, 2000);
})