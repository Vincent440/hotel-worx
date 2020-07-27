import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './loginForm.css'

export default function LoginForm (props) {
  return (
    <div className='Login'>
      <Form onSubmit={e => props.handleSubmit(e)} className='text-center'>
        <Form.Row className='justify-content-center'>
          <Form.Group controlId='loginUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control size='lg' onChange={props.handleInputChange} value={props.username} autoComplete='username' type='text' name='username' />
          </Form.Group>
        </Form.Row>
        <Form.Row className='justify-content-center'>
          <Form.Group controlId='loginPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control size='lg' onChange={props.handleInputChange} value={props.password} autoComplete='current-password' type='password' name='password' />
          </Form.Group>
        </Form.Row>
        <Button disabled={props.isFormInValid()} className='w-75 mx-auto mb-2' type='submit' size='block' variant='primary'>
          <strong>Login</strong>
        </Button>
      </Form>
    </div>
  )
}
