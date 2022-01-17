import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { loginUser, loginUserWithGoogle, loginUserWithFacebook } from '../redux/actions/userActions';

const SigninPage = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.userLogin);

    const [formData, setFormData] = useState({
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
        dispatch(loginUser(formData));
    };

    // Google Login Method
    const responseGoogle = (response) => {
        // console.log(response.profileObj); ---------- Google Response Object
        dispatch(loginUserWithGoogle({
            email: response.profileObj.email,
            name: response.profileObj.givenName,
            password: `${response.profileObj.email}${response.profileObj.googleId}`,
        }));
    };

    // Facebook Login Method
    const responseFacebook = (response) => {
        // console.log(response); -------------- Facebook Response Object
        let email = `${response.name.split(" ").join("_")}@facebook.com`;
        dispatch(loginUserWithFacebook({
            email,
            name: response.name.split(" ")[0],
            password: `${email}${response.userID}`
        }));
    };

    useEffect(() => {
        if (user && user.email) history.push("/");
    }, [user, history]);

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1 className="mt-5">Sign In Here</h1>
                    <hr />

                    <GoogleLogin
                        clientId="930817625084-u0urf9912c9fklhc4i44ive021u6lgld.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="btn btn-danger w-100 d-block m-auto" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i> Login With Google</button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <hr />

                    <FacebookLogin
                        appId="514310612989997"
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <button className="btn btn-primary w-100 d-block m-auto" onClick={renderProps.onClick}><i className="fab fa-facebook-f"></i> Login With Facebook</button>
                        )}
                    />

                    <hr />

                    <Form noValidate validated={validated} onSubmit={onFormSubmit}>
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
                            {loading ? "Please Wait" : "Login"}
                        </Button>
                    </Form>

                    <p className="small text-danger mt-2">Have a Trouble Log in ? <Link to="/forgot-password">Forgot Password</Link></p>
                    <p className="small text-muted mt-2">Don't have an Account ? Please <Link to="/reg">Signup</Link> Here</p>
                </Col>
            </Row>
        </Container>
    );
}

export default SigninPage;
