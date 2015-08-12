// Cheat code in console: resources.stone = 1200; resources.wood = 1200; resources.food = 1200


document.addEventListener('DOMContentLoaded', function () {

	for (var key in yUseableUnits) {
	   if (yUseableUnits.hasOwnProperty(key)) {
			document.getElementById('btn_' + key).onclick = clickFunc(key);
		}
	}

	setInterval(function() {
		if (!Game.stopped) {	
			Game.loop();
		}	
	},Game.speed)
	updateResources();
});

function clickFunc(key) {
	return function(event) {
		var comChoise = genComChoise();
		fight(key, yUseableUnits[key], comChoise, eUseableUnits[comChoise]);
	};
}

var Game = {
	speed: 6666,
	stopped: false
};
Game.loop = function() {
	resources["food"] += Math.floor(1 + buildings["farm"] * (buildings["farm"] * 0.84));
	resources["wood"] += Math.floor(1 + buildings["woodcutter"] * (buildings["woodcutter"] * 0.84));
	resources["stone"] += Math.floor(1 + buildings["quarry"] * (buildings["quarry"] * 0.84));
	updateResources();
	save("resources", resources);
}

var random = 0;
var yUseableUnits = getLocalStorage("yUseableUnits", {
	archer: 10,
	berserk: 10,
	fast: 10,
	mage: 10,
	heavy: 10
	});
var eUseableUnits = getLocalStorage("eUseableUnits", {
	archer: 10,
	berserk: 10,
	fast: 10,
	mage: 10,
	heavy: 10
	});
var resources = getLocalStorage("resources", {
	food: 500,
	wood: 500,
	stone: 500
	});
var buildings = getLocalStorage("buildings", {
	farm: 1,
	woodcutter: 1,
	quarry: 1,
	barracks: false
	});

function price(buildingType, count) {
	if (buildingType == "farm") {
		return {
			food: 75 + count * 52,
			wood: 100 + count * 43,
			stone: 50 + count * 68
		}	
	} 
	if (buildingType == "woodcutter") {
		return {
			food: 50 + count * 51,
			wood: 100 + count * 83,
			stone: 75 + count * 48
		}
	} 
	if (buildingType == "quarry") {
		return {
			food: 100 + count * 51,
			wood: 100 + count * 73,
			stone: 25 + count * 48
		}
	} 
	if (buildingType == "barracks") {
		return {
			food: 1000,
			wood: 800,
			stone: 1200
		}
	}
}


function genComChoise() {
	
	random = Math.random();

	if (random <= 0.2) {
		return "archer"
	} else if (random <= 0.4) {
		return "berserk"
	} else if (random <= 0.6) {
		return "fast"
	} else if (random <= 0.8) {
		return "mage"
	} else {
		return "heavy"
	}

}

function testEUnitCount(eUnit) {
	if (eUseableUnits[eUnit] > 0) {
		return eUnit
	} else {
		genComChoise();
	}
}

function chooseUnit(unit) {
	if (yUseableUnits[unit] > 0) {
		return true
	} else {
		return false
	}
}

function fight(yUnit, yUCount, eUnit, eUCount) {
		
	var yWin = youWin(yUnit, eUnit);

	if (isAllZero(yUseableUnits)) {
		alert("You already lost. Relode Website");
		return;
	} 
	if (isAllZero(eUseableUnits)) {
		alert("You already won. Relode Website");
		return;
	}
	if (!chooseUnit(yUnit)) {
		alert("Choose another Unit");
		return;
	}
	if (yWin == "true") {
		var unitsLeft = yUCount - eUCount / 2;
		if (unitsLeft >= 1) {
			yUseableUnits[yUnit] = Math.floor(unitsLeft);
			eUseableUnits[eUnit] = 0;
		} else if (unitsLeft <= -1) {
			yUseableUnits[yUnit] = 0;
			eUseableUnits[eUnit] = - unitsLeft * 2;
		} else {
			yUseableUnits[yUnit] = 0;
			eUseableUnits[eUnit] = 0;
		}
	} else if (yWin == "false") {
		var unitsLeft = eUCount - yUCount / 2;
		if (unitsLeft >= 1) {
			eUseableUnits[eUnit] = Math.floor(unitsLeft);
			yUseableUnits[yUnit] = 0;
		} else if (unitsLeft <= -1) {
			eUseableUnits[eUnit] = 0;
			yUseableUnits[yUnit] = -unitsLeft * 2;
		} else {
			yUseableUnits[yUnit] = 0;
			eUseableUnits[eUnit] = 0;
		}
	} else {
		var unitsLeft = yUCount - eUCount;
		if (unitsLeft >= 1) {
			yUseableUnits[yUnit] = unitsLeft;
			eUseableUnits[eUnit] = 0;
		} else if (unitsLeft <= -1) {
			yUseableUnits[yUnit] = 0;
			eUseableUnits[eUnit] = -unitsLeft;
		} else {
			yUseableUnits[yUnit] = 0;
			eUseableUnits[eUnit] = 0;
		}
	};
	updateUnitsDisAll();
	save("yUseableUnits", yUseableUnits);
	save("eUseableUnits", eUseableUnits);
	if (isAllZero(eUseableUnits)) {
		alert("You won");
		return;
	} 
	if (isAllZero(yUseableUnits)) {
		alert("You lost");
		return;
	}
}



function youWin(yUnit, eUnit) {
	
	var winner = {
		archer: {
			berserk: "true",
			fast: "false",
			mage: "true",
			heavy: "false"
		},
		berserk: {
			fast: "true",
			mage: "false",
			heavy: "true",
			archer: "false"
		},
		fast: {
			mage: "true",
			heavy: "false",
			archer: "true",
			berserk: "false"
		},
		mage: {
			heavy: "true",
			archer: "false",
			berserk: "true",
			fast: "false"
		},
		heavy: {
			archer: "true",
			berserk: "false",
			fast: "true",
			mage: "false"
		}
	};

	return winner[yUnit][eUnit];
}

function isAllZero(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] != 0) {
			return false;
		}
	}
	return true;
}

function changeFightState(id, aor) {
	if (aor == "add") {
		document.getElementById("fight").classList.add("hide");
		document.getElementById("villageShop").classList.remove("hide");
	}else {
		document.getElementById("fight").classList.remove("hide");
		document.getElementById("villageShop").classList.add("hide");
	}
	document.getElementById("fightContainer").classList.add("hide");
	document.getElementById("btn_stopFight").classList.remove("hide");
}

function updateResources() {
	
	document.getElementById("food").innerHTML = "Food: " + resources.food;
	document.getElementById("stone").innerHTML = "Stone: " + resources.stone;
	document.getElementById("wood").innerHTML = "Wood: " + resources.wood;
}

function buyBuilding(buildingType) {
	var priceBuilding = price(buildingType, buildings[buildingType])
	 if (priceBuilding.food <= resources.food && priceBuilding.wood <= resources.wood && priceBuilding.stone <= resources.stone) {
		if (buildingType == "barracks"){
			buildings[buildingType] = true;
			document.getElementById(buildingType).classList.add("transparency")
			document.getElementById(buildingType).setAttribute("disabled", true)
			document.getElementById("recruitingTab").classList.remove("hide")
		} else {
			buildings[buildingType] += 1;
			removeResources(priceBuilding, 1);
		}
		save("buildings", buildings);
	} else {
		alert("You need more Resources");
	}
}

function recruitUnits(type) {
	var count = parseInt(document.getElementById("recruitInp_" + type).value, 10);
	var cost = unitCost(type);
	if (count > 0) {
		if (cost.food * count <= resources.food && cost.wood * count <= resources.wood && cost.stone * count <= resources.stone) {
			yUseableUnits[type] += count;
			updateUnitsDisAll();
			document.getElementById("recruitInp_" + type).value = "";
			removeResources(cost, count);
		} else {
			alert("You need " + (cost.food * count) + " Food, " + (cost.wood * count) + " Wood, " + (cost.stone * count) + " Stone")
		}
	} else {
		document.getElementById("recruitInp_" + type).value = "";
		alert("You can only choose positive Numbers without 0");
	}
}

function unitCost(type) {
	var ret = {};
	switch (type) {
		case "archer":
			ret = {
				food: 40,
				wood: 80,
				stone: 30
			};
			break;
		case "berserk":
			ret = {
				food: 70,
				wood: 50,
				stone: 30
			};
			break;
		case "fast":
			ret = {
				food: 90,
				wood: 60,
				stone: 10
			};
			break;
		case "mage":
			ret = {
				food: 50,
				wood: 100,
				stone: 0
			};
			break;
		case "heavy":
			ret = {
				food: 50,
				wood: 0,
				stone: 100
			};
			break;
	}
	return ret;
}

function removeResources(amount, count) {
	resources.food -= amount.food * count;
	resources.wood -= amount.wood * count;
	resources.stone -= amount.stone * count;
	updateResources();
}

function save(key, object) {
	localStorage.setItem(key , JSON.stringify(object));
}

function getLocalStorage(name, defaultValue) {
	var value = JSON.parse(localStorage.getItem(name));
	if (!value) {
		return defaultValue || 0;
	} else {
		return value;
	}
}

document.getElementById('btn_village').onclick = function() {
	changeFightState('village', 'remove');
	changeEUseableUnits(10, 30, 20, 25, 15);
	updateUnitsDisAll();
}

document.getElementById('btn_town').onclick = function() {
	changeFightState('town', 'remove');
	changeEUseableUnits(30, 40, 20, 50, 60);
	updateUnitsDisAll();
}

document.getElementById('btn_city').onclick = function() {
	changeFightState('city', 'remove');
	changeEUseableUnits(100, 40, 130, 60, 70);
	updateUnitsDisAll();
}

document.getElementById('btn_stopFight').onclick = function() {
	changeFightState('stopFight', 'add');
	document.getElementById('fightContainer').classList.remove("hide");
	document.getElementById('btn_stopFight').classList.add("hide");
	
}

function changeMapState(aor) {
	if (aor == "closeMap") {
		document.getElementById('map').classList.remove('hide');
		
	} else {
		document.getElementById('map').classList.add('hide');
	}
	document.getElementById('btn_closeMap').classList.add('hide');
	document.getElementById('btn_openMap').classList.add('hide');
	document.getElementById('btn_' + aor).classList.remove('hide');
	document.getElementById('btn_stopFight').classList.add('hide');
}

function changeEUseableUnits(archer, berserk, fast, mage, heavy) {
	eUseableUnits.archer = archer;
	eUseableUnits.berserk = berserk;
	eUseableUnits.fast = fast;
	eUseableUnits.mage = mage;
	eUseableUnits.heavy = heavy;
}

function updateUnitsDisAll() {
	for (var key in yUseableUnits) {
		document.getElementById('y_' + key).innerHTML = "Your Units " + yUseableUnits[key];
	};
	for (var key in eUseableUnits) {
		document.getElementById('e_' + key).innerHTML = "Enemy Units " + eUseableUnits[key];
	};
}










