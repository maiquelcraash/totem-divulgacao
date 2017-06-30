/**
 * Created by maiquel on 22/03/17.
 */


let url = window.location.href,							//get the server link
	totemList = document.querySelector('#totem-situation .totem-list');

let arr = url.split("/");
let hosts = {
	totemsHost: arr[0] + "//" + arr[2] + "/totems",
	addTotemHost: arr[0] + "//" + arr[2] + "/addTotem"
};

let colorMap = new Map();
colorMap.set("0", "#ce3737");
colorMap.set("1", "#ffea22");
colorMap.set("2", "#4bb04e");
colorMap.set("3", "#bcbcbc");

let updateManager = setTimeout(() => {
	totemList.innerHTML = "";
	createTotemList();
	updateTotemList();
}, 60000);

init();

function init() {
	/* Create Totem Form Listeners */
	let totemForm = document.querySelector('.totem-form');
	totemForm.addEventListener("submit", addTotem);

	/* Create the totem List */
	createTotemList();

	let socket = io();                                          //instancia o WebSocket

	socket.on('newStatus', (data) => {                          //configura um listener para um evento que o servidor irá disparar
		//alert('Trocou');
		totemList.innerHTML = "";
		createTotemList();
	});
}

/**
 *    Creates the totem list
 * */
function createTotemList() {
	clearTimeout(updateManager);

	updateManager = setTimeout(() => {
		totemList.innerHTML = "";
		createTotemList();
	}, 30000);

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", hosts.totemsHost, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let totems = JSON.parse(xmlHttp.responseText);

		totems.forEach((totem) => {
			let totemDiv = document.createElement("div");

			totemDiv.classList.add("totem-list-item");
			totemDiv.innerText = totem.description_id;

			let datetime = new Date(totem.last_activity);
			let now = new Date();
			let lapsed = now.getTime() - datetime.getTime();

			if (lapsed && lapsed < 30000) {
				totemDiv.classList.remove("offline");

				if (totem.situation === "1") {
					totemDiv.classList.remove("empty");
					totemDiv.classList.remove("full");
					totemDiv.classList.add("half");
				}
				else if (totem.situation === "2") {
					totemDiv.classList.remove("empty");
					totemDiv.classList.remove("half");
					totemDiv.classList.add("full");
				}
				else {
					totemDiv.classList.add("empty");
					totemDiv.classList.remove("half");
					totemDiv.classList.remove("full");
				}
			}
			else {
				totemDiv.classList.add("offline");
				totemDiv.classList.remove("half");
				totemDiv.classList.remove("empty");
			}


			totemList.appendChild(totemDiv);
		})
	};

	xmlHttp.send();
}

/**
 *
 */
function addTotem(e) {
	e.preventDefault();

	let form = e.target || e.srcElement;

	let fields = {
		description_id: form.querySelector("#inputDescriptionId").value,
		latitude: form.querySelector("#inputLatitude").value,
		longitude: form.querySelector("#inputLongitude").value
	};

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", hosts.addTotemHost, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-type", "application/json");

	xmlHttp.onreadystatechange = function () {		//Call a function when the state changes.
		if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 201) {
			window.alert('Totem "' + fields.description_id + '" adicionado com sucesso');
			location.reload();
		}
		else if (xmlHttp.readyState === XMLHttpRequest.DONE) {
			window.alert(xmlHttp.responseText);
		}
	};

	xmlHttp.send(JSON.stringify(fields));
}

function initMap() {

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", hosts.totemsHost, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let totems = JSON.parse(xmlHttp.responseText);
		let map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: parseFloat(totems[0].latitude), lng: parseFloat(totems[0].longitude)},
			scrollwheel: false
		});

		let infoList = [];

		totems.forEach((totem) => {

			let datetime = new Date(totem.last_activity);
			let now = new Date();
			let lapsed = now.getTime() - datetime.getTime();

			if (lapsed && lapsed > 30000) {
				totem.situation = "3";
			}

			let infowindow = new google.maps.InfoWindow({
				content: '<p class="map-tooltip">' + totem.description_id + '</p>'
			});


			infoList.push(infowindow);

			let marker = new google.maps.Marker({
				position: {lat: parseFloat(totem.latitude), lng: parseFloat(totem.longitude)},
				map: map,
				content: totem.description_id,
				icon: {
					path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					fillColor: colorMap.get(totem.situation),
					fillOpacity: 1,
					scale: 5.5,
					strokeWeight: 1
				}
			});

			marker.addListener('click', function () {
				infoList.forEach(function (infowindow) {
					infowindow.close();
				});
				infowindow.open(map, marker);
			});
		})
	};

	xmlHttp.send();
}