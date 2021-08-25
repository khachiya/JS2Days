class Book {
	constructor(title, author, price, genre) {
		this.title = title;
		this.author = author;
		this.price = price;
		this.genre = genre;
	}
}

// クラスBookから派生させたクラスPeriodicalを下記に追加。
// クラスPeriodicalには、Bookにはないプロパティperiodを追加。
class Periodical extends Book {
	constructor(title, author, price, genre, period) {
		super(title, author, price, genre);
		this.period = period;
	}
}

// クラスPeriodicalの利用例。
// 最後の"週刊"がプロパティperiodの値となる。
let jump = new Periodical("週刊少年ジャンプ", "", 300, "漫画", "週刊");
console.log(jump.period);   // 週刊
