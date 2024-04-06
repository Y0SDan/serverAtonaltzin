import { Router } from 'express';
import { cobroController } from '../controllers/CobrosController';
class cobrosRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.post('/addCobro/',cobroController.addCobro);
this.router.get('/showCobros/',cobroController.showCobros);
this.router.get('/showOne/:id',cobroController.showOne);
this.router.get('/reporteventas/:fechaInicial/:fechaFinal',cobroController.reporteventas);
this.router.put('/actualizarCobro/:id',cobroController.actualizarCobro);
this.router.delete('/eliminarCobro/:id',cobroController.eliminarCobro);
}
}
const cobroRoutes= new cobrosRoutes();
export default cobroRoutes.router;