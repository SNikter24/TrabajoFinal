    //import { minDistanciaPublico, minDistanciaOcupacional } from "./evaluar_ANE_3-2.js";

    class Antena {

        potTrans = 0;
        antena_dbi = 0;
        antena_dbd = 0;
    atenuacion = 0;
    amplificador = 0;

    pire = 0;
    per = 0;

    am = false;
    fm = false;

    frecuencia = 0;
    altura = 0;

    constructor(potenciaTransmisor, gananciaAntena_dBi, gananciaAntena_dBd,
                atenuacion, amplificador, frecuencia, altura,
                am, fm){
        
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

        this.pire = this.dBmtoW(this.pire)
        this.per = this.dBmtoW(this.per)

        this.am = am;
        this.fm = fm;

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

    // dBm -> W
    dBmtoW(value){
        return 0.001*Math.pow(10,value/10);
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

function debug(que){
    console.table(que);
}

function ponerResultados(antena){
    const evaluaciones = evaluacion(antena);
    evaluaciones.forEach((eva)=>{
        const padre = document.getElementById("quepasoCrack");
        const temp = document.createElement('div');
        temp.innerHTML = eva;
        padre.appendChild(temp);
    });
}

function limpiarResultadosViejos(){
   const padre = document.getElementById("quepasoCrack");
   while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}

function darResultados(){
    const potenciaTrans = parseFloat(document.getElementById('potenciaTransmisor').value);
    const amplificador = parseFloat(document.getElementById('amplificador').value);
    const atenuacion = parseFloat(document.getElementById('atenuacion').value);
    const antena_dbi = parseFloat(document.getElementById('gananciaAntena_dbi').value);
    const antena_dbd = parseFloat(document.getElementById('gananciaAntena_dbd').value);

    const frecuencia = parseFloat(document.getElementById('frecuencia').value);
    const altura = parseInt(document.getElementById('altura').value);

    const am = document.getElementById('chk_am').checked;
    const fm = document.getElementById('chk_fm').checked;

    const antena = new Antena(potenciaTrans, antena_dbi, antena_dbd,
                              atenuacion, amplificador, frecuencia, altura,
                              am, fm);

    limpiarResultadosViejos();
    ponerResultados(antena);


    debug(antena);
}
           


function elementoChequeo(informacion){

    const clConforme = informacion.conforme ? "alert-success" : "alert-warning";
    const listaRazones = informacion.razones.map((razon)=>`<p>${razon}</p>`) 
    

   let elemento =`
    <div class="alert ${clConforme}" role="alert">
    <p><strong>${informacion.titulo}</strong></p>
    `;

    listaRazones.forEach((razon)=> (elemento = elemento.concat("\n",razon)))
    elemento = elemento.concat("\n","</div>")

    return elemento;

}

function elementoResultadoFinal(final){


    const senalizar = final.senalizar
    const medicion = final.medicion
   
    const queClase = (senalizar || medicion ) ? "alert-warning" : "alert-success";

    const pSenn = senalizar ? "TOCA SEÑALIZAR" : "NO TOCA SEÑALIZAR";
    const pMedicion = medicion ? "TOCA MEDIR" : "NO TOCA MEDIR";

   const elemento =`
    <div class="alert ${queClase}" role="alert">
        <h3>${pSenn}</h3>
        <h3>${pMedicion}</h3>
        <p> Lea las razones en las siguientes entradas </p>
    </div>
    `;

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

    const listaElementos=[]
    const resultadoGral = {
        senalizar : false,
        conforme: false,
        medicion: false
    }

    const conformeConANE_4 = elementoChequeo(
                chequeos(estacionesConformes, antena.pire,
                        antena.pra, antena.fm, antena.altura, resultadoGral)
            );

    listaElementos.push(conformeConANE_4);

    if(!resultadoGral.conforme){

        listaElementos.push(`<img src="assets/img1.png" alt="imagen de ayuda 1" width=400/>`);

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

        listaElementos.push(
                elementoChequeo(
                    chequeos(sennalizacion, antena.am, resultadoGral)
                ));
        
        if (resultadoGral.senalizar){
            listaElementos.push(`<p>Para señalar zonas de rebasamiento y ocupacional, usar los siguientes diseños.</p>`);
            listaElementos.push(`<img src="assets/avisos1.jpg" alt="rennales" width=400/>`);
            listaElementos.push(`<p>La zona de rebasamiento en la más cercana a la antena, la ocupacional es donde los trabajadores certificados estarán, la zona de conformidad es donde la gente civil va a estar.</p>`);
            listaElementos.push(`<img src="assets/acercade.jpg" alt="rennales" width=400/>`);
        }
    }

    listaElementos.unshift(elementoResultadoFinal(resultadoGral));


    debug(resultadoGral);

    return listaElementos;
    
}

function guardarDatosAntenaJs(){
    const potenciaTrans = parseFloat(document.getElementById('potenciaTransmisor').value);
    const amplificador = parseFloat(document.getElementById('amplificador').value);
    const atenuacion = parseFloat(document.getElementById('atenuacion').value);
    const antena_dbi = parseFloat(document.getElementById('gananciaAntena_dbi').value);
    const antena_dbd = parseFloat(document.getElementById('gananciaAntena_dbd').value);

    const frecuencia = parseFloat(document.getElementById('frecuencia').value);
    const altura = parseInt(document.getElementById('altura').value);

    const am = document.getElementById('chk_am').checked;
    const fm = document.getElementById('chk_fm').checked;
    const comentario = document.getElementById('comentario').value;

    return {
        potT : potenciaTrans,
        amp: amplificador,
        ate: atenuacion,
        a_dbi: antena_dbi,
        a_dbd: antena_dbd,
        freq: frecuencia,
        alt: altura,
        AM: am,
        FM: fm,
        com: comentario
    }

}

function ponerDatosCarga(datos){
    document.getElementById('potenciaTransmisor').value = datos.potT;
    document.getElementById('amplificador').value = datos.amp;
    document.getElementById('atenuacion').value = datos.ate;
    document.getElementById('gananciaAntena_dbi').value = datos.a_dbi;
    document.getElementById('gananciaAntena_dbd').value = datos.a_dbd;

    document.getElementById('frecuencia').value = datos.freq;
    document.getElementById('altura').value = datos.alt;

    document.getElementById('chk_am').checked = datos.AM;
    document.getElementById('chk_fm').checked = datos.FM;
    document.getElementById('comentario').value = datos.com;

}

function cargarJson(e){
    const fileReader = new FileReader();
    fileReader.readAsText(e.files[0], "UTF-8");
    fileReader.onload = e => {
      const file = (JSON.parse(e.target.result));
      ponerDatosCarga(file);
    };
    window.alert('Datos cargados exitosamente');
}

function guardarJson(){
    const antenaJs = guardarDatosAntenaJs();


    const jsonObj = `data:text/json;chatset=utf-8,${encodeURIComponent(
              JSON.stringify(antenaJs)
            )}`;

    const anchor = document.createElement("a");
    anchor.href = jsonObj;
    anchor.download = "DatosAntena.json";

    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    anchor.dispatchEvent(clickEvt);
    anchor.remove();

}

function imprimir(){ window.print() }

function comoCarajo(){
    window.alert(`Digite los valores en el formulario de la Antena, siguiendo los indicativos.\n\nEl boton de guardar mis datos descarga un formato de datos para guardarlos en su PC en formato .json.\n\nEl boton de imprimir imprime la evaluacion.\n\nEn 'Cargar datos de archivo' sirve para cargar los datos que guardo en formato .json y usarlos de nuevo en la evaluacion.\n
        `);
}
