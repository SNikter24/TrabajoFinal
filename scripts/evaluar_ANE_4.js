function estacionesConformes(resultados, pire, pra, fm, a, resultadosGral){
    resultados.titulo = "[Punto 4] Estaciones para las cuales no se requiere llevar a cabo procedimientos de evaluacion y que son conformes."
    if (pire < 2) {
        resultadosGral.conforme = true;
        resultados.conforme = true;
        resultados.razones.push("Debido a que el PIRE < 2 W, es inherentement conforme. No necesita medicion o evaluacion alguno.") 
    }

    if (pra < 250 && fm && ( (a/2)+2 >=8 )) {
        resultadosGral.conforme = true;
        resultados.conforme = true;
        resultados.razones.push("Debido a que su PRA < 250 W, usa una configuracion tipo FM, y la altura de su antena es lo suficientemente alta para estar conforme en relacion al espacio del publico general.") 
    }

    if (!resultados.conforme){
        resultados.razones.push("La configuracion de su antena no entra en el punto 4 de estaciones inherentemente conformes.")
        resultados.razones.push("Sin embargo si no entra en las opciones consideradas en el punto 4, no quiere decir que sea inconforme. Vease las otras evaluaciones para saber si es conforme y necesita medir y/o señalizar.")
    }

    return resultados;
}
