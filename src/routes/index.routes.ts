import userRoutes from './user.routes';
import blogRoutes from './blog.routes';
import authRoutes from './auth.routes';


const mountRoutes = (app: any) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/blogs', blogRoutes);
}

export default mountRoutes;