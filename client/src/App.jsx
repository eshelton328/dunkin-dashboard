import React, { Suspense } from 'react'
import {
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

const HomePage = React.lazy(() => import('./pages/Home.jsx'));
const PaymentsPage = React.lazy(() => import('./pages/Payments.jsx'));
const ReportingPage = React.lazy(() => import('./pages/Reporting.jsx'));

const App = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/payments' element={<PaymentsPage/>} />
                <Route path='/reporting' element={<ReportingPage/>} />
                <Route path='*' element={<Navigate to='/' />} /> 
            </Routes>
        </Suspense>
    )
}

export default App;