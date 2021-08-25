const XLSX = require("xlsx");
const Utils = XLSX.utils;

// ブックの読み込み
const book = XLSX.readFile("sales.xlsx");

// シートの読み込み
const sheet1 = book.Sheets["sales"];

// セル範囲を取得
const range = sheet1["!ref"];

// セル範囲を数値に変換
const dRange = Utils.decode_range(range);

let sum = 0;
for (let i = dRange.s.r + 1; i <= dRange.e.r; i++) {
	const Ai = Utils.encode_cell({ r:i, c:0 });
	const Bi = Utils.encode_cell({ r:i, c:1 });
	const cellAi = sheet1[Ai];
	const cellBi = sheet1[Bi];
	sum += cellAi.v * cellBi.v;
}
console.log(sum);
