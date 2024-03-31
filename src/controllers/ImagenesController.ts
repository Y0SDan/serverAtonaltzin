import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class ImagenesController
{
    public async addImagen(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO imagenes set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }
    public async showImagenes(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM imagenes');
        res.json( respuesta );
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM imagenes WHERE IdImagen = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Imagen no encontrada'});
    }
    public async eliminarImagen(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM imagenes WHERE IdImagen = ${id}`);
        res.json(resp);
        }
    public async actualizarImagen(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE imagenes set ? WHERE IdImagen = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
        }

}
export const imagenesController = new ImagenesController();