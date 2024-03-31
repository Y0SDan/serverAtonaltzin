import { Router } from 'express';
import { administradorController } from '../controllers/AdministradoresController';
class administradorRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.post('/addAdmin/',administradorController.addAdmin);
this.router.get('/showAdmin/',administradorController.showAdmin);
this.router.get('/showOne/:id',administradorController.showOne);
this.router.delete('/eliminarAdmin/:id', administradorController.eliminarAdmin);
this.router.put('/actualizarAdmin/:id',administradorController.actualizarAdmin);
this.router.post('/ValidarAdmin/',administradorController.ValidarAdmin);
}
}
const administradoRoutes= new administradorRoutes();
export default administradoRoutes.router;