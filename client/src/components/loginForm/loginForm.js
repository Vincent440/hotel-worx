import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./loginForm.css";

export default function LoginForm(props) {
    return (
        <div className="Login">
            <form>
                <FormGroup controlId="username">
                    <FormLabel><h5>Username</h5></FormLabel>
                    <FormControl />
                </FormGroup>
                <FormGroup>
                    <FormLabel><h5>Password</h5></FormLabel>
                    <FormControl />
                </FormGroup>
                <Button onClick={props.login}>Login</Button>
            </form>
        </div>
    );
}

