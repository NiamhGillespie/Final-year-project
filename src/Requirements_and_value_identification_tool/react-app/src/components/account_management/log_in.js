import axios from 'axios';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { API_URL_TEAM_DETAILS } from '../../constants';
import { Link } from 'react-router-dom';


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

        const teamInfo = []
        for (var i = 0; i < userInfo.data.teams.length; i++) {
            var team = await axios.get(API_URL_TEAM_DETAILS + userInfo.data.teams[i]);
            teamInfo.push(team.data)
        }

        console.log('user inf', userInfo)
        const { data } = await axios.post('http://127.0.0.1:8000/token/', user, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        console.log(data)

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('teams', JSON.stringify(teamInfo));
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/';
    };
    return (
        <div className="Auth-form-container">
            <Form onSubmit={logIn}>
                 <div className="login-box">
                    <img src={'http://localhost:8000/media/logo.png'} alt="logo" className='login-logo'/>
                     <h3 className="text-center mb-3"> Login </h3>
                     <FormGroup>
                         <Label for="username">Username:</Label>
                         <Input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                     </FormGroup>

                     <FormGroup>
                         <Label for="password">Password:</Label>
                         <Input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                     </FormGroup>

                     <p className="text-center mb-3 mt-4"> Don’t have an account? <Link to="/sign-up"> Add your organistation </Link> or contact your system administrator!</p>

                     <Button className='btn-primary login-button'> Log in </Button>
                 </div>
             </Form>    
        </div>
    );
};