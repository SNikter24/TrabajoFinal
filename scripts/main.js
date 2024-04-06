/*Las variables  valoresErpPorBanda valoresErpPorBanda1 son arreglos globales las cuales se crean
para poder obtener los resultados en la funcion calcularEIRPyERP
*/
var valoresErpPorBanda = {};
var valoresErpPorBanda1 = {};

function generarBandas() {
            var numeroDeBandas = parseInt(document.getElementById('numeroDeBandas').value);
            var contenedorDeBandas = document.getElementById('contenedorDeBandas');
            
            contenedorDeBandas.innerHTML = '';

            for (var i = 1; i <= numeroDeBandas; i++) {
                var divBanda = document.createElement('div');
                divBanda.classList.add('banda');
                divBanda.innerHTML = `
                    <h3>Antena ${i}</h3>
                    <label for="potenciaTransmisor${i}">Potencia del Transmisor (W):</label><br>
                    <input type="text" id="potenciaTransmisor${i}" name="potenciaTransmisor"><br>
                    <label for="gananciaAntena${i}">Ganancia de la Antena (dBi):</label><br>
                    <input type="text" id="gananciaAntena${i}" name="gananciaAntena"><br>
                    <label for="atenuacion${i}">Atenuación (dB):</label><br>
                    <input type="text" id="atenuacion${i}" name="atenuacion"><br>
                    <button type="button" class="btn btn-success" onclick="calcularEIRPyERP(${i})">Calcular EIRP y ERP Antena  ${i}</button>
                    <div  id="resultadosEIRP${i}" class="alert alert-primary" role="alert" class="resultado"></div>
                    <div  id="resultadosERP${i}" class="alert alert-primary" role="alert" class="resultado"></div><br>
                    <label for="frecuencia${i}">Frecuencia (MHz):</label>
                    <input type="text" id="frecuencia${i}" name="frecuencia"><br>
                    <label for="alturaRadiacion${i}">Ingrese la altura de la  antena (m):</label>
                    <input type="text" id="alturaRadiacion${i}" name="alturaRadiacion"><br>
                    <button type="button" class="btn btn-success" onclick="calcularRelacionExposicion(${i})">Calcular Relación de Exposición</button>
                    <div id="ResultadosTres${i}" class="resultado"></div>
                    <div id="ResultadosCuatro${i}" class="resultado"></div>
                    <div id="ResultadosCinco${i}" class="resultado"></div>
                    <div id="ResultadosSeis${i}" class="resultado"></div>
                `;
                contenedorDeBandas.appendChild(divBanda);
            }
        }
         
            
            

function calcularEIRPyERP(banda) {
            var potenciaTransmisorWatt = parseFloat(document.getElementById('potenciaTransmisor' + banda).value);
            var gananciaAntena = parseFloat(document.getElementById('gananciaAntena' + banda).value);
            var atenuacion = parseFloat(document.getElementById('atenuacion' + banda).value);

            if (isNaN(potenciaTransmisorWatt) || isNaN(gananciaAntena) || isNaN(atenuacion)) {
                document.getElementById('resultadosEIRP' + banda).innerHTML = 'Por favor, ingresa valores válidos.';
                document.getElementById('resultadosERP' + banda).innerHTML = '';
                return;
            }

            /*Calculo del PIRE*/
            var potenciaTransmisorDBW = 10 * Math.log10(potenciaTransmisorWatt);
            var eirpDBW = potenciaTransmisorDBW + gananciaAntena - atenuacion;
            var eirpWatt = Math.pow(10, eirpDBW / 10);
            var eirpDBm = eirpDBW + 30;

            // Aquí se calcula el ERP
            var perdbm=eirpDBm-2.15;
            var perdbw=perdbm-30;
            var perdbV= Math.pow(10,perdbw/10);
            var gananciaAntenaLineal = Math.pow(10, gananciaAntena / 10);
            var erpWatt = potenciaTransmisorWatt * gananciaAntenaLineal; // ERP en vatios
            var erpDBW = 10 * Math.log10(erpWatt); // ERP en dBW
            var erpDBm = erpDBW + 30; // ERP en dBm

            document.getElementById('resultadosEIRP' + banda).innerHTML = 
                '<strong>PIRE:</strong><br>' +
                'PIRE en dBW: ' + eirpDBW.toFixed(2) + ' dBW'+'<br>' +
                'PIRE en vatios: ' + eirpWatt.toFixed(2) + ' W<br>' +
                'PIRE en dBm: ' + eirpDBm.toFixed(2)+ ' dBm';

            document.getElementById('resultadosERP' + banda).innerHTML = 
                '<strong>PER (PRA):</strong><br>' +
                'PER en dBW: ' + perdbw.toFixed(2) +' dBW'+ '<br>' +
                'PER en vatios: ' + perdbV.toFixed(2) + ' W<br>' +
                'PER en dBm: ' + perdbm.toFixed(2)+' dBm ';
                valoresErpPorBanda[banda] = eirpWatt;
                valoresErpPorBanda1[banda]=perdbV;
        }
        var sumatoriasPorBanda = {};
        var sumaTotal = 0;
        
        function calcularRelacionExposicion (banda) {
            var frecuencia = parseFloat(document.getElementById('frecuencia'+banda).value);
            var alturaRadiacion= parseFloat(document.getElementById('alturaRadiacion'+banda).value);
            var eripWattActual = valoresErpPorBanda[banda];
            var erpWattActual = valoresErpPorBanda1[banda];
            var Si=true;
            var S1,r,r1;

            

      
          if (0.1 <= frecuencia && frecuencia < 30) {
            document.getElementById('ResultadosTres' + banda).innerHTML ='Esta adentro'+frecuencia.toFixed(2)+eripWattActual.toFixed(2);
    
              
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
                document.getElementById('ResultadosTres' + banda).innerHTML = '';
                document.getElementById('ResultadosCuatro' + banda).innerHTML = '';
                document.getElementById('ResultadosCinco' + banda).innerHTML = '';
                document.getElementById('ResultadosSeis' + banda).innerHTML = '';
                if(alturaRadiacion>minimaDistancia){
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCinco' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosSeis' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;

                }else {  
                    /*MinimaDhorizontal evalua minimaDistancia para ocupacional, esto se hace para el pire */
                    MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                     </div>
                         `;
                         /*MinimaDhorizontal1 evalua minimaDistancia1 para ocupacional, esto se hace para el Per */
                    MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                     </div>
                         `;
                    /*MinimaDhorizontal2 evalua minimaDistanciaPublic para Publico en general, esto se hace para el Pire */
                    MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCinco' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                     </div>
                         `;

                     /*MinimaDhorizontal3 evalua minimaDistanciaPublic1 para Publico en general, esto se hace para el PER */
                    MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosSeis' + banda).innerHTML = `
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
                document.getElementById('ResultadosTres' + banda).innerHTML = '';
                document.getElementById('ResultadosCuatro' + banda).innerHTML = '';
                document.getElementById('ResultadosCinco' + banda).innerHTML = '';
                document.getElementById('ResultadosSeis' + banda).innerHTML = '';
                if(alturaRadiacion>minimaDistancia){
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCinco' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosSeis' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;

                }else {  
                    MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                     </div>
                         `;
                    MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                     </div>
                         `;

                    MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCinco' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                     </div>
                         `;
                    MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosSeis' + banda).innerHTML = `
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
                document.getElementById('ResultadosTres' + banda).innerHTML = '';
                document.getElementById('ResultadosCuatro' + banda).innerHTML = '';
                document.getElementById('ResultadosCinco' + banda).innerHTML = '';
                document.getElementById('ResultadosSeis' + banda).innerHTML = '';
                if(alturaRadiacion>minimaDistancia){
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Ocupacional</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistancia1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosCinco' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;
                        document.getElementById('ResultadosSeis' + banda).innerHTML = `
                        <div class="alert alert-success" role="alert">
                        <strong>Público en General</strong><br>
                        Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                        Comparando que la altura de su antena (a) es ${alturaRadiacion.toFixed(2)} (m) es mayor que r ${minimaDistanciaPublic1.toFixed(2)} (m) no necesitamos calcular "d" y podemos concluir que la antena cumple con las normas de seguridad en base a su altura.
                        </div>
                        `;

                }else {  
                    MinimaDhorizontal= Math.sqrt((minimaDistancia**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosTres' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal.toFixed(2)} (m).
                     </div>
                         `;
                    MinimaDhorizontal1= Math.sqrt((minimaDistancia1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCuatro' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Per en W es: ${erpWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal1.toFixed(2)} (m).
                     </div>
                         `;

                    MinimaDhorizontal2= Math.sqrt((minimaDistanciaPublic**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosCinco' + banda).innerHTML = `
                     <div class="alert alert-warning" role="alert">
                     <strong>Ocupacional</strong><br>
                    Su Pire en W es: ${eripWattActual.toFixed(2)}<br>
                    La altura de su antena ${alturaRadiacion.toFixed(2)} (m) no es lo suficientemente alta.<br>
                     Su mínima distancia a la que puedes acercarte es (d): ${MinimaDhorizontal2.toFixed(2)} (m).
                     </div>
                         `;
                    MinimaDhorizontal3= Math.sqrt((minimaDistanciaPublic1**2)-(alturaRadiacion**2));
                    document.getElementById('ResultadosSeis' + banda).innerHTML = `
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

