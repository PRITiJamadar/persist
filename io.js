import  io from 'socket.io-client'
const CON_PORT='localhost:4500/';


let socket;
export default socket =io(CON_PORT)