import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Outlet}>
          <Route index Component={Home} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
