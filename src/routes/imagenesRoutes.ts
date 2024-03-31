import { Router } from 'express';
import { imagenesController } from '../controllers/ImagenesController';
class imagenesRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.post('/addImagen/',imagenesController.addImagen);
this.router.get('/mostrar_imagenes/',imagenesController.showImagenes);
this.router.get('/showOne/:id',imagenesController.showOne);
this.router.delete('/eliminarImagen/:id', imagenesController.eliminarImagen);
this.router.put('/actualizarImagen/:id',imagenesController.actualizarImagen);
}
}
const imagenRoutes= new imagenesRoutes();
export default imagenRoutes.router;