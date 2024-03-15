/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddUser from '../../components/account_management/add_user.js';

//mocked data:
const team = { id: 34 };
const user = {
    id: 1,
    username: 'NiamhG',
    password: 'pass123',
    email: 'fake@gmail.com',
    first_name: 'Niamh',
    surname: 'Gillespie',
    role: 'team_member',
    belongs_to: '34',
    teams: [0]
};
const toggleModal = jest.fn();

test('Loads form fields properly', async () => {
    const { getByText } = render(<AddUser user={user} toggle={toggleModal} />);
    const title_exist = getByText('Add User');
    const f_name_exist = getByText('First Name:');
    const s_name_exists = getByText('Last Name:');
    const pp_exists = getByText('Profile Photo:');
    const username_exists = getByText('Username:');
    const email_exists = getByText('Email:');
    const password_exists = getByText('Initial password:');

    expect(title_exist).toBeTruthy();
    expect(f_name_exist).toBeTruthy();
    expect(s_name_exists).toBeTruthy();
    expect(pp_exists).toBeTruthy();
    expect(username_exists).toBeTruthy();
    expect(email_exists).toBeTruthy();
    expect(password_exists).toBeTruthy();
});

test('fn name on change works', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('first_name'), 'Name 1');

    expect(screen.getByTitle('first_name')).toHaveValue('Name 1');
});

test('fn validation works for too short titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('first_name'), 'a');
    userEvent.clear(screen.getByTitle('first_name'));
    expect(screen.getByText('Please enter a first name')).toBeInTheDocument();
    expect(screen.queryByText("First name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('fn validation works for too long titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('first_name'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );
    expect(screen.getByText("First name cannot be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a first name')).not.toBeInTheDocument();
});

test('fn validation works for valid fn', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('first_name'), 'Valid first name');
    expect(screen.queryByText('Please enter a first name')).not.toBeInTheDocument();
    expect(screen.queryByText("First name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('sn name on change works', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('surname'), 'Name 1');

    expect(screen.getByTitle('surname')).toHaveValue('Name 1');
});

test('sn validation works for too short titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('surname'), 'a');
    userEvent.clear(screen.getByTitle('surname'));
    expect(screen.getByText('Please enter a last name')).toBeInTheDocument();
    expect(screen.queryByText("Last name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('sn validation works for too long titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('surname'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );
    expect(screen.getByText("Last name cannot be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a last name')).not.toBeInTheDocument();
});

test('sn validation works for valid fn', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('surname'), 'Valid first name');
    expect(screen.queryByText('Please enter a last name')).not.toBeInTheDocument();
    expect(screen.queryByText("Last name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('username on change works', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('username'), 'testuser1');

    expect(screen.getByTitle('username')).toHaveValue('testuser1');
});

test('username validation works for too short titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('username'), 'a');
    userEvent.clear(screen.getByTitle('username'));
    expect(screen.getByText('A username must be at least 6 characters long')).toBeInTheDocument();
    expect(screen.queryByText("An username can't be longer than 25 characters")).not.toBeInTheDocument();
    expect(screen.queryByText("Username must begin with a letter")).not.toBeInTheDocument();
});

test('username validation works for too long titles', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('username'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );

    expect(screen.queryByText('A username must be at least 6 characters long')).not.toBeInTheDocument();
    expect(screen.getByText("An username can't be longer than 25 characters")).toBeInTheDocument();
    expect(screen.queryByText("Username must begin with a letter")).not.toBeInTheDocument();
});

test('username validation works for non letter starting', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('username'),
        '123456'
    );

    expect(screen.queryByText('A username must be at least 6 characters long')).not.toBeInTheDocument();
    expect(screen.queryByText("An username can't be longer than 25 characters")).not.toBeInTheDocument();
    expect(screen.getByText("Username must begin with a letter")).toBeInTheDocument();
});

test('validation works for valid username', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('username'), 'testusername2');
    
    expect(screen.queryByText('A username must be at least 6 characters long')).not.toBeInTheDocument();
    expect(screen.queryByText("An username can't be longer than 25 characters")).not.toBeInTheDocument();
    expect(screen.queryByText("Username must begin with a letter")).not.toBeInTheDocument();
});


test('Add profile photo works as expected', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);
    const testFile = new File(['hello'], 'hello.png', {type: 'image/png'})

    global.URL.createObjectURL = jest.fn();
    const fileInput = screen.getByTitle('profile_photo')
    userEvent.upload(fileInput, testFile)

    expect(screen.queryByText("No file chosen")).not.toBeInTheDocument();
});

test('Create team should trigger an alert if the form is invalid', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create User'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Create epic not should trigger an alert if the form is invalid', async () => {
    render(<AddUser user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('username'), 'testUsername');
    userEvent.type(screen.getByTitle('password'), 'Password01!');
    userEvent.type(screen.getByTitle('email'), 'fake@gmail.com');
    userEvent.type(screen.getByTitle('username'), 'testUsername');
    userEvent.type(screen.getByTitle('first_name'), 'Niamh');
    userEvent.type(screen.getByTitle('surname'), 'Gillespie');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create User'));
    expect(global.alert).toHaveBeenCalledTimes(0);
});

//removes could not parse stylesheet prime react error - JSDOM issue with PrimeReact colour picker component
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (params.find((p) => p.toString().includes(jsDomCssError))) {
  }
};