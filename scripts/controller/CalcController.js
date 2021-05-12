class CalcController {

    /**Construtor Display, hora e data (privados).*/
    constructor(){

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

        //split() cinverte strings em array
        //forEach() recebe o array que contem os eventos e percprre um evento por vez.
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }
    /**Fim função click multiplos eventos.*/

    /**Função limpa display.*/
    clearAll(){

        this._operation = [];//recebe um array limpo.

    }
    /**Fim função limpa display.*/

    /**Função limpa */
    clearEntry(){

        this._operation.pop();//pop() (remove valor no fim de array).

    }
    /**Fim função limpa.*/

    /**Função operador.*/
    addOperation(value){

        this._operation.push(valuer);//push() (adiciona valor no fim do array).

    }
    /**Fim operador.*/

    /**Função error */
    setError(){

        this.displayCalc = "Error";

    }
    /**Fim função error.*/

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
                this.clearEntry();
                break;

            case 'subtracao':
                this.clearEntry();
                break;
            
            case 'divisao':
                this.clearEntry();
                break;

            case 'multiplicacao':
                this.clearEntry();
                break;
            
            case 'porcento':
                this.clearEntry();
                break;

            case 'igual':
                this.clearEntry();
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
                this._operation(parseIntvalue);
                break;

            default:
                this.setError();
                break;


        }

    }
    /**Fim ações p/ o botao clicado.*/

    /**Evento dos botões.*/
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
    /**Fim evento dos botoes.*/

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