import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class AdministradoresController
{
    public async addAdmin(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO administradores set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }
    public async showAdmin(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM administradores');
        res.json( respuesta );
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM administradores WHERE ID_Admin = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Cuenta no encontrada'});
    }
    public async eliminarAdmin(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM administradores WHERE ID_Admin = ${id}`);
        res.json(resp);
        }
    public async actualizarAdmin(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE administradores set ? WHERE ID_Admin = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
        }
    
    public async ValidarAdmin(req: Request, res: Response): Promise<void> {
            //console.log(req.body)
            const parametros = req.body;
            var consulta = `SELECT ID_Admin, Usuario FROM administradores WHERE Usuario = '${parametros.Usuario}' AND Contrasena = '${parametros.contrasena}'`;
            const resp = await pool.query(consulta);
            if(resp.length>0)
                res.json(resp);
            else
                res.json({"id_Rol":"-1"});
            //res.json(null);
            //console.log(consulta);
        }    
        }
        
export const administradorController = new AdministradoresController();