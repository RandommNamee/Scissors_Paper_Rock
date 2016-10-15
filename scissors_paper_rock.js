document.addEventListener('DOMContentLoaded', function () {
	
	function genran() {
		
		random = Math.random();
		
		if (random <= 0.33) {
			comChoise = "scissors";
		} else if (random <= 0.66) {
			comChoise = "paper";
		} else {
			comChoise = "rock";
		};
	};

	loadIt('baldis', bal);
	loadIt('addBetStation', "Buy Bet Station: " + (10 + ownedBetStations * 10))
});

var comChoise = "";
var random ;	
var bal = getLocalStorage(bal);
var ownedBetStations = getLocalStorage(ownedBetStations);
var upgradePath = getLocalStorage(upgradePath);
var upgradePathCount = getLocalStorage(upgradePathCount);

function choose(choise) {
	var state;
	if (choise == "scissors") {
		if (comChoise == "paper") {
			state = 'Win';
			document.getElementById("comspr").src = "paper.png";
		} else if (comChoise == "rock") {
			state = 'Loose';
			document.getElementById("comspr").src = "rock.png";
		} else {
			state = 'Pair';
			document.getElementById("comspr").src = "scissors.png";
		};
	} else if (choise == "paper") {
		if (comChoise == "rock") {
			state = 'Win';
			document.getElementById("comspr").src = "rock.png";
		} else if (comChoise == "scissors") {
			state = 'Loose';
			document.getElementById("comspr").src = "scissors.png";
		} else {
			state = 'Pair';
			document.getElementById("comspr").src = "paper.png";
		};
	} else if (choise == "rock") {
		if (comChoise == "scissors") {
			state = 'Win';
			document.getElementById("comspr").src = "scissors.png";
		} else if (comChoise == "paper") {
			state = 'Loose';
			document.getElementById("comspr").src = "paper.png"
		} else {
			state = 'Pair';
			document.getElementById("comspr").src = "rock.png";
		};
	};
	choiseDis(state);
	moneyGet(state, choise);
	cleanLooseOrWin();

	if (document.getElementById("looseorwin").innerHTML == "Win") {
		looseOrWin('win');
	} else if (document.getElementById("looseorwin").innerHTML == "Pair") {
		looseOrWin('pair');
	} else {
		looseOrWin('loose');
	}



	save('bal' , bal);
	save('ownedBetStations', ownedBetStations);
};



function looseOrWin(state) {
	document.getElementById("looseorwin").classList.add(state);
	document.getElementById("comdis").classList.add(state);	
}

function cleanLooseOrWin() {
	document.getElementById("looseorwin").classList.remove('loose');
	document.getElementById("comdis").classList.remove('loose');
	document.getElementById("looseorwin").classList.remove('pair');
	document.getElementById("comdis").classList.remove('pair');
	document.getElementById("looseorwin").classList.remove('win');
	document.getElementById("comdis").classList.remove('win');
}

function genran() {
	
	random = Math.random();
	
	if (random <= 0.33) {
		comChoise = "scissors";
	} else if (random <= 0.66) {
		comChoise = "paper";
	} else {
		comChoise = "rock";
	};
};

function choiseDis(state) {
	document.getElementById("looseorwin").innerHTML = state;
	genran()
}

function newBetStation() {
	if (bal >= 10 + ownedBetStations * 10) {
		bal -= 10 + ownedBetStations * 10;
		document.getElementById("baldis").innerHTML = bal + " $";
		ownedBetStations += 1;
		document.getElementById("addBetStation").innerHTML =  + " $";
		loadIt('addBetStation', "Buy Bet Station: " + (10 + ownedBetStations * 10))
	}
}

function save(key, value) {
	localStorage.setItem(key , value);
}

function loadIt(id, key) {
	document.getElementById(id).innerHTML = key + " $";
}

function changeTab(id) {
	document.getElementById("openBuyTab").classList.remove('openTabs');
	document.getElementById("openUpgradeTab").classList.remove('openTabs');
	document.getElementById("openStatsTab").classList.remove('openTabs');
	document.getElementById(id).classList.add('openTabs');
}

function showTab(id) {
	document.getElementById('buyTab').classList.add('hide');
	document.getElementById('upgradeTab').classList.add('hide');
	document.getElementById('statsTab').classList.add('hide');
	document.getElementById(id).classList.remove('hide');

}

function moneyGet(state, choise) {
	if (state == 'Win') {
		if (choise == upgradePath) {
			bal += (1 + ownedBetStations) * (2 * upgradePathCount);
		} else {
			bal += 1 + ownedBetStations;
		}
		loadIt('baldis', bal);
	}
}

function choosePath(choise) {
	var cost = 10000 + 10000 * upgradePathCount
	if (upgradePath == 0 && bal >= cost) {
		upgradePath = choise;
		upgradeChoise(choise);
		transparency(choise);
	} else if (bal >= cost) {
		upgradeChoise(choise);
	}
}

function upgradeChoise(choise) {
	bal -= 10000 + (10000 * upgradePathCount);
	upgradePathCount += 1;
	document.getElementById(upgradePath).innerHTML = 'Choose ' + choise + ' ' + (10000 + 10000 * upgradePathCount) + '$';
	loadIt('baldis', bal);
	save('upgradePath', upgradePath);
	save('upgradePathCount', upgradePathCount);
}

function transparency(choise) {
	document.getElementById('scissors').classList.add('transparency');
	document.getElementById('paper').classList.add('transparency');
	document.getElementById('rock').classList.add('transparency');
	document.getElementById(choise).classList.remove('transparency');
	document.getElementById('scissors').disabled = true;
	document.getElementById('paper').disabled = true;
	document.getElementById('rock').disabled = true;
	document.getElementById(choise).disabled = false;
}

function getLocalStorage(Name, defaultValue) {
	var value = parseInt(localStorage.getItem(Name), 10);
	if (!value) {
		return defaultValue || 0;
	} else {
		return value;
	}
}