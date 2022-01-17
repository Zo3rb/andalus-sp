import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { forgotPassword } from '../redux/actions/userActions';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    // Just for Front End Validation
    const [validated, setValidated] = useState(false);

    const onFormSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        forgotPassword(email);
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1 className="mt-5">Forgot Password ?</h1>
                    <hr />
                    <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="fPasswordEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!email.length}
                        >
                            Send Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword;
