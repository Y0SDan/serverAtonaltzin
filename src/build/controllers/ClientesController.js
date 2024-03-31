"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ClientesController {
    addCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const salt = yield bcryptjs_1.default.genSalt(10);
            console.log(salt);
            req.body.password1 = yield bcryptjs_1.default.hash(req.body.password1, salt);
            const resp = yield database_1.default.query("INSERT INTO cliente set ?", [req.body]);
            console.log(resp);
            res.json(resp);
            //res.json(null);
        });
    }
    showCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM cliente');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM cliente WHERE ID_Cliente = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cliente no encontrada' });
        });
    }
    eliminarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM cliente WHERE ID_Cliente = ${id}`);
            res.json(resp);
        });
    }
    actualizarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE cliente set ? WHERE ID_Cliente = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    obtenerReservacionesPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido } = req.params;
            console.log("Nombre:", nombre);
            try {
                const query = yield database_1.default.query(`
                    SELECT c.Nombre, c.Apellido,r.ID_Reservacion, r.FechaInicio, r.FechaFin
                    FROM cliente c JOIN reservaciones r ON 
                    c.ID_Cliente = r.ID_Cliente WHERE c.Nombre = '${nombre}' and c.Apellido = '${apellido}'`, [nombre, apellido]);
                // Manejar los resultados de la consulta...
                res.json(query);
            }
            catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        });
    }
    obtenerPagosPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido } = req.params;
            console.log("Nombre:", nombre, "Apellido:", apellido);
            try {
                const query = yield database_1.default.query(`
                    SELECT c.Nombre AS Nombre_Cliente, c.Apellido AS Apellido_Cliente, co.*, r.*
                    FROM cliente c
                    JOIN reservaciones r ON c.ID_Cliente = r.ID_Cliente
                    JOIN cobros co ON r.ID_Reservacion = co.idReservacion
                    WHERE c.Nombre = '${nombre}' AND c.Apellido = '${apellido}'`, [nombre, apellido]);
                res.json(query);
            }
            catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, password1 } = req.body;
            try {
                // Ejecutar la consulta SQL para determinar el tipo de usuario y obtener el ID del cliente
                const query = yield database_1.default.query(`
                    SELECT password1, ID_Cliente, tipo FROM cliente WHERE Email = ?`, [Email]);
                const resp = query;
                if (resp && resp[0]) { // Verificar si resp[0] está definido
                    // Verificar la contraseña con bcrypt
                    bcryptjs_1.default.compare(password1, resp[0].password1, (err, resEncriptar) => {
                        if (resEncriptar === true) {
                            // Devolver el tipo de usuario y el ID del cliente en la respuesta
                            res.json({ tipo_usuario: resp[0].tipo, id_cliente: resp[0].ID_Cliente });
                        }
                        else {
                            res.json({ tipo_usuario: -1, id_cliente: null, error: 'Contraseña incorrecta' });
                        }
                    });
                }
                else {
                    res.status(404).json({ tipo_usuario: -1, id_cliente: null, error: 'Cliente no encontrado' });
                }
            }
            catch (error) {
                console.error("Error al buscar el cliente:", error);
                res.status(500).json({ tipo_usuario: -1, id_cliente: null, error: 'Error al buscar el cliente' });
            }
        });
    }
}
exports.clientesController = new ClientesController();
