function dateLogin(ctrl){	
	var name = document.getElementById("idName").value;
	var game = document.getElementById("idGame").value;
    for(i=0;i<ctrl.length;i++){
        if(ctrl[i].checked){
			var color = ctrl[i].value;
		}
	}
	//alert('{ Nombre: ' + name + ' , ' + 'Color: ' + color + ' , ' + 'IdGame: ' + game + ' }');
}