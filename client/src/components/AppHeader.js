import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logOutUser } from '../redux/actions/userActions';

const AppHeader = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector(state => state.userLogin);

    const onLogoutUser = () => {
        dispatch(logOutUser(() => history.push("/")));
    }

    return (
        <Navbar bg="dark" className="shadow" expand="md" variant="dark" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Andalus</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.name && user.accessToken) ? (
                        <Nav className="ms-auto">
                            <Button
                                onClick={onLogoutUser}
                                variant="danger"
                                type="button"
                            >
                                LogOut
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className="ms-auto">
                            <LinkContainer to="/reg">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppHeader;
