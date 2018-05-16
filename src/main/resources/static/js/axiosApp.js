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
	var finishGame=function(callback){
		axios.delete('room/'+idGame+"/"+playerName)
		.then(function(){
			callback();
			console.log("Delete player Succesfull");
		})
		.catch(function(error){
			console.log(error);
		})
	}
	var getObject=function(callback){
		axios.get('room/'+idGame+"/specialObject")
		.then(function(response){
			callback(response.data);
		})
		.catch(function(error){
			console.log(error);
		})
	}

	var getPlayers=function(callback){
		axios.get('room/'+idGame+"/specialObject")
		.then(function(response){
			callback(response.data);
		})
		.catch(function(error){
			console.log(error);
		})
	}


	return {
		"deleteSpecialObject": deleteSpecialObject,
		"finishGame": finishGame,
		"getObject":getObject
	};

})();