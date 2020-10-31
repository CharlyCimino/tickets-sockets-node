const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

	client.on('siguienteTicket', (data, callback) => {
		callback(ticketControl.siguiente());
	})

	client.emit('estadoActual', {
		actual: ticketControl.getUltimo(),
		ultimos4: ticketControl.getUltimos4()
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

		client.broadcast.emit('actualizarPantalla', {
			ultimos4: ticketControl.getUltimos4()
		});
	});

});