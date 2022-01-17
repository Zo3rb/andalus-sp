import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changePasswordHandler } from '../redux/actions/userActions';

const ChangePassword = ({ match }) => {

    const history = useHistory();

    const token = match.params.token;

    const [formData, setFormData] = useState({
        password: "",
        password2: ""
    });

    const [validated, setValidated] = useState(false);

    const { user } = useSelector(state => state.userLogin);

    const onInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onFormSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        changePasswordHandler({ token, ...formData }, () => history.push("/login"));
    };

    useEffect(() => {
        if (user || user !== null) history.push("/");
    }, [token, history, user]);

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1 className="mt-5">Change Password</h1>
                    <hr />
                    <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="passwordInput">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={onInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordInput">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re Enter Your Password"
                                name="password2"
                                value={formData.password2}
                                onChange={onInputChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangePassword;
