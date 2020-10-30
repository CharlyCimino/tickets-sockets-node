const fs = require('fs');

class TicketControl {

	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();

		let data = require('../data/data.json');

		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
		} else {
			this.reiniciarConteo();
		}
	}

	siguiente() {
		this.ultimo++;
		this.grabarArchivo();
		return `Ticket ${this.ultimo}`
	}

	reiniciarConteo() {
		this.ultimo = 0;
		this.grabarArchivo();
	}

	grabarArchivo() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy
		};

		let jsonDataStr = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataStr);
	}
}

module.exports = {
	TicketControl
}