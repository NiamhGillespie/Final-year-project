/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UpdateEpicForm from '../components/epic_forms/edit_epic_form.js';

//mocked data:
const team = { id: 1 };
const user = {
    id: 1,
    username: 'NiamhG',
    password: 'pass123',
    email: 'fake@gmail.com',
    first_name: 'Niamh',
    surname: 'Gillespie',
    role: 'team_member',
    belongs_to: '2',
    teams: [0]
};
const epic = {
    id: 43,
    epic_id: '43',
    epic_colour: '4d00ff',
    team_id: '34',
    title: 'Hive Booking and Payment System',
    order: 1,
    tags: [],
    values: [25],
    last_edited_by: '75',
    last_edited: 'Sat Feb 24 2024',
    created_by: '75',
    time_created: 'Sat Feb 24 2024',
    completed: false
};
const toggleModal = jest.fn();
const user_list = [];

test('Loads form fields properly', async () => {
    const { getByText } = render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);
    const values_exist = getByText('Values:');
    const colour_example_exists = getByText('Epic colour:');
    const update_btn_exists = getByText('Update');

    expect(screen.getByTitle('title')).toHaveValue('Hive Booking and Payment System');
    expect(values_exist).toBeTruthy();
    expect(colour_example_exists).toBeTruthy();
    expect(update_btn_exists).toBeTruthy();
});

test('Title on change works', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('title'), 's');

    expect(screen.getByTitle('title')).toHaveValue('Hive Booking and Payment Systems');
});

test('Title validation works for original title', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
});

test('Title validation works for too short titles', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.clear(screen.getByTitle('title'));
    expect(screen.getByText('Please enter a title')).toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
});

test('Title validation works for too long titles', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('title'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );
    expect(screen.getByText("A title can't be longer than 128 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
});

test('Title validation works for valid titles', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Valid title');
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
});

test('Add value works as expected', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.type(screen.getByPlaceholderText('Choose Values'), 'No values');
    expect(screen.getByPlaceholderText('Choose Values')).toHaveValue('No values');
});

test('Create epic should trigger an alert if the form is invalid', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.clear(screen.getByTitle('title'));

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Create epic not should trigger an alert if the form is valid', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Test Epic Title');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update'));
    expect(global.alert).toHaveBeenCalledTimes(0);
});

test('Mark epic as complete works as expected', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    fireEvent.click(screen.getByText('Mark epic as complete'));
    expect(screen.getByText('Mark epic as incomplete')).toBeInTheDocument();
    expect(screen.queryByText('Mark epic as complete')).not.toBeInTheDocument();
});

test('Mark epic as complete does not work for invalid epic', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    userEvent.clear(screen.getByTitle('title'));

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Mark epic as complete'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Delete epic as complete works as expected', async () => {
    render(<UpdateEpicForm team={team} user={user} epic={epic} user_list={user_list} toggle={toggleModal} />);

    var spyOnWindow = jest.spyOn(window, 'confirm');

    fireEvent.click(screen.getByText('Delete epic'));

    expect(spyOnWindow).toHaveBeenCalledTimes(1);
});
