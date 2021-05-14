class CalcController {

    /**Construtor Display, hora e data (privados).*/
    constructor(){

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this.locale = 'pt-br';
        this._displayCalcEl = document.querySelector("#display");//querySelector (da acesso a obj no DOM).
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    /**Inicializa display da culculadora.*/
    initialize(){

        //Importa função.
        this.setDisplayDateTime();

        //Função intermitente (atualizar a hora a cada segundo em tempo real).
        setInterval(() => {
            
            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();

    }
    /**Fim inicializa display.*/

    /**Retorna hora e date em tempo real para exibir no display.*/
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this.locale);//toLocaleDateString (Retorna Data)
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);//toLocaleTimeString (Retorna hora)
        
    }
    /**Fim retorno hora e data.*/

    /**Função click botao (multiplos eventos)*/
    addEventListenerAll(element, events, fn){

        //split() converte strings em array
        //forEach() recebe o array que contem os eventos e percprre um evento por vez.
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }
    /**Fim função click multiplos eventos.*/

    /**Função limpa display.*/
    clearAll(){

        this._operation = [];//recebe um array limpo.
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }
    /**Fim função limpa display.*/

    /**Função limpa */
    clearEntry(){

        this._operation.pop();//pop() (remove valor no fim de array).

        this.setLastNumberToDisplay();

    }
    /**Fim função limpa.*/

    /** */
    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;

    }

    /**Função troca de operador */
    isOperador(value){

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);//verifica o operador.

    }
    /**Fim função troca de operador.*/

    /**Função veficica obj no array e calcula se tiver mais que 3 obj.*/
    pushOperation(value){
        
        this._operation.push(value);

        if(this._operation.length > 3){
            
            this.calc();


        }

    }
    /**Fim função verifica obj.*/

    getResult(){

        return eval(this._operation.join(""));

    }

    /**Função calcula os valores.*/
    calc(){

        let last = '';//quarda obj da ultima possição do array.

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3 ){

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if(this._operation.length > 3){

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){

            this._lastNumber = this.getResult(false);  

        }

        //join() (converte obj de um array em uma strig).
        //eval() (função de calcula valores da string).
        let result = this.getResult();

        if(last == '%'){//calcula a porcentagem.

            result /= 100;

        }else{

            this.CurrentDate._operation = [result, last];

        }

        this.setLastNumberToDisplay();

    }
    /**Fim calcula.*/

    getLastItem(isOperador = true){

        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperador(this._operation[i]) == isOperador){

                lastItem = this._operation[i];

                break;

            }

        }

        if(!lastItem){

            lastItem = (isOperador) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    /**Função p/ percorrer o array e encontrar ultimo valor.*/
    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    /**Função percorre array.*/

    /**Função operador.*/
    addOperation(value){

        if(isNaN(this.getLastOperation())){//isNaN() (determina se um valor é um número ilegal (não é um número)).
            
            if(this.isOperador(value)){

                this.setLastOperation(value);

            }else{

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }


        }else{

            if(this.isOperador(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();//toString() Concatena valores.
                this._setLastOperation(newValue);//push() (adiciona valor no fim do array).

                //atualiza e exibe numerlo n o display.
                this.setLastNumberToDisplay();

            }

        }
        
    }
    /**Fim operador.*/

    /**Função p/ pegar ultima possição do array.*/
    getLastOperation(){

        this._operation[this._operation.length-1];

    }

    /**Função error */
    setError(){

        this.displayCalc = "Error";

    }
    /**Fim função error.*/

    /**Função que add o ponto.*/
    addDot(){

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'strig' && lastOperation.split(' ').indexOf('.') > -1) return;//nao deixa add o ponto a mais.

        if(this.isOperador(lastOperation) || !lastOperation){

            this.pushOperation('0.');

        }else{

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();

    }
    /**Fim função ponto.*/

    /**Ações da calculadora.*/
    execBtn(value){

        switch (value){

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;
            
            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;
            
            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;


        }

    }
    /**Fim ações p/ o botao clicado.*/

    /**Evento de click dos botoes da calculadora.*/
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");//querySelectorAll (da acessor a varios obj no DOM).

        buttons.forEach((btn, index) => {//forEach (para percorrer cada obj e retornar).

            this.addEventListenerAll(btn, "click drag", e => {//addEventListener (Evento de click no botão).

                let textBtn = btn.className.baseVal.replace("btn-","");//Captura  valor do botão.

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {//Função para mudar de seta para maozinha o cursor do mouse.

                btn.style.cursor = "pointer";

            });

        })

    }
    /**Fim evento de click.*/

    /**GET/SET hora exibido no display.*/
    get displayTime(){

        return this._timeEl.innerHTML;

    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;

    }
    /**Fim GET/SET hora.*/

    /**GET/SET data exibido no display.*/
    get displayDate(){

        return this._dateEl.innerHTML;

    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;

    }
    /**Fim GET/SET data.*/

    /**GET/SET valor exibido no display.*/
    get displayCalc(){

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;

    }
    /**Fim GET/SET valor.*/

    /**GET/SET data atual exibido em tempo real.*/
    get currentDate(){

        return new Date();

    }

    set CurrentDate(value){

        this._currentDate = value;

    }
    /**Fim GET/SET data atual.*/

}