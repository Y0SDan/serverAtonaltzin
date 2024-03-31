import { Router } from 'express';
import { reservacionesController } from '../controllers/ReservacionesController';
class reservacionesRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.get('/ValidarReserva/:ID_Cabana/:FechaInicio/:FechaFin',reservacionesController.ValidarReserva);
this.router.post('/addReserva/',reservacionesController.addReserva);
this.router.get('/Mostrar_reservaciones/',reservacionesController.showReservas);
this.router.get('/showOne/:id',reservacionesController.showOne);
this.router.delete('/eliminarReservacion/:id', reservacionesController.eliminarReservacion);
this.router.put('/actualizarReservacion/:id',reservacionesController.actualizarReservacion);
}
}
const reservacionRoutes= new reservacionesRoutes();
export default reservacionRoutes.router;