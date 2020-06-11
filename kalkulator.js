const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    //kita ubah juga logika yang terdapat pada fungsi inputDigit() dengan menambahkan kondisi pengecekkan terhadap nilai operator, dan displayNumber. Sehingga fungsi inputDigit()
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === 0) {
            calculator.displayNumber = digit;
        } else
            calculator.displayNumber += digit;

    }
}


function ubahKeNegatif() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function mengaktifkanOperator(operator) {
    //**Fungsi tersebut membutuhkan satu buah argument yang merupakan 
    //sebuah operator. Nilai operator tersebut bersumber dari innerText tombol operator yang menjadi 
    //event target. Secara prinsip fungsi ini bertujuan untuk menyimpan operator dan firstNumber dengan nilai displayNumber saat ini pada object calculator, hanya jika properti waitingForSecondNumber bernilai false. Namun jika waitingForSecondNumber bernilai true, browser akan menampilkan alert() dengan pesan “Operator sudah ditetapkan */
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }

}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("anda belum mentapkan operator");
        return;
    }
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {

    button.addEventListener('click', function (event) {
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            ubahKeNegatif();
            updateDisplay();
            return;
        }
        if (target.classList.contains('equals')) {

            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            mengaktifkanOperator(target.innerText)
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}