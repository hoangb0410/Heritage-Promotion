import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';
import { adminRoutes, publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import DefaultLayoutAdmin from './pages/Admin/components';
import { useSelector } from 'react-redux'
import PageError from './pages/PageError';

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const isAdmin = localStorage.getItem('isAdmin')
  const accessToken = localStorage.getItem('accessToken');

  //console.log(isAdmin);

  // useEffect(() => {
  //   if (accessToken) setIsLogin(true);
  //   //if (isAdminn) setIsAdmin(true);
  // }, []);

  return (
      <div className="App">
          <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = route.layout || DefaultLayout
                const Page = route.component
                return <Route key={index} path={route.path} element={
                  <Layout>
                    <Page />  
                  </Layout>
              }
              />;
              })}

              {privateRoutes.map((route, index) => {
                const Layout = route.layout || DefaultLayout
                const Page = route.component
                return (
                    <Route key={index} path={route.path} element={
                      accessToken ? 
                      <Layout>
                        <Page />
                      </Layout>
                      : <Navigate to="/login" replace/>
                    }
                  />
              );
              })}
              
              {adminRoutes.map((route, index) => {
                const Layout = route.layout || DefaultLayoutAdmin
                const Page = route.component;
                return <Route key={index} path={route.path} element={ 
                  isAdmin == 'true' ?
                  <Layout>
                    <Page />
                  </Layout>
                  : <Navigate to="/" replace />
                }
                />;
              })}
              <Route path="*" element={<PageError />} />
          </Routes>
      </div>
  );
}

export default App;
