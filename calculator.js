
class Calculator {
    prev = 0;
    prevVals = '';
    val = '0';
    operator = '';
    awaitingInput = false;
    overwrite = true;

    constructor() {
        
    }

    updateCurrentValText() {
        document.querySelector(`#current-val`).textContent = this.val;
    }

    updatePrevCalcsText() {
        document.querySelector(`#prev-calcs`).textContent = this.prevVals;
    }

    updateVal(e) {
        if(!this.awaitingInput && e.target.textContent === '.' && this.val.includes('.')) return;
        
        this.val = this.val == '0' || this.awaitingInput ? e.target.textContent : this.val + e.target.textContent;
        this.val === '.' ? this.val = '0.' : '';
        this.updateCurrentValText();

        this.awaitingInput = false;

        if(this.operator === '') {
            this.prevVals = `Ans = ${this.prev}`;
            this.updatePrevCalcsText();
        }
    }

    handleOperator(e) {
        if(this.operator !== '') {
            this.handleEquals();
        }
        this.operator = e.target.textContent;
        console.log(this.operator)
        this.prev = +this.val;
        this.awaitingInput = true;
    }

    add() {
        this.prevVals = `${this.prev} + ${this.val} =`;
        return this.prev + +this.val;
    }

    sub() {
        this.prevVals = `${this.prev} - ${this.val} =`;
        return this.prev - this.val;
    }

    mult() {
        this.prevVals = `${this.prev} x ${this.val} =`;
        return this.prev * this.val;
    }

    div() {
        this.prevVals = `${this.prev} ÷ ${this.val} =`;
        if(this.val === '0') return 'ERROR';

        return Math.ceil(this.prev / this.val * 100) / 100;
    }

    handleEquals() {
        if(this.awaitingInput) return;

        let result = this.val;

        switch(this.operator) {
            case '+': {
                result = this.add();
                break
            }
            case '-': {
                result = this.sub();
                break
            }
            case 'x': {
                result = this.mult();
                break
            }
            case '÷': {
                result = this.div();
                break
            }
        }

        this.val = "" + result;
        this.updateCurrentValText();
        this.operator = '';
        this.updatePrevCalcsText();
        this.awaitingInput = true;
    }

    setPositive() {
        let sign = document.querySelector(`#negative`);
        if(sign) sign.classList.remove(`active`);
    }

    clear() {
        this.prev = 0;
        this.val = '0';
        this.updateCurrentValText();

        this.prevVals = '';
        this.updatePrevCalcsText();

        this.operator = '';
        this.awaitingInput = false;
        this.setPositive();
    }

    delete() {
        if(this.awaitingInput) return;
        
        this.val = this.val.slice(0, this.val.length - 1);
        if(this.val.length === 0) {
            this.val = '0';
        }

        this.updateCurrentValText();
    }

    sign() {
        document.querySelector(`#negative`).classList.toggle(`active`);
    }

    handleFunc(e) {
        let func = e.target.id;
        
        switch(func) {
            case 'clear': {
                this.clear();
                break;
            }
            case 'delete': {
                this.delete();
                break;
            }
            case 'sign': {
                this.sign();
                break;
            }
        }
    }
}

let calc = new Calculator();

let numButtons = document.querySelectorAll(`.number-button`);
numButtons.forEach(button => button.addEventListener('click', calc.updateVal.bind(calc)));

let opButtons = document.querySelectorAll(`.operator-button`);
opButtons.forEach(button => button.addEventListener('click', calc.handleOperator.bind(calc)));

let eqButton = document.querySelector(`.equals-button`);
eqButton.addEventListener('click', calc.handleEquals.bind(calc));

let funcButtons = document.querySelectorAll(`.function-button`);
funcButtons.forEach(button => button.addEventListener('click', calc.handleFunc.bind(calc)));
