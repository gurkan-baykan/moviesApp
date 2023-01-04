import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import FilmDetails from '../screen/FilmDetails';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/FilmDetails',
    element: <FilmDetails />,
  },
]);

export default routers;
