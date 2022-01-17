import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { activateUser } from "../redux/actions/userActions";

const AccountActivate = ({ match }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const token = match.params.token;

    const { user } = useSelector(state => state.userLogin);

    useEffect(() => {
        if (user) history.push("/");
        if (token) dispatch(activateUser(token, () => setTimeout(() => history.push("/"), 2000)));
    }, [dispatch, token, history, user]);

    return (
        <Container>
            <Row>
                <Col className="text-center" md={{ span: 10, offset: 1 }}>
                    <h1 className="mt-5">Account Activation</h1>
                    <hr />
                    <p className="text-muted mt-5">Please Wait ... You'll Be Redirected Automatically</p>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountActivate;
