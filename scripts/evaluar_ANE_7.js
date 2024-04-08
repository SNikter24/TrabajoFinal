function sennalizacion(resultado, AM, resultadoGral){
    resultado.titulo="[Punto 7] AVISOS"
    if (AM && resultadoGral.senalizar) {
        resultadoGral.senalizar =true;
        resultado.razones.push("Las antenas que usan frecuencia AM estan obligadas a señalizar.<a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=39' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver</a>")
        resultado.razones.push("Se necesita señalizar. Revise las entradas de arriba para ver detalles.<a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=39' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver el procedimiento</a>")
        resultado.razones.push("Véase las figuras de abajo para saber los diseños alabados por la ANE para señalizar.");
    }else if ( resultadoGral.senalizar ){
        resultado.razones.push("Se necesita señalizar. Revise las entradas de arriba para ver detalles.<a href='https://www.ane.gov.co/Sliders/ANE%202021/Resolucio%CC%81n%20%20No.%20000773%20de%2031102023.pdf#page=39' rel='noopener noreferrer nofollow' target='_blank'>Click aqui para ver el procedimiento</a>")
        resultado.razones.push("Véase las figuras de abajo para saber los diseños alabados por la ANE para señalizar.");
    }else{
        resultado.conforme = true;
        resultado.razones.push("No se necesita señalizar.")
    }


    
    return resultado;
}
