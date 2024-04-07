//import { minDistanciaPublico, minDistanciaOcupacional } from "./evaluar_ANE_3-2.js";

class Antena {

    potTrans = 0;
    antena_dbi = 0;
    antena_dbd = 0;
    atenuacion = 0;
    amplificador = 0;

    pire = 0;
    per = 0;

    frecuencia = 0;
    altura = 0;

    constructor(potenciaTransmisor, gananciaAntena_dBi, gananciaAntena_dBd,
                atenuacion, amplificador, frecuencia, altura){
        
        // valores en dB
        this.potTrans = potenciaTransmisor;
        this.antena_dbi = gananciaAntena_dBi;
        this.antena_dbd = gananciaAntena_dBd;
        this.atenuacion = atenuacion;
        this.amplificador = amplificador;

        this.frecuencia = frecuencia; // MHz
        this.altura= altura; // mts

        // valores en W
        this.pire = this.potTrans + this.antena_dbi + this.amplificador + this.atenuacion;
        this.per = this.potTrans + this.antena_dbd+ this.amplificador + this.atenuacion;
        this.pire = this.dBtoW(this.pire)
        this.per = this.dBtoW(this.per)

        this.evaluaciones = [];

    }

    // W -> dBm
    WtodBm(value){
        return 10*Math.log10(value/0.001);
    }

    // W -> dB
    WtodBW(value){
        return 10*Math.log10(value);
    }

    // dB -> W
    dBtoW(value){
        return Math.pow(10,value/10);
    }

    // dB -> dBm
    dBtodBm(value){
        return value+30;
    }

    // dBm -> dB
    dBmtodB(value){
        return value-30;
    }
}

function debug(antena){
    console.table(antena);
}

function darResultados(){
    const potenciaTrans = parseFloat(document.getElementById('potenciaTransmisor').value);
    const amplificador = parseFloat(document.getElementById('amplificador').value);
    const atenuacion = parseFloat(document.getElementById('atenuacion').value);
    const antena_dbi = parseFloat(document.getElementById('gananciaAntena_dbi').value);
    const antena_dbd = parseFloat(document.getElementById('gananciaAntena_dbd').value);

    const frecuencia = parseFloat(document.getElementById('frecuencia').value);
    const altura = parseInt(document.getElementById('altura').value);

    const antena = new Antena(potenciaTrans, antena_dbi, antena_dbd, atenuacion, amplificador, frecuencia, altura);

    darPIRE_PER(antena);
    const evaluaciones = evaluacion(antena);
    evaluaciones.forEach((eva)=>{
        const padre = document.getElementById("quepasoCrack");
        const temp = document.createElement('div');
        temp.innerHTML = eva;
        padre.appendChild(temp);
    });

    debug(antena);
}
           
function darPIRE_PER(antena) {

    const pire_w = antena.pire;
    const pire_db = antena.WtodBW(pire_w);
    const pire_dbm = antena.WtodBm(pire_w);

    const per_w = antena.per;
    const per_db = antena.WtodBW(per_w);
    const per_dbm = antena.WtodBm(per_w);

    document.getElementById('resultadosEIRP').innerHTML = 
        '<strong>PIRE:</strong><br>' +
        'PIRE en dBW: ' + pire_db.toFixed(2) + ' dBW'+'<br>' +
        'PIRE en vatios: ' + pire_w.toFixed(2) + ' W<br>' +
        'PIRE en dBm: ' + pire_dbm.toFixed(2)+ ' dBm';

    document.getElementById('resultadosERP').innerHTML = 
        '<strong>PER (PRA):</strong><br>' +
        'PER en dBW: ' + per_db.toFixed(2) +' dBW'+ '<br>' +
        'PER en vatios: ' + per_w.toFixed(2) + ' W<br>' +
        'PER en dBm: ' + per_dbm.toFixed(2)+' dBm ';
}

function elementoChequeo(informacion){

    const clConforme = informacion.conforme ? "alert-success" : "alert-warning";
    const listaRazones = informacion.razones.map((razon)=>`<p>${razon}</p>`) 
    

   let elemento =`
    <div class="alert ${clConforme}" role="alert">
    <p><strong>${informacion.titulo}</strong></p>
    `;

    if (informacion.medicion) {
        elemento = elemento.concat("\n","<h3><strong>SE TIENE QUE MEDIR</strong></h3>")
    }

    listaRazones.forEach((razon)=> (elemento = elemento.concat("\n",razon)))
    elemento = elemento.concat("\n","</div>")

    return elemento;

}

function chequeos(funcion_eval, ...args){
    const informacion = {
        medicion: false,
        conforme: false,
        titulo: "",
        razones: []
    }

    return funcion_eval(informacion, ...args)
}

function evaluacion(antena){

    let listaElementos=[]
    let resultadoGral = {
        senalizar : false,
        conforme: false,
        medicion: false
    }

    listaElementos.push(
            elementoChequeo(
                chequeos(minDistanciaPublico, antena.pire,
                        antena.frecuencia, antena.altura, resultadoGral)
            ));

    listaElementos.push(
            elementoChequeo(
                chequeos(minDistanciaOcupacional, antena.pire,
                        antena.frecuencia, antena.altura, resultadoGral)
            ));

    return listaElementos;
    
}
