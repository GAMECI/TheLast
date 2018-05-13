var gameController= (function(){
	var deleteSpecialObject=function(idGame){
		axios.delete('/'+idGame+"/deleteSpecialObject"){
			.then(function(){
				console.log("Delete SpecialObject Succesfull")
			})
			.catch(function(error){
				console.log(error);
			})
		}
	}

	return {
		"deleteSpecialObject": deleteSpecialObject
	};

})();