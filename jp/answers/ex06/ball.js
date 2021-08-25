// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

class Ball {
	constructor(x, y, velX, velY, color, size) {
		// ステップ1-2
		// プロパティ x, y, velX, velY, color, size に値を代入
		this.x=x;
		this.y=x;
		this.velX=velX;
		this.velY=velY;
		this.color=color;
		this.size=size;
	}

	// define ball draw method
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

		// ステップ1-3
		// 円を塗りつぶす
		ctx.fill();
	};

	// define ball update method
	update() {
		if ((this.x + this.size) >= width) {
			this.velX = -(this.velX);
		}

		if ((this.x - this.size) <= 0) {
			this.velX = -(this.velX);
		}

		if ((this.y + this.size) >= height) {
			this.velY = -(this.velY);
		}

		// ステップ2-3
		// 下記に if 文を追加して画面上部でボールが反射するようにする
		if ((this.y - this.size) <= 0) {
			this.velY = -(this.velY);
		}

		this.x += this.velX;
		this.y += this.velY;
	};
}

// ステップ1-4
// クラスBallのインスタンス testBall を生成
// testBallのメソッド draw() を呼び出して画面に表示
let testBall = new Ball(50, 100,4, 4, 'blue', 10);
testBall.draw();

// define array to store balls and populate it

let balls = [];

while(balls.length < 25) {
	const size = random(10,20);
	let ball = new Ball(
		// ball position always drawn at least one ball width
		// away from the adge of the canvas, to avoid drawing errors
		random(0 + size,width - size),
		random(0 + size,height - size),
		random(-7,7),
		random(-7,7),
		'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
		size
	);
	balls.push(ball);
}

// define loop that keeps drawing the scene constantly

function loop() {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);

	// ステップ2-1
	// インスタンス testBall のメソッドdraw()とupdate()を呼び
	// 画面に表示したあとに、位置を更新
	testBall.draw();
	testBall.update();

	// ステップ3-1
	// Ballのインスタンスの配列 balls の全ての要素について
	// 画面表示と位置の更新を行う
	for(let i =0;i<balls.length;i++){
		balls[i].draw();
		balls[i].update();
	}

  requestAnimationFrame(loop);
}

// ステップ2-2
// 関数 loop() を呼び出す
loop();

