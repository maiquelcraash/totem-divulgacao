/**
 * Created by maiquel on 21/06/17.
 */

let url = window.location.href;							//get the server link

let arr = url.split("/");
let logHosts = {
	activities: arr[0] + "//" + arr[2] + "/log/totemActivity",
	dayOfWeek: arr[0] + "//" + arr[2] + "/log/totemActivityDayOfWeek",
	byTotem: arr[0] + "//" + arr[2] + "/log/getActivityByTotem"
};


(function loadLineChart() {
	"use strict";

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logHosts.activities, true); // false for synchronous request

	xmlHttp.onload = function (data) {
		let rows = JSON.parse(xmlHttp.responseText);
		let column = ["Quantidade"];
		let x = ["x"];

		//parse do json em um formato do C3
		rows.forEach((row) => {
			let data = new Date(row.data);
			let date_string = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
			column.push(row.quantidade);
			x.push(data);
		});

		let lineChart = c3.generate({
			bindto: '#lineChart',
			data: {
				x: "x",
				columns: [x, column]
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




