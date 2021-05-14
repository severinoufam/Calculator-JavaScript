class CalcController {

    /**Construtor*/
    constructor(){

        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector("#display");//querySelector() acesso ao DOM(document).
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }
    /**Fim função*/

    /**Função colar N°*/
    pasteFromClipboard(){

        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);

        });
    }
    /**Fim função*/

    /**Função copiar N°*/
    copyToClipboard(){

        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();

    }
    /**Fim função*/

    /**Display calculadora*/
    initialize(){

        this.setDisplayDateTime();
        setInterval(() => {//Função intermitente (atualizar a hora a cada segundo em tempo real).
            this.setDisplayDateTime();
        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll(' .btn-ac').forEach(btn => {
            btn.addEventListener('dblclick', e => {
                this.toggleAudio();
            });
        });

    }
    /**Fim função*/

    /**Alternancia do audio*/
    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;//verifica audio (true / false).

    }
    /**Fim alternancia do audio*/

    /**Função toca audio*/
    playAudio(){

        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }

    }
    /**Fim função*/

    /**Função eventos do teclado*/
    initKeyboard(){

        document.addEventListener('keyup', e => {
            this.playAudio();

            switch (e.key){
                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;

                case '+':
                case '-':
                case '*':
                case '/': 
                case '%':
                    this.addOperation(e.key);
                    break;

                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                case '.':
                case ',':
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
                    this.addOperation(parseInt(e.key));
                    break;
                
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }
        });

    }
    /**Fim função*/

    /**Função retorna data e hora*/
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this.locale);//toLocaleDateString (Retorna Data)
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);//toLocaleTimeString (Retorna hora)
        
    }
    /**Fim função*/

    /**Função evento do click botao (multiplos eventos)*/
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {//split() converte strings em array. forEach() recebe o array que contem os eventos e percprre um evento por vez.
            element.addEventListener(event, fn, false);
        });

    }
    /**Fim*/

    /**Função limpa display.*/
    clearAll(){

        this._operation = [];//recebe um array limpo.
        this._lastNumber = '';//marca ultimo n° passado.
        this._lastOperator = '';//marca ultimo operador passado.
        this.setLastNumberToDisplay();

    }
    /**Fim função*/

    /**Função limpa ultimo valor o array*/
    clearEntry(){

        this._operation.pop();//pop() (remove valor no fim de array).
        this.setLastNumberToDisplay();

    }
    /**Fim função*/

    /**Função p/ pegar ultima possição do array.*/
    getLastOperation(){

        return this._operation[this._operation.length - 1];
        
    }
    /**Fim função*/

    /**Função defini ultima operação*/
    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;

    }
    /**Fim função*/

    /**Função troca de operador */
    isOperador(value){

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);//verifica o operador.

    }
    /**Fim função*/

    /**Função veficica obj no array e calcula se tiver mais que 3 obj.*/
    pushOperation(value){
        
        this._operation.push(value);
        if(this._operation.length > 3){    
            this.calc();
        }

    }
    /**Fim função*/

    getResult(){

        try{
            return eval(this._operation.join(""));
        }catch(e){
            setTimeout(() => this.setError(), 1);

        }
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
        }else if(this._operation.length === 3){
            this._lastNumber = this.getLastItem(false);  
        }

        let result = this.getResult();//join() (converte obj de um array em uma strig). eval() (função de calcula valores da string).

        if(last === '%'){//calcula a porcentagem.
            result /= 100;
            this._operation = [result];
        }else{
            this._operation = [result];

            if (last) this._operation.push(last);

        }
        this.setLastNumberToDisplay();

    }
    /**Fim função.*/

    getLastItem(isOperador = true){

        let lastItem;
        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperador(this._operation[i]) === isOperador){
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
    /**Fim função*/

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
                this.setLastOperation(newValue);//push() (adiciona valor no fim do array).
                this.setLastNumberToDisplay();//atualiza e exibe numerlo n o display.
            }

        }
        
    }
    /**Fim função*/

    /**Função error */
    setError(){

        this.displayCalc = "Error";

    }
    /**Fim*/

    /**Função que add o ponto*/
    addDot(){

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split(' ').indexOf('.') > -1) return;//nao deixa add o ponto a mais.
            if(this.isOperador(lastOperation) || !lastOperation){
                this.setLastOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();

    }
    /**Fim função*/

    /**Ações da calculadora.*/
    execBtn(value){

        this.playAudio();

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
        }

    }
    /**Fim função*/

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
    /**Fim função*/

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

        if(value.toString().length > 10){
            this.setError();
            return false;
        }
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