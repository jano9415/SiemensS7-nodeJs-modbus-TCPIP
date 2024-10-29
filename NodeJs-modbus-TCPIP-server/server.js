const net = require('net');
const modbus = require('jsmodbus');
const netServer = new net.Server();
const server = new modbus.server.TCP(netServer, {

})

server.on('connection', (client) => {
    console.log('New connection')
})

//Összes regiszter tartalmának kiírása
//A kliens adatot ír ezekbe a holding regiszterekbe: 40001,
//40002, 40003, 40004, ezért ezeknek a regisztereknek
// a tartalmát fogja kiírni
server.on('postWriteMultipleRegisters', (value) => {
    console.log(value._body)
})

//A kliens kiolvassa ezeket a holding regisztereket: 40005 és 40006
//40005 tartalma: 24
//40006 tartalma: 108
//A 40001-es regiszter = 0
//A 40002-es regiszter = 2
//A 40003-as regiszter = 4
//A 40004-es regiszter = 6
//A 40005-ös regiszter = 8
//A 40006-os regiszter = 10

//24-es érték írása a 40005-ös holding regiszterbe
server.holding.writeUInt16BE(24,8)
//108-as érték írása a 40006-os holding regiszterbe
server.holding.writeUInt16BE(108,10)

netServer.listen(502)