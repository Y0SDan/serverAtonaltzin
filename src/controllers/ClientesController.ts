import {Request,Response, query} from 'express';
import pool from '../database'; //acceso a la base de datos
import bcrypt from 'bcryptjs'; 

class ClientesController
{
    public async addCliente(req: Request, res: Response): Promise<void> {
        console.log(req.body)
       const salt = await bcrypt.genSalt(10);
       console.log(salt);
        req.body.password1 = await bcrypt.hash(req.body.password1, salt);
        const resp = await pool.query("INSERT INTO cliente set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        
        //res.json(null);
    }
    public async showCliente(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM cliente');
        res.json( respuesta );
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM cliente WHERE ID_Cliente = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Cliente no encontrada'});
    }
    public async eliminarCliente(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cliente WHERE ID_Cliente = ${id}`);
        res.json(resp);
        }
    public async actualizarCliente(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE cliente set ? WHERE ID_Cliente = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
        }

        public async obtenerReservacionesPorCliente(req: Request, res: Response): Promise<any> {
            const { nombre, apellido } = req.params;
            console.log("Nombre:", nombre);
            try {
                const query = await pool.query(`
                    SELECT c.Nombre, c.Apellido,r.ID_Reservacion, r.FechaInicio, r.FechaFin
                    FROM cliente c JOIN reservaciones r ON 
                    c.ID_Cliente = r.ID_Cliente WHERE c.Nombre = '${nombre}' and c.Apellido = '${apellido}'`, [nombre, apellido]);
                // Manejar los resultados de la consulta...
                res.json(query);
            } catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        }
        public async obtenerPagosPorCliente(req: Request, res: Response): Promise<any> {
            const { nombre, apellido } = req.params;
            console.log("Nombre:", nombre, "Apellido:", apellido);
            try {
                const query = await pool.query(`
                    SELECT c.Nombre AS Nombre_Cliente, c.Apellido AS Apellido_Cliente, co.*, r.*
                    FROM cliente c
                    JOIN reservaciones r ON c.ID_Cliente = r.ID_Cliente
                    JOIN cobros co ON r.ID_Reservacion = co.idReservacion
                    WHERE c.Nombre = '${nombre}' AND c.Apellido = '${apellido}'`,[nombre, apellido]);
                res.json(query);
            } catch (error) {
                console.error("Error al obtener reservaciones:", error);
                res.status(500).json({ error: "Error al obtener reservaciones" });
            }
        }
        public async login(req: Request, res: Response): Promise<void> {
            const { Email, password1 } = req.body;
        
            try {
                // Ejecutar la consulta SQL para determinar el tipo de usuario y obtener el ID del cliente
                const query = await pool.query(`
                    SELECT password1, ID_Cliente, tipo FROM cliente WHERE Email = ?`,
                    [Email]
                );
                const resp = query;
        
                if (resp && resp[0]) { // Verificar si resp[0] está definido
                    // Verificar la contraseña con bcrypt
                    bcrypt.compare(password1, resp[0].password1, (err, resEncriptar) => {
                        if (resEncriptar === true) {
                            // Devolver el tipo de usuario y el ID del cliente en la respuesta
                            res.json({ tipo_usuario: resp[0].tipo, id_cliente: resp[0].ID_Cliente });
                        } else {
                            res.json({ tipo_usuario: -1, id_cliente: null, error: 'Contraseña incorrecta' });
                        }
                    });
                } else {
                    res.status(404).json({ tipo_usuario: -1, id_cliente: null, error: 'Cliente no encontrado' });
                }
            } catch (error) {
                console.error("Error al buscar el cliente:", error);
                res.status(500).json({ tipo_usuario: -1, id_cliente: null, error: 'Error al buscar el cliente' });
            }
        }
        
    }        
export const clientesController = new ClientesController();