var email = require("emailjs/email");
console.log("hola");
module.exports = (formulario: any) => {
    console.log(formulario)
var server = email.server.connect(
{
user: "proyecto_atonaltzin@hotmail.com",
password:"atonaltzin12!",
port:507,
host: "smtp-mail.hotmail.com",
ssl: true,
});

var message: any ={};
message = {
from: "proyecto_atonaltzin@hotmail.com",
to: "Erikue<erikue@hotmail.com>",
bcc: "",
subject: "Probando ando",
attachment: [
{ data: `¡¡Te damos la más cordial bienvenida !!`, alternative: true }
]
};
server.send(message, function(err:any, message:any) { console.log(err); });
}