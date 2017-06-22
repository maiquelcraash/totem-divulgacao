/**
 * Created by maiquel on 21/06/17.
 */

let url = window.location.href;							//get the server link

let arr = url.split("/");
let logHosts = {
	activities: arr[0] + "//" + arr[2] + "/totems/log/totemActivity"
};


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

