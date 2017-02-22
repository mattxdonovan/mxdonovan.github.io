let territories = neighborHoods;

let selectedTerritory = {};

let user = {
	territories: [],
	troopCount: 0,
	points: 2,
	selectedHero: {}
};

let zombies = {
	territories: [],
	troopCount: 0,
	points: 2
};

let pointsToTroopConversion =  {
	[2]: 2,
	[3]: 4,
	[4]: 7,
	[5]: 10,
	[6]: 13,
	[7]: 17,
	[8]: 21,
	[9]: 25,
	[10]: 30
}


function begin() {
	setupGame();
	startGame();
	startPlayersTurn(user);
};


function setupGame() {
	territories = assignTerritories(territories);
	setBoard(territories);
}

function startGame() {
	let currentPlayer = user;
	let gameOver = false;
}

function startPlayersTurn(player) {

	let newTroops = 0;
	let numTerritories = player.territories.length;

	if (numTerritories > 36) {
		newTroops += 9;
	} else if(numTerritories > 33) {
		newTroops += 8;
	} else if(numTerritories > 30) {
		newTroops += 7;
	} else if(numTerritories > 27) {
		newTroops += 6;
	} else if(numTerritories > 24) {
		newTroops += 5;
	} else if(numTerritories > 21) {
		newTroops += 4;
	} else if(numTerritories > 18) {
		newTroops += 3;
	} else if(numTerritories > 15) {
		newTroops += 2;
	} else if(numTerritories > 12) {
		newTroops += 1;
	}

	// populate controls
	if (user.points < 10) {
		var message = "Do you want to buy more troops? You can get " + pointsToTroopConversion[user.points] + " more!";
	} else {
		var message = "Do you want to buy more troops? You can get 30 more!";
	}

	let visualDiv = $('#visual2');
	let controlDiv = $('#control');
	let messageDiv = $('#message');

	controlDiv.html('');

	let noButton = $('<a class="btn btn-danger">')
	let yesButton = $('<a class="btn btn-success">')
	noButton.text('No');
	yesButton.text('Yes');

	noButton.on('click', (x) => {
		placeTroops(newTroops);
	})

	yesButton.on('click', (x) => {
		newTroops += pointsToTroopConversion[user.points];
		user.points = 0;
		placeTroops(newTroops);
	});

	controlDiv.append(yesButton);
	controlDiv.append(noButton);

	visualDiv.html("<div class='center>'<img style='max-height: 180px;' class='heroImg' src='" + user.selectedHero.imageURL + " ' /></div'");

	messageDiv.html('<h3 class="text-primary" >' + message + '</h3>');

};

function placeTroops(numberOfTroops) {
	user.troopCount += numberOfTroops;

	for(var i = 0; i < numberOfTroops; i++) {
		var territory = user.territories[Math.floor(Math.random() * user.territories.length)]
		territory.troops += 1;
		placeMarkers(territory, 'blue');
	}
		battle();
};

function battle() {
	SelectTerritory();
}


function playGame() {

	playerTurn(currentPlayer);
	gameOver = currentPlayer.territories.length >= 40;
	currentPlayer === user ? currentPlayer = zombies : currentPlayer = user;

	// announceWinner(currentPlayer);

}

function assignTerritories(territories) {

	let counter = 1;
	const userTerritories = [];
	const zombiesTerritories = [];

	while (territories.length > 0) {

		let element = territories.splice(Math.floor(Math.random() * territories.length ), 1);

		if (counter % 2 == 0 ) {
			userTerritories.push(element[0]);
		} else {
			zombiesTerritories.push(element[0]);
      console.log(element[0] + 'is this it?');
		}

		counter ++
	}

	for (territory of userTerritories) {
		territory.owner = 'user';
		user.troopCount += territory.troops;
	}

	for (territory of zombiesTerritories) {
		territory.owner = 'zombies';
		zombies.troopCount += territory.troops;
	}

	user.territories = userTerritories;
	zombies.territories = zombiesTerritories;

	let assignedTerritories = zombiesTerritories.concat(userTerritories);

  $("#territoriesOwned").append('<button class="btn btn-primary btn-sm padBot" type="button">Hero Territories <span class="badge">' + userTerritories.length + '</span> </button><button class="btn btn-danger btn-sm padBot" type="button">Zombie Territories <span class="badge">'+ zombiesTerritories.length + '</span></button>');

	return assignedTerritories;

}

function SelectTerritory() {
	let visualDiv = $('#visual2');
	let controlDiv = $('#control');
	let messageDiv = $('#message');

	visualDiv.html('<img style="max-height: 110px;" src="' + user.selectedHero.imageURL + '">');
	controlDiv.empty();
	messageDiv.html("<h3 class='text-primary'>Select an infected territory to attack!</h3>")


var x = 0;
var color;
		$("path").on("click", function(){
			if (color == undefined) {
				// console.log($("path"))
				color = $(this).attr('stroke');
			}
			// else if (color == $(this).attr('stroke')) {
			//   messageDiv.html('<h3 class="text-danger"> Please choose two different colors</h3>');
			// 	color = undefined;
			// }
			else {
				console.log("Start rolling!")
				let uDie1 = Math.floor(Math.random() * 6) + 1
			  let uDie2 = Math.floor(Math.random() * 6) + 1
        $("#zombieDie").attr("src","images/b"+uDie1+".png")
        $("#userDie").attr("src","images/O"+uDie2+".png")
				messageDiv.html('<h3 class="text-primary"> You got ' + uDie1 + '</h3>' + '<h3 class="text-danger"> Zombie got ' + uDie2 + '</h3>');

				if( uDie1 < uDie2) {
					// color = "blue"
          // console.log(element[0] + 'element[0]');
          console.log("zombies won")
					$(this).attr("fill", "red")
          $(this).attr('stroke', "red")
          // setBoard('position.coords.latitude, position.coords.longitude','red')					
          // zombies.troopCount++
          // user.troopCount--

          // let marker = L.marker([long, lat], {icon: zombieIcon}).addTo(map);
          // placeMarkers('element[0].coordinates','red')
          //trying to change icons
				} else {
          console.log("player won")
					$(this).attr("fill", "blue")
          $(this).attr("stroke", "blue")
					// zombies.troopCount--
					// user.troopCount++
          // placeMarkers('territory', 'blue');
          // setBoard()

          // $(this).attr('point[0], point[1]', "blue")
          setBoard('position.coords.latitude, position.coords.longitude','blue')
           //trying to change icons
          // placeMarkers(path(d),'blue') //trying to change icons
					// $("path[x]").attr("fill", "blue")
					// x++;
				}
			}
		})
}

function setBoard(territories) {
	for (let territory of territories) {

		if (territory.owner == 'user') {
			color = 'blue';
		} else {
			color = 'red'
		}

		let polygon = L.polygon([
			territory.coordinates[0].reverse(),
			territory.coordinates[1].reverse(),
			territory.coordinates[2].reverse(),
			territory.coordinates[3].reverse()],
      {color: color}).addTo(map)

		polygon.on( 'click', (x) => {selectedTerritory = territory});

    placeMarkers();
		// placeMarkers(territory, color);
	}
}

function placeMarkers(territory, color) {
	let long = 0;
	let lat = 0;

	for (point of territory.coordinates) {
		long += point[0];
		lat += point[1];
	}

	long = long / territory.coordinates.length;
	lat = lat / territory.coordinates.length;

	if (color == 'red') {
		let marker = L.marker([long, lat], {icon: zombieIcon}).addTo(map);
	} else {
		let marker = L.marker([long, lat], {icon: heroIcon}).addTo(map);
	}

console.log(territory.coordinates[i][1]);

	for(var i = 1; i < territory.troops; i++) {
		let center = [long, lat];
		let newPoint = [(long + territory.coordinates[i][0]) / 2, (lat + territory.coordinates[i][1]) / 2]
		if(color == 'red') {
			let marker = L.marker(newPoint, {icon: zombieIcon}).addTo(map);
		} else {
			let marker =L.marker(newPoint,{icon: heroIcon}).addTo(map)
		}
	}
}

function announceWinner(winner) {
	let announcement = ''
	if (winner == user) {
		announcement = $('<h1>').text('Congratulations you beat the Zombies!!!')
	} else{
		announcement = $('<h1>').text('You DIED!!! Zombies win this time!')
	}
	$(document.body).html(announcement);
}

function clearControlls() {
	let controls = $('#controls');
	controls.html('');
}

function playerHasMoves(player) {
	return (player.territories / player.troopCount) > 1;
}

function drawCard(player) {
	if(Math.random() * 100 < 20) {
		player.points += 2;
	} else {
		player.points += 1;
	}
}


$(document).ready(function(){
    // Show the Modal on load
    $("#myModal").modal("show");
		$("#userDie").attr("src","images/zombie_killer.jpg");

    // Hide the Modal
    $("#myBtn").click(function(){
        $("#myModal").modal("hide");

    });
});

$( "#hero" ).click(function() {
		$('.modal').modal('hide');
		user.selectedHero.name = 'Russell Okung'
		user.selectedHero.imageURL = 'images/okung.png'
		begin();
		$("#userDie").attr("src", user.selectedHero.imageURL);
});
$( "#hero1" ).click(function() {
		$('.modal').modal('hide');
		user.selectedHero.name = 'Peyton Manning'
		user.selectedHero.imageURL = 'images/manning.png'
		begin();
		$("#userDie").attr("src", user.selectedHero.imageURL);
});
$( "#hero2" ).click(function() {
		$('.modal').modal('hide');
		user.selectedHero.name = 'CJ Anderson'
		user.selectedHero.imageURL = 'images/anderson.png'
		begin();
		$("#userDie").attr("src", user.selectedHero.imageURL);
});
$( "#hero3" ).click(function() {
		$('.modal').modal('hide');
		user.selectedHero.name = 'Demaryius Thomas'
		user.selectedHero.imageURL = 'images/thomas.png'
		begin();
		$("#userDie").attr("src", user.selectedHero.imageURL);
});
$( "#hero4" ).click(function() {
		$('.modal').modal('hide');
		user.selectedHero.name = 'John Elway'
		user.selectedHero.imageURL = 'images/elway.png'
		begin();
		$("#userDie").attr("src", user.selectedHero.imageURL);
});
