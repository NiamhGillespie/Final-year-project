import React from 'react';
import { NavigationBar } from './navigation_bar';
import { Outlet} from 'react-router-dom';

const BaseTemplate = () => {
    return (
        <>
            <NavigationBar />

            <Outlet />
        </>
    );
};

export default BaseTemplate;
