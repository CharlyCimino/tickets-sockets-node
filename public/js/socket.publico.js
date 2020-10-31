var socket = io();

var lblTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')]
var lblEscritorios = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')]

socket.on('estadoActual', function (resp) {
	actualizarHTML(resp.ultimos4);
})

socket.on('actualizarPantalla', function (resp) {
	actualizarHTML(resp.ultimos4);
	var audio = new Audio('audio/new-ticket.mp3')
	audio.play();
})

function actualizarHTML(ultimos4) {
	for (let i = 0; i < ultimos4.length; i++) {
		lblTickets[i].text('Ticket ' + ultimos4[i].numero);
		lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
	}
}