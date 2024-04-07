function minDistanciaPublico(resultado, PIRE, frecuencia, a, resultadoGral){

    let r_min = 0;
    resultado.titulo = "[Punto 3.2] Procesos para evaluacion simplificada espacio publico general para bandas no IMT"

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
        resultado.razones.push("La frecuencia esta fuera de los rangos de evaluacion. Verifique su medicion de la frecuencia.");
        return resultado;
    }

    if ( r_min > a ){
        resultado.medicion = true;
        resultado.conforme = true;
        resultadoGral.senalizar = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia r: ${r_min} > ${a}, se requiere de la medicion en la distancia poblacional. Lease punto 3.2.`);
    }else if (r_min == a){
        resultado.razones.push('Su PIRE es de 0, verifique sus datos.');
    }else{
        resultado.conforme = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia r: ${r_min} < ${a}, no se requiere de la medicion en la distancia poblacional, ya que no se puede obtener. Lease punto 3.2`);
    }

    eANE32_debug(resultado);

    return resultado;
}

function minDistanciaOcupacional(resultado, PIRE, frecuencia, a, resultadoGral){

    let r_min = 0;
    resultado.titulo = "[Punto 3.2] Procesos para evaluacion simplificada espacio ocupacional para bandas no IMT"

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
        resultado.razones.push("La frecuencia esta fuera de los rangos de evaluacion. Verifique su medicion de la frecuencia.");
        return resultado;

    }

    if ( r_min > a ){
        resultado.medicion = true;
        resultado.conforme = true;
        resultadoGral.senalizar = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia r: ${r_min} > ${a}, se requiere de la medicion en la distancia ocupacional. Lease punto 3.2.`);
    }else if (r_min == a){
        resultado.razones.push('Su PIRE es de 0, verifique sus datos.');
    }else{
        resultado.conforme = true;
        resultadoGral.conforme = true;
        resultado.razones.push(`Ya que la distancia r: ${r_min} < ${a}, no se requiere de la medicion en la distancia ocupacional, ya que no se puede obtener. Lease punto 3.2`);
    }

    eANE32_debug(resultado);

    return resultado;
}

function eANE32_debug(que){
    console.info(que,typeof(que));
    console.table(que);
}
