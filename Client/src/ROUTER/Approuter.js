import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BranchLocator from '../views/BranchLocator';
import MIHCM from '../views/MIHCM.js';


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/branchlocator' element={<BranchLocator/>} />
                <Route path='/confirmation' element={<MIHCM />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;