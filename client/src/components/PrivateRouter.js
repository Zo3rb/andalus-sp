import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouter = ({ component: Component, ...rest }) => {

    const { user } = useSelector(state => state.userLogin);

    return <Route {...rest} render={props => {
        return (!user || user === null) ? <Redirect to="/" /> : <Component {...props} />
    }} />
};

export default PrivateRouter;
