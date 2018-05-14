var gameController= (function(){
	var deleteSpecialObject=function(){
		axios.delete('room/'+idGame+"/specialObject")
			.then(function(){
				console.log("Delete SpecialObject Succesfull")
			})
			.catch(function(error){
				console.log(error);
			})
	};

	return {
		"deleteSpecialObject": deleteSpecialObject
	};

})();