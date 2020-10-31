const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

	client.on('siguienteTicket', (data, callback) => {
		callback(ticketControl.siguiente());
	})

	client.emit('estadoActual', {
		actual: ticketControl.getUltimo()
	});

	client.on('atenderTicket', (data, callback) => {
		if (!data.escritorio) {
			return callback({
				err: true,
				msg: "Escritorio necesario"
			});
		}

		let ticketAAtender = ticketControl.atenderTicket(data.escritorio);
		callback(ticketAAtender);

		// ACtualizar pantalla
	});

});