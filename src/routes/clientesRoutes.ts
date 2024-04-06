import { Router } from 'express';
import { clientesController } from '../controllers/ClientesController';
class clientesRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.post('/addCliente/',clientesController.addCliente);
this.router.get('/ShowCliente/',clientesController.showCliente);
this.router.get('/showOne/:id',clientesController.showOne);
this.router.put('/actualizarCliente/:id',clientesController.actualizarCliente);
this.router.get('/obtenerReservacionesPorCliente/:nombre/:apellido',clientesController.obtenerReservacionesPorCliente);
this.router.get('/obtenerPagosPorCliente/:nombre/:apellido',clientesController.obtenerPagosPorCliente);
this.router.get('/obtenerClienteCorreo/:correo',clientesController.obtenerClienteCorreo);
this.router.delete('/eliminarCliente/:id',clientesController.eliminarCliente);
this.router.post('/login/',clientesController.login);
this.router.put('/actualizarContrasena',clientesController.actualizarContrasena)


}
}
const clienteRoutes= new clientesRoutes();
export default clienteRoutes.router;