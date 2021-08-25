const fs = require("fs");
const docx = require("docx");

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

let toname = ["斎藤", "高橋", "佐藤"];
let grade = ["S", "A", "B"];

for (let i = 0; i < toname.length; i++) {
  printGrade(toname[i], grade[i], i+1);
}
