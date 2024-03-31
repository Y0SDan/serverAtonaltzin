import { Router } from 'express';
import { cabanaController } from '../controllers/CabanaController';
class cabanaRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.post('/crearcabana/',cabanaController.createCabana);
this.router.get('/MostrarTodasCabanas/',cabanaController.mostrar_todas_cabanas);
this.router.get('/listOne/:id',cabanaController.listOne);
this.router.delete('/eliminarCabana/:id', cabanaController.eliminarCabana);
this.router.put('/actualizarCabana/:id',cabanaController.actualizarCabana);
}
}
const cabanasRoutes= new cabanaRoutes();
export default cabanasRoutes.router;