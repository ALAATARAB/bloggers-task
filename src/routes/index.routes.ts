import magicItemRoutes from './magic-item.routes';
import magicMoverRoutes from './magic-mover.routes';


const mountRoutes = (app: any) => {
    app.use('/api/magic-movers', magicMoverRoutes);
    app.use('/api/magic-items', magicItemRoutes);
}

export default mountRoutes;