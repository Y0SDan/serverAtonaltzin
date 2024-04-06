"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientesController_1 = require("../controllers/ClientesController");
class clientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/addCliente/', ClientesController_1.clientesController.addCliente);
        this.router.get('/ShowCliente/', ClientesController_1.clientesController.showCliente);
        this.router.get('/showOne/:id', ClientesController_1.clientesController.showOne);
        this.router.put('/actualizarCliente/:id', ClientesController_1.clientesController.actualizarCliente);
        this.router.get('/obtenerReservacionesPorCliente/:nombre/:apellido', ClientesController_1.clientesController.obtenerReservacionesPorCliente);
        this.router.get('/obtenerPagosPorCliente/:nombre/:apellido', ClientesController_1.clientesController.obtenerPagosPorCliente);
        this.router.get('/obtenerClienteCorreo/:correo', ClientesController_1.clientesController.obtenerClienteCorreo);
        this.router.delete('/eliminarCliente/:id', ClientesController_1.clientesController.eliminarCliente);
        this.router.post('/login/', ClientesController_1.clientesController.login);
        this.router.put('/actualizarContrasena', ClientesController_1.clientesController.actualizarContrasena);
    }
}
const clienteRoutes = new clientesRoutes();
exports.default = clienteRoutes.router;
