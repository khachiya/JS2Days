const select = document.querySelector('select');
const list = document.querySelector('ul');
const h1 = document.querySelector('h1');

select.onchange = function() {
	const choice = select.value;
	let days = 31;

	if (choice === '2月') {
		days = 28;
	} else if (choice === '4月' || choice === '6月' || choice === '9月' || choice === '11月') {
		days = 30;
	}
	createCalendar(days, choice);
}

function createCalendar(days, choice) {
	list.innerHTML = '';
	h1.textContent = choice;
	for (let i = 1; i <= days; i++) {
		const listItem = document.createElement('li');
		listItem.textContent = i;
		list.appendChild(listItem);
	}
}

createCalendar(31, '1月');
