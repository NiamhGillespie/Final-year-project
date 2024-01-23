import axios from 'axios';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


export const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const logIn = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        console.log('user is', user['username']);
        const userInfo = await axios.get('http://127.0.0.1:8000/api/user-details-by-username/' +  user['username']);
        const userData = userInfo.data
        console.log('user info = ', userInfo)

        const { data } = await axios.post('http://127.0.0.1:8000/token/', user, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/';
    };
    return (
        <div className="Auth-form-container">
            <Form onSubmit={logIn}>
                 <div className="login-box">
                     <h3 className="text-center mb-3"> Login to -brand name-! </h3>
                     <FormGroup>
                         <Label for="username">Username:</Label>
                         <Input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                     </FormGroup>

                     <FormGroup>
                         <Label for="password">Password:</Label>
                         <Input type="text" name="password" onChange={e => setPassword(e.target.value)} />
                     </FormGroup>

                     <p className="text-center mb-3 mt-4"> Don’t have an account? Add your organistation or contact your system administrator!</p>

                     <Button className='btn-primary login-button'> Log in </Button>
                 </div>
             </Form>    
        </div>
    );
};