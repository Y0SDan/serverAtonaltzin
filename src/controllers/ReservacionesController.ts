import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class ReservacionesController
{
    public async ValidarReserva(req: Request, res: Response): Promise<void> {
        //const parametros = req.body;
        const { ID_Cabana} = req.params; 
        const { FechaInicio } = req.params;
        const { FechaFin } = req.params;

        try {
            const result = await pool.query(
                `
                SELECT CASE
                WHEN EXISTS (
                SELECT c.ID_cabana
                FROM reservaciones r
                INNER JOIN cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE c.ID_Cabana = ${ID_Cabana}
                  AND (
                    ('${FechaInicio}' <= r.FechaInicio AND '${FechaInicio}' <= r.FechaInicio)
                    OR ('${FechaInicio}' >= r.FechaFin AND '${FechaInicio}' >= r.FechaFin)
                  ) 
                  ) THEN 1
                ELSE 0
                END AS resultado
                `,[ ID_Cabana, FechaInicio, FechaFin]
            );
            
            const resultadoConsulta = result[0]?.resultado; // Asumiendo que la columna se llama id_cabana
            if(resultadoConsulta === 0){
                console.log(resultadoConsulta);
            }
            
            res.json(result);

            
        } catch (error) {
            console.error('Error al verificar la superposición:', error);
           // return false;
        }
        
    }
    
    public async addReserva(req: Request, res: Response): Promise<void> {
        const { ID_Cabana, ID_Cliente, FechaInicio, FechaFin } = req.body;
    
        try {
            // Insertar la reserva
            const result = await pool.query("INSERT INTO reservaciones (ID_Cabana, ID_Cliente, FechaInicio, FechaFin) VALUES (?, ?, ?, ?)", [ID_Cabana, ID_Cliente, FechaInicio, FechaFin]);
            const ID_reservacion = result.insertId;
    
            // Consultar el monto total a cobrar
            const respCobro = await pool.query(`
                SELECT 
                    (DATEDIFF(r.FechaFin, r.FechaInicio) + 1) * c.PrecioPorNoche AS monto_total
                FROM 
                    reservaciones r
                JOIN 
                    cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE 
                    r.ID_Reservacion = ?;
            `, [ID_reservacion]);
    
            // Extraer el monto total de la respuesta
            const montoTotal = respCobro[0].monto_total;
    
            // Insertar el cobro en la tabla cobros
            const respReservacion = await pool.query("INSERT INTO cobros (IdReservacion, MontoCobrado) VALUES (?, ?)", [ID_reservacion, montoTotal]);
    
            res.json({ message: 'Reserva agregada exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al agregar la reserva' });
        }
    }
    public async showReservas(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM reservaciones');
        res.json( respuesta );
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM reservaciones WHERE ID_Reservacion = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Reservacion no encontrada'});
    }
    public async eliminarReservacion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cobros WHERE IdReservacion = ${id};`);
        const resp2 = await pool.query(`DELETE FROM reservaciones WHERE ID_Reservacion = ${id};`);
        res.json(resp2);
    }

    public async actualizarReservacion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //console.log(req.params);
    console.log(id);
    const resp = await pool.query("UPDATE reservaciones set ? WHERE ID_Reservacion = ?", [req.body, id]);
    res.json(resp);
    //res.json(null);
    }

        public async PrecioReserva(req: Request, res: Response): Promise<void> {
            const { idCabana, fechaInicio, fechaFin } = req.params;
        
            if (!idCabana || !fechaInicio || !fechaFin) {
                res.status(400).json({ message: 'Se requieren los parámetros idCabana, fechaInicio y fechaFin' });
                return;
            }
        
            const sqlQuery = `
                INSERT INTO cobros (IdReservacion, MontoCobrado)
                SELECT r.ID_Reservacion, c.PrecioPorNoche * DATEDIFF(?, ?) AS total_a_pagar
                FROM reservaciones r
                JOIN cabana c ON r.ID_Cabana = c.ID_Cabana
                WHERE r.ID_Cabana = ?;`;
        
            try {
                const resp = await pool.query(sqlQuery, [fechaFin, fechaInicio, idCabana]);
                console.log(resp);
                res.json(resp);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al realizar la consulta' });
            }
        }


}
export const reservacionesController = new ReservacionesController();