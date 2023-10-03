import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavigationBar } from './navigation_bar';
import Favicon from 'react-favicon'

import { Outlet, Link } from "react-router-dom";

const BaseTemplate = () => {
  return (
    <>
        <NavigationBar />

        <Outlet />
    </>
  )
};

export default BaseTemplate;