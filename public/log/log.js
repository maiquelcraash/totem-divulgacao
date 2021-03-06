/**
 * Created by maiquel on 21/06/17.
 */

let url = window.location.href;							//get the server link

let arr = url.split("/");
let logHosts = {
	activities: arr[0] + "//" + arr[2] + "/log/totemActivity",
	dayOfWeek: arr[0] + "//" + arr[2] + "/log/totemActivityDayOfWeek",
	byTotem: arr[0] + "//" + arr[2] + "/log/getActivityByTotem",
	heatmap: arr[0] + "//" + arr[2] + "/log/getHeatmap",
};


(function loadLineChart() {
	"use strict";

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logHosts.activities, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let dados = JSON.parse(xmlHttp.responseText);

		let lineChart = c3.generate({
			bindto: '#lineChart',
			data: {
				x: "Data",
				columns: dados
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%Y-%m-%d'
					}
				}
			}
		});
	};
	xmlHttp.send();
}());

(function loadPizzaChart() {
	"use strict";

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logHosts.dayOfWeek, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let rows = JSON.parse(xmlHttp.responseText);
		let columns = [];

		//parse do json em um formato do C3
		rows.forEach((row) => {
			columns.push([row.dia, row.valor]);
		});

		let pieChart = c3.generate({
			bindto: '#pieChart',
			data: {
				// iris data from R
				columns: columns,
				type: 'pie'
			}
		});
	};
	xmlHttp.send();
}());

(function loadBarChart() {
	"use strict";

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logHosts.byTotem, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let rows = JSON.parse(xmlHttp.responseText);
		let columns = [];

		//parse do json em um formato do C3
		rows.forEach((row) => {
			columns.push([row.nome, row.valor]);
		});

		let barChart = c3.generate({
			bindto: '#barChart',
			data: {
				// iris data from R
				columns: columns,
				type: 'bar',
				labels: true
			},
			bar: {
				width: {
					ratio: 0.5 // this makes bar width 50% of length between ticks
				}
			},
			axis: {
				rotated: true
			}

		});
	};
	xmlHttp.send();
}());

function initMap() {

	let map, heatmap;

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logHosts.heatmap, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let rows = JSON.parse(xmlHttp.responseText);
		let mapDiv = document.getElementById('heatmap');
		mapDiv.classList.add("map");

		let points = rows.map((row) => {
			return new google.maps.LatLng(row.latitude, row.longitude)
		});

		map = new google.maps.Map(mapDiv, {
			zoom: 13,
			center: {lat: -29.4494285, lng: -51.9688635},
			scrollwheel: false
		});

		heatmap = new google.maps.visualization.HeatmapLayer({
			data: points,
			map: map
		});

		heatmap.set('radius', 80);
	};
	xmlHttp.send();
}



