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

init();

function init() {
	/* Create Totem Form Listeners */
	let totemForm = document.querySelector('.totem-form');
	console.log(totemForm);

	totemForm.addEventListener("submit", addTotem);

	/* Create the totem List */
	createTotemList();


}

/**
 *    Creates the totem list
 * */
function createTotemList() {

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", hosts.totemsHost, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let totems = JSON.parse(xmlHttp.responseText);

		totems.forEach((totem) => {
			let totemDiv = document.createElement("div");

			totemDiv.className = "totem-list-item";
			totemDiv.innerText = totem.description_id;

			if (totem.situation === "1") {
				totemDiv.classList.remove("empty");
			}
			else {
				totemDiv.classList.add("empty");
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
	console.log(form);

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
		else if (xmlHttp.readyState === XMLHttpRequest.DONE){
			window.alert(xmlHttp.responseText);
		}
	};

	xmlHttp.send(JSON.stringify(fields));


}