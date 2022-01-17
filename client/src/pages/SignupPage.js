import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { registerNewUser } from '../redux/actions/registerAction';

const SignupPage = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.register);
    const { user } = useSelector(state => state.userLogin);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [validated, setValidated] = useState(false);

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
        dispatch(registerNewUser(formData, () => setTimeout(() => history.push("/"), 2000)));
    };

    useEffect(() => {
        // Prevent Logged in User to Reach this Endpoint
        if (user && user.email) history.push("/");
    }, [user, history]);

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1 className="mt-5">Signup a New User Here</h1>
                    <hr />
                    <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                value={formData.name}
                                onChange={onInputChange}
                                type="text"
                                name="name"
                                placeholder="Enter Your Username"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control
                                value={formData.email}
                                onChange={onInputChange}
                                type="email"
                                name="email"
                                placeholder="Enter Your Email Address"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                value={formData.password}
                                onChange={onInputChange}
                                type="password"
                                placeholder="Your Password"
                                name="password"
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={onFormSubmit}
                            disabled={loading}
                        >
                            {loading ? "Please Wait" : "Register"}
                        </Button>
                    </Form>
                    <p className="small text-muted mt-2">Already has an account ? Please <Link to="/login">Login</Link> Here</p>
                </Col>
            </Row>
        </Container>
    );
}

export default SignupPage;
