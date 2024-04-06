import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class CobrosController
{
    public async addCobro(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO cobros set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }
    public async showCobros(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM cobros');
        res.json( respuesta );
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM cobros WHERE IdCobro = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Dato no encontrada'});
    }
    public async reporteventas(req: Request, res: Response): Promise<void> {
        const { fechaInicial, fechaFinal } = req.params; // Suponiendo que envías las fechas inicial y final en el cuerpo de la solicitud
        const respuesta = await pool.query(' SELECT SUM(MontoCobrado) AS ganancias_totales FROM cobros WHERE Fecha_Cobro >= ? AND Fecha_Cobro <= ?' , [fechaInicial, fechaFinal]);
        console.log("fecha inicial:",fechaInicial,"fecha final:",fechaFinal);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'No se encontraron datos' });
    }

    public async eliminarCobro(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cobros WHERE idCobro = ${id}`);
        res.json(resp);
        }
    
        public async actualizarCobro(req: Request, res: Response): Promise<void> {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = await pool.query("UPDATE cobros set ? WHERE IdCobro = ?", [req.body, id]);
            console.log(resp)
            res.json(resp);
            //res.json(null);
            }

    


}
export const cobroController = new CobrosController();