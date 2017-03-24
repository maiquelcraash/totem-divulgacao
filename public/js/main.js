/**
 * Created by maiquel on 22/03/17.
 */

let url = window.location.href,							//get the server link
	totemList = document.querySelector('#totem-situation .totem-list');

init();

function init() {
	let arr = url.split("/"),
		host = arr[0] + "//" + arr[2] + "/totems";		//add totems endpoint to server link

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", host, true); // false for synchronous request


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
