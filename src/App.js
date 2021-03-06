import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';
//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
// layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
// pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Categories from './pages/Categories';
import ProductCategories from './pages/ProductCategories';

const App = props => {
  const  dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <React.Fragment>
        <Switch>
          <Route exact path='/' render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )} />
          <Route path='/register' render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
          <Route path='/login' render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
          <Route path='/reset-password' render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
          <Route path='/dashboard' render={ () => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )} />
          <Route exact path='/admin' render={ () => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth> 
          )} />
          <Route path='/admin/category' render={ () => (
            <WithAdminAuth>
              <AdminLayout>
                <Categories />
              </AdminLayout>
            </WithAdminAuth>
          )} />
          <Route exact path='/products/:filterType/:category' render={ () => (
            <MainLayout>
              <Search />
            </MainLayout>
          )} />
          <Route exact path='/products/:filterType' render={ () => (
            <MainLayout>
              <ProductCategories />
            </MainLayout>
          )} />
          <Route exact path='/products/:filterType/:category/:productId' render={ () => (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )} />
          <Route path='/cart' render={ () => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )} />
          <Route path='/payment' render={ () => (
            <MainLayout>
              <Payment />
            </MainLayout>
          )} />
        </Switch> 
    </React.Fragment> 
  );
};

export default App;
