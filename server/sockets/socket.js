const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

	client.on('siguienteTicket', (data, callback) => {
		console.log('Server responde');
		callback(ticketControl.siguiente());
	})

});