import React, { Fragment } from 'react';
import Animation from './searching_tickets.gif';

const Loader = () => (
    <Fragment>
        <img src={Animation} style={{ display: 'block', margin: 'auto'}} />
    </Fragment>
);
export default Loader;