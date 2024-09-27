function valmin(event){
    if (parseInt(event.value) < 0){
        event.value = 0;
    }
}

function valmax(event){
    if (parseInt(event.value) > 0){
        event.value = 0;
    }
}
