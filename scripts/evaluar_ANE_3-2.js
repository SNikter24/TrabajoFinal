function minDistanciaPublico(resultado, PIRE, frecuencia, a, resultadoGral){

    let r_min = 0;
    resultado.titulo = "[Punto 3.2] Espacio Publico General: Evaluacion simplificada para bandas no IMT"
    if (frecuencia < 30){
        resultado.medicion = true;
        resultadoGral.medicion = true;
        resultadoGral.senalizar = true;
        resultado.razones.push("La frecuencia es menor de 30Mhz, se debe seguir el procedimiento del punto 3.4 para mediciones de campos electromagnéticos. <a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=25' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>");
        resultado.razones.push("Posiblemente se deba señalizar.");
            return resultado;
    }
    resultado.razones.push("Vease la Figura 1 para saber el cálculo.");

    if (30 <= frecuencia && frecuencia <= 400){
        if (PIRE > 0){
            r_min = 0.319*Math.sqrt(PIRE);
        }else{r_min = 0}
    }else if(400 < frecuencia && frecuencia <= 2000 && frecuencia > 0){
        if (PIRE > 0){
            r_min = 6.38*Math.sqrt(PIRE/frecuencia);        
        }else {r_min = 0}
    }else if ( 2000 < frecuencia && frecuencia <= 300000 ){
        if (PIRE > 0){
            r_min = 0.143*Math.sqrt(PIRE);        
        }else {r_min = 0}
    }else{
        resultado.medicion = true;
        resultadoGral.medicion = true;
        resultado.razones.push("La frecuencia esta fuera de los rangos de evaluacion. Verifique su medicion de la frecuencia.");
        return resultado;
    }

    if ( r_min > a ){
        resultado.medicion = true;
        resultado.conforme = true;
        resultadoGral.conforme = true;
        resultadoGral.medicion = true;
        resultado.razones.push(`Ya que la distancia <b>r</b>: ${r_min.toFixed(2)} mts > <b>a</b>: ${a} mts, se requiere de la medicion en la distancia poblacional. Lease punto 3.2. <a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=23' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>`);
    }else if (r_min == a){
        resultado.razones.push('Su PIRE es de 0, verifique sus datos.');
    }else{
        resultado.conforme = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia <b>r</b>: ${r_min.toFixed(2)} mts <  <b>a</b>: ${a} mts, no se requiere de la medicion en la distancia poblacional, ya que no se puede obtener la distancia <b>d</b>. Lease punto 3.2.  <a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=23' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>`);
    }

    resultado.razones.push("<b>Solo aplica en contexto de región de campo lejano</b>")

    eANE32_debug(resultado);

    return resultado;
}

function minDistanciaOcupacional(resultado, PIRE, frecuencia, a, resultadoGral){

    let r_min = 0;
    resultado.titulo = "[Punto 3.2] Espacio Ocupacional: Evaluacion simplificada para bandas no IMT"

    if (frecuencia < 30){
        resultado.medicion = true;
        resultadoGral.medicion = true;
        resultadoGral.senalizar = true;
        resultado.razones.push("La frecuencia es menor de 30Mhz, se debe seguir el procedimiento del punto 3.4 para mediciones de campos electromagnéticos.<a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=25' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>");
        resultado.razones.push("Posiblemente se deba señalizar.");
        return resultado;
    }
    resultado.razones.push("Vease la Figura 1 para saber el cálculo.");

    if (30 <= frecuencia && frecuencia <= 400){
        if (PIRE > 0){
            r_min = 0.143*Math.sqrt(PIRE);        
        }else {r_min = 0}
    }else if(400 < frecuencia && frecuencia <= 2000){
        if (PIRE > 0){
            r_min = 2.92*Math.sqrt(PIRE/frecuencia);        
        }else {r_min = 0}
    }else if ( 2000 < frecuencia && frecuencia <= 300000 ){
        if (PIRE > 0){
            r_min = 0.0638*Math.sqrt(PIRE);        
        }else {r_min = 0}
    }else{
        resultado.medicion=true;
        resultadoGral.medicion = true;
        resultado.razones.push("La frecuencia esta fuera de los rangos de evaluacion. Verifique su medicion de la frecuencia.");
        return resultado;

    }

    if ( r_min > a ){
        resultado.medicion = true;
        resultado.conforme = true;
        resultadoGral.senalizar = true;
        resultadoGral.conforme = true;
        resultadoGral.medicion = true;
        resultado.razones.push(`Ya que la distancia <b>r</b>: ${r_min.toFixed(2)} mts > <b>a</b>: ${a} mts, se requiere de la medicion y señalización en la distancia ocupacional y de rebasamiento. Lease punto 3.2. <a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=23' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>`);
    }else if (r_min == a){
        resultado.razones.push('Su PIRE es de 0, verifique sus datos.');
    }else{
        resultado.conforme = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia <b>r</b>: ${r_min.toFixed(2)} mts < <b>a</b>: ${a} mts, no se requiere de la medicion ó señalización en la distancia ocupacional y de rebasamiento, ya que no se puede obtener la distancia <b>d</b>. Lease punto 3.2.  <a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=23' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>`);
    }

    resultado.razones.push("<b>Solo aplica en contexto de región de campo lejano</b>")
    eANE32_debug(resultado);

    return resultado;
}

function eANE32_debug(que){
    console.info(que,typeof(que));
    console.table(que);
}
