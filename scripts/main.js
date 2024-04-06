/*Las variables  valoresErpPorBanda valoresErpPorBanda1 son arreglos globales las cuales se crean
para poder obtener los resultados en la funcion calcularEIRPyERP
*/
let valoresErpPorBanda = 0;
let valoresErpPorBanda1 = 0; 
           
function calcularEIRPyERP() {
            let potenciaTransmisorWatt = document.getElementById('potenciaTransmisor').value;
            const gananciaAntena = document.getElementById('gananciaAntena').value;
            const atenuacion = document.getElementById('atenuacion').value;

            if (potenciaTransmisorWatt <= 0){
                potenciaTransmisorWatt = 1
                return;
            }

            /*Calculo del PIRE*/
            let potenciaTransmisorDBW = 10 * Math.log10(potenciaTransmisorWatt);
            let eirpDBW = potenciaTransmisorDBW + gananciaAntena - atenuacion;
            let eirpWatt = Math.pow(10, eirpDBW / 10);
            let eirpDBm = eirpDBW + 30;

            // Aquí se calcula el ERP
            let perdbm=eirpDBm-2.15;
            let perdbw=perdbm-30;
            let perdbV= Math.pow(10,perdbw/10);
            let gananciaAntenaLineal = Math.pow(10, gananciaAntena / 10);
            let erpWatt = potenciaTransmisorWatt * gananciaAntenaLineal; // ERP en vatios
            let erpDBW = 10 * Math.log10(erpWatt); // ERP en dBW
            let erpDBm = erpDBW + 30; // ERP en dBm

            document.getElementById('resultadosEIRP').innerHTML = 
                '<strong>PIRE:</strong><br>' +
                'PIRE en dBW: ' + eirpDBW.toFixed(2) + ' dBW'+'<br>' +
                'PIRE en vatios: ' + eirpWatt.toFixed(2) + ' W<br>' +
                'PIRE en dBm: ' + eirpDBm.toFixed(2)+ ' dBm';

            document.getElementById('resultadosERP').innerHTML = 
                '<strong>PER (PRA):</strong><br>' +
                'PER en dBW: ' + perdbw.toFixed(2) +' dBW'+ '<br>' +
                'PER en vatios: ' + perdbV.toFixed(2) + ' W<br>' +
                'PER en dBm: ' + perdbm.toFixed(2)+' dBm ';
                valoresErpPorBanda = eirpWatt;
                valoresErpPorBanda1 = perdbV;
}
        
function calcularRelacionExposicion () {
        const frecuencia = document.getElementById('frecuencia').value;
        let alturaRadiacion= document.getElementById('alturaRadiacion').value;
        const eripWattActual = valoresErpPorBanda
        const erpWattActual = valoresErpPorBanda1
  
      if (0.1 <= frecuencia && frecuencia < 30) {
        document.getElementById('ResultadosTres').innerHTML ='Esta adentro'+frecuencia.toFixed(2)+eripWattActual.toFixed(2);

          
        } else if (30 <=frecuencia && frecuencia <= 400) {
            alturaRadiacion=alturaRadiacion-2;
            /*Las variables minimaDistancia se usa para PIRE y minimaDistancia1 para PER y ambas 
             son para  Ocupacional */
            minimaDistancia=0.143*(Math.sqrt(eripWattActual));
            minimaDistancia1=0.184*(Math.sqrt(erpWattActual));
            /*Las variables minimaDistanciaPublic se usa para PIRE y minimaDistanciaPublic1 para PER y ambas 
             son para  Publico en General */
            minimaDistanciaPublic=0.319*(Math.sqrt(eripWattActual));
            minimaDistanciaPublic1=0.409*(Math.sqrt(erpWattActual));
            /*Estos document se hacen para limpiar las variables Resultados para que no tenga datos guardados en 
            cache para cuando se actualzia con otro dato de altura*/
            document.getElementById('ResultadosTres').innerHTML = '';
            document.getElementById('ResultadosCuatro').innerHTML = '';
            document.getElementById('ResultadosCinco').innerHTML = '';
            document.getElementById('ResultadosSeis').innerHTML = '';
            if(alturaRadiacion>minimaDistancia){
                document.getElementById('ResultadosTres').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCuatro').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCinco').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosSeis').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;

            }else {  
                /*MinimaDhorizontal evalua minimaDistancia para ocupacional, esto se hace para el pire */
                MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosTres').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                 </div>
                     `;
                     /*MinimaDhorizontal1 evalua minimaDistancia1 para ocupacional, esto se hace para el Per */
                MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCuatro').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                 </div>
                     `;
                /*MinimaDhorizontal2 evalua minimaDistanciaPublic para Publico en general, esto se hace para el Pire */
                MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCinco').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                 </div>
                     `;

                 /*MinimaDhorizontal3 evalua minimaDistanciaPublic1 para Publico en general, esto se hace para el PER */
                MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosSeis').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal3.toFixed(2)} (m).
                 </div>
                     `;
              
            }    
       } else if (400 < frecuencia && frecuencia <= 2000) {
         alturaRadiacion=alturaRadiacion-2;
            minimaDistancia=2.92*(Math.sqrt(eripWattActual/frecuencia));
            minimaDistancia1=3.74*(Math.sqrt(erpWattActual/frecuencia));
            minimaDistanciaPublic=6.38*(Math.sqrt(eripWattActual/frecuencia));
            minimaDistanciaPublic1=8.16*(Math.sqrt(erpWattActual/frecuencia));
            document.getElementById('ResultadosTres').innerHTML = '';
            document.getElementById('ResultadosCuatro').innerHTML = '';
            document.getElementById('ResultadosCinco').innerHTML = '';
            document.getElementById('ResultadosSeis').innerHTML = '';
            if(alturaRadiacion>minimaDistancia){
                document.getElementById('ResultadosTres').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCuatro').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCinco').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosSeis').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;

            }else {  
                MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosTres').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                 </div>
                     `;
                MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCuatro').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                 </div>
                     `;

                MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCinco').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                 </div>
                     `;
                MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosSeis').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal3.toFixed(2)} (m).
                 </div>
                     `;
              
            } 

       } else if (2000 < frecuencia && frecuencia <= 300000) {
        alturaRadiacion=alturaRadiacion-2;
            minimaDistancia=0.0638*(Math.sqrt(eripWattActual));
            minimaDistancia1=0.0819*(Math.sqrt(erpWattActual));
            minimaDistanciaPublic=0.143*(Math.sqrt(eripWattActual));
            minimaDistanciaPublic1=0.184*(Math.sqrt(erpWattActual));
            document.getElementById('ResultadosTres').innerHTML = '';
            document.getElementById('ResultadosCuatro').innerHTML = '';
            document.getElementById('ResultadosCinco').innerHTML = '';
            document.getElementById('ResultadosSeis').innerHTML = '';
            if(alturaRadiacion>minimaDistancia){
                document.getElementById('ResultadosTres').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCuatro').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosCinco').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;
                    document.getElementById('ResultadosSeis').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    <strong>Público en General</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                    </div>
                    `;

            }else {  
                MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosTres').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                 </div>
                     `;
                MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCuatro').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                 </div>
                     `;

                MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosCinco').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                 </div>
                     `;
                MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                document.getElementById('ResultadosSeis').innerHTML = `
                 <div class="alert alert-warning" role="alert">
                 <strong>Ocupacional</strong><br>
                Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                 Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal3.toFixed(2)} (m).
                 </div>
                     `;
              
            } 

       }
      else {
      return "Escenario no válido";
    }
    
}

