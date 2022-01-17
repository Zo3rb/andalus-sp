import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AccountActivate, HomePage, SigninPage, SignupPage, ChangePassword, ForgotPassword } from './pages';
import PrivateRouter from './components/PrivateRouter';

const appRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reg" component={SignupPage} />
            <Route exact path="/auth/activate/:token" component={AccountActivate} />
            <Route exact path="/login" component={SigninPage} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/auth/change-password/:token" component={ChangePassword} />
        </Switch>
    );
}

export default appRouter;

