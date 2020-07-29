import React, { Fragment } from 'react';
import Animation from './searching_tickets.gif';

const Loader = () => (
    <Fragment>
        <img className="loader" src={Animation} style={{ display: 'block', margin: 'auto', maxWidth: '300px'}} />
    </Fragment>
);
export default Loader;