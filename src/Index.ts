import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import cabanaRoutes from './routes/cabanaRoutes';
import morgan from 'morgan';
import cors from 'cors';
import imagenesRoutes from './routes/imagenesRoutes';
import reservacionesRoutes from './routes/reservacionesRoutes';
import cobrosRoutes from './routes/cobrosRoutes';
import clientesRoutes from './routes/clientesRoutes';
import administradoresRoutes from './routes/administradoresRoutes';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
class Server
{
public app: Application;
constructor()
{
this.app= express();
this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
this.config();
this.routes();
}
config (): void
{
this.app.set('port',process.env.PORT|| 3000);
this.app.use(morgan('dev'));
this.app.use(cors());
this.app.use(express.json());
this.app.use(express.urlencoded({extended: false}));
}
routes (): void
{
this.app.use(indexRoutes);
this.app.use('/api/cabanas',cabanaRoutes);
this.app.use('/api/imagenes',imagenesRoutes);
this.app.use('/api/reservas',reservacionesRoutes);
this.app.use('/api/cobros',cobrosRoutes);
this.app.use('/api/clientes',clientesRoutes);
this.app.use('/api/admin',administradoresRoutes);

}
start (): void
{
this.app.listen(this.app.get('port'), () =>
{
console.log('Server on port',this.app.get('port'));
});
}
}
const server = new Server();
server.start();