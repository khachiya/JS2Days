const fs = require('fs');

fs.readFile('sales.csv','utf8',function(err, data) {
	let dataArray = data.split(/\r?\n/);
	let sum = 0;

	for (let i = 1; i < dataArray.length; i++) {
		dataArray[i] = dataArray[i].split(',');
		sum += dataArray[i][0] * dataArray[i][1];
	}

	console.log(sum);
});
