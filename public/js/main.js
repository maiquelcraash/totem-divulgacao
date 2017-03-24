/**
 * Created by maiquel on 22/03/17.
 */

let host = "http://localhost:8082/totems",
	body = document.getElementsByTagName("body")[0];

init();

function init() {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", host, true); // false for synchronous request


	xmlHttp.onload = function (data) {
		let totems = JSON.parse(xmlHttp.responseText);

		totems.forEach((totem) => {
			let totemDiv = document.createElement("div");

			totemDiv.innerText = totem.description_id;
			totemDiv.style.color = "white";
			totemDiv.style.fontWeight = "bold";

			if (totem.situation === "1") {
				totemDiv.style.backgroundColor = "green";
			}
			else {
				totemDiv.style.backgroundColor = "red";
			}

			body.appendChild(totemDiv);
		})
	};

	xmlHttp.send();
}
