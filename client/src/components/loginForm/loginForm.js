import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./loginForm.css";

export default function LoginForm(props) {
    return (
        <div className="Login">
            <Form onSubmit={(e)=>props.handleSubmit(e)} className="text-center border p-3">
                <Form.Row className="justify-content-center">
                    <Form.Group controlId="loginUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control size="lg" onChange={props.handleInputChange} autoComplete="username" type="text" name="username" placeholder="Username" />
                    </Form.Group>  
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="lg" onChange={props.handleInputChange} autoComplete="current-password" type="password" name="password" placeholder="Password" />
                    </Form.Group>
                </Form.Row>
                <Button disabled={props.isFormInValid()} className="w-75 mx-auto mb-2" type="submit" size="block" variant="success">Login</Button>
            </Form>
        </div>
    );
}

                // <FormGroup controlId="username">
                //     <FormLabel><h5>Username</h5></FormLabel>
                //     <FormControl />
                // </FormGroup>
                // <FormGroup>
                //     <FormLabel><h5>Password</h5></FormLabel>
                //     <FormControl />
                // </FormGroup>
                // <Button onClick={props.login}>Login</Button>