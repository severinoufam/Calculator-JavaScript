class CalcController {

    //Construtor Display, hora e data (privados).
    constructor(){

        this.locale = 'pt-br';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();

    }

    //Inicializa display.
    initialize(){

        //Importa função.
        this.setDisplayDateTime();

        //Função intermitente.
        setInterval(() => {
            
            this.setDisplayDateTime();

        }, 1000);

    }

    //Retorna hora e date em tempo real.
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this.locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
        
    }

    //GET/SET hora exibido no display.
    get displayTime(){

        return this._timeEl.innerHTML;

    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;

    }
    //Fim GET/SET hora

    //GET/SET data exibido no display.
    get displayDate(){

        return this._dateEl.innerHTML;

    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;

    }
    //Fim GET/SET data

    //GET/SET valor exibido no display.
    get displayCalc(){

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;

    }
    //Fim GET/SET valor

    //GET/SET data atual exibido em tempo real.
    get currentDate(){

        return new Date();

    }

    set CurrentDate(value){

        this._currentDate = value;

    }
    //Fim GET/SET data atual.

}