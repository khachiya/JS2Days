const XLSX = require("xlsx");
const Utils = XLSX.utils;
const fs = require("fs");
const docx = require("docx");

// ブックの読み込み
const book = XLSX.readFile("grade.xlsx");

// シートの読み込み
const sheet1 = book.Sheets["Sheet1"];

// セル範囲を取得
const range = sheet1["!ref"];

// セル範囲を数値に変換
const dRange = Utils.decode_range(range);

// Wordファイルへの書き出し関数
// 引数1: 姓　引数2: 成績　引数3: ファイル名suffix
function printGrade(toname, grade, i) {
	const doc = new docx.Document({
		sections: [{
			properties: {},
			children: [
				new docx.Paragraph({
					children: [
						new docx.TextRun({
							text: toname,
							bold: true
						}),
						new docx.TextRun("さんへ")
					]
				}),
				new docx.Paragraph({}),
				new docx.Paragraph({
					children: [
						new docx.TextRun("あなたの成績は "),
						new docx.TextRun({
							text: grade,
							bold: true
						}),
						new docx.TextRun(" です。")
					]
				})
			]
		}]
  });

	docx.Packer.toBuffer(doc).then((buffer) => {
		fs.writeFileSync("grade" + i + ".docx", buffer);
	});
}

for (let i = dRange.s.r + 1; i <= dRange.e.r; i++) {
	const Ai = Utils.encode_cell({ r: i, c: 0 });
	const Bi = Utils.encode_cell({ r: i, c: 1 });
	const cellAi = sheet1[Ai];
	const cellBi = sheet1[Bi];

	printGrade(cellAi.v, cellBi.v, i);
}
