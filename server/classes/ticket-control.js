const fs = require('fs');

class Ticket {
	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TicketControl {

	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];

		let data = require('../data/data.json');

		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
		} else {
			this.reiniciarConteo();
		}
	}

	siguiente() {
		this.ultimo++;
		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);
		this.grabarArchivo();
		return this.getUltimo();
	}

	getUltimo() {
		return `Ticket ${this.ultimo}`
	}

	reiniciarConteo() {
		this.ultimo = 0;
		this.tickets = [];
		this.grabarArchivo();
	}

	grabarArchivo() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets
		};

		let jsonDataStr = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataStr);
	}
}

module.exports = {
	TicketControl
}