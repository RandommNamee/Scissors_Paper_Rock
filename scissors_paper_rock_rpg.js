document.addEventListener('DOMContentLoaded', function () {

	for (var key in yUseableUnits) {
	   if (yUseableUnits.hasOwnProperty(key)) {
			document.getElementById('btn_' + key).onclick = clickFunc(key);

		}
	}

});

function clickFunc(key) {
	return function(event) {
				var comChoise = genComChoise();
				fight(key, yUseableUnits[key], comChoise, eUseableUnits[comChoise]);
			};
}


var random = 0;
var yUseableUnits = {
	archer: 10,
	berserk: 10,
	fast: 10,
	mage: 10,
	heavy: 10
}
var eUseableUnits = {
	archer: 10,
	berserk: 10,
	fast: 10,
	mage: 10,
	heavy: 10
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
	updateUnitDis(yUnit, eUnit);
	if (isAllZero(yUseableUnits)) {
		alert("You lost");
		return;
	} 
	if (isAllZero(eUseableUnits)) {
		alert("You won");
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

function updateUnitDis(yUnit, eUnit) {
	document.getElementById("y_" + yUnit).innerHTML = "Your Units " + yUseableUnits[yUnit];
	document.getElementById("e_" + eUnit).innerHTML = "Enemy Units " + eUseableUnits[eUnit];
}


function isAllZero(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] != 0) {
			return false;
		}
	}
	return true;
}

function startFight() {
	document.getElementById("fightStar").classList.remove("hide");
	document.getElementById("btn_startFight").classList.add("hide");
}