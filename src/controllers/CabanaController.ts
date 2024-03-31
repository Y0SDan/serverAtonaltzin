import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class CabanaController
{
    public async createCabana(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO cabana set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }
    public async mostrar_todas_cabanas(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM cabana');
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM cabana WHERE ID_Cabana = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Cabaña no encontrada'});
    }
    public async eliminarCabana(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cabana WHERE ID_Cabana = ${id}`);
        res.json(resp);
        }
    public async actualizarCabana(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE cabana set ? WHERE ID_Cabana = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
        }

}
export const cabanaController = new CabanaController();