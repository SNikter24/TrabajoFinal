function sennalizacion(resultado, AM, resultadoGral){
    resultado.titulo="[Punto 7] AVISOS"
    if (AM && resultadoGral.senalizar) {
        resultadoGral.senalizar =true;
        resultado.razones.push("Las antenas que usan frecuencia AM estan obligadas a señalizar.")
        resultado.razones.push("Se necesita señalizar. Revise los detalles en las entradas.")
        resultado.razones.push("Véase las figuras de abajo para saber los diseños alabados por la ANE para señalizar.");
    }else if ( resultadoGral.senalizar ){
        resultado.razones.push("Se necesita señalizar. Revise las entradas para ver detalles.")
        resultado.razones.push("Véase las figuras de abajo para saber los diseños alabados por la ANE para señalizar.");
    }else{
        resultado.conforme = true;
        resultado.razones.push("No se necesita señalizar.")
    }


    
    return resultado;
}
