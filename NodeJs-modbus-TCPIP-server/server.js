const net = require('net');
const modbus = require('jsmodbus');
const netServer = new net.Server();
const server = new modbus.server.TCP(netServer, {

})

server.on('connection', (client) => {
    console.log('New connection')
})

server.on('postWriteMultipleRegisters', (value) => {
    console.log(value._body)
})

let i = 0;

//40005-ös regiszterbe írom a 8-as számot
//server.holding.writeUInt16BE(13,8)
//40006-os regiszterbe írom a 102-es számot
//server.holding.writeUInt16BE(102,10)

//Függvény, ami lefut minden másodpercben
setInterval(() => {
    i++;
    server.holding.writeUInt16BE(i,8) //40001 + 8/2 = 40005, 40005-ös regiszterbe írom az i. számot
    server.holding.writeUInt16BE(i%3, 10) // 40006, 40006-os regiszterbe írom az i mod 3 számot
    if(i >= 200) {i = 0}
}, 1000);

netServer.listen(502)