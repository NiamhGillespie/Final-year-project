/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddColumnForm from '../components/tracking_column_forms/add_tracking_column_form.js';

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
const toggleModal = jest.fn();

test('Loads form fields properly', async () => {
    const { getByText } = render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);
    const title_exists = getByText('Column title:');
    const wip_limit_exists = getByText('WIP limit:');
    const checkbox_exists = getByText('Mark stories that are in this column as complete:');

    expect(title_exists).toBeTruthy();
    expect(wip_limit_exists).toBeTruthy();
    expect(checkbox_exists).toBeTruthy();
});

test('Title on change works', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('title'), 'Test value title');

    expect(screen.getByTitle('title')).toHaveValue('Test value title');
});

test('Title validation works for too short titles', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), '');
    expect(screen.getByText('Please enter a title')).toBeInTheDocument();
    expect(screen.queryByText("The title can't be longer than 30 characters")).not.toBeInTheDocument();
});

test('Title validation works for too long titles', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong');
    expect(screen.getByText("A title can't be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
});

test('Title validation works for valid titles', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Valid title');
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 30 characters")).not.toBeInTheDocument();
});

test('WIP validation works for non-numberical input', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('WIP'),'letters');
    expect(screen.getByText("Please enter a positive integer, 0 means that no WIP limit will be applied")).toBeInTheDocument();
});

test('WIP validation works for negative input', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('WIP'),-1);
    expect(screen.getByText("Please enter a positive integer, 0 means that no WIP limit will be applied")).toBeInTheDocument();
});

test('WIP validation works for valid input', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('WIP'), "2");
    expect(screen.queryByText("Please enter a positive integer, 0 means that no WIP limit will be applied")).not.toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-debugging-utils
});


test('Create Column should trigger an alert if the form is invalid', async () => {
    render(<AddColumnForm team={team} user={user} />);

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create Column'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});


test('Create Column not should trigger an alert if the form is valid', async () => {
    render(<AddColumnForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Test value title');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create Column'));
    expect(global.alert).toHaveBeenCalledTimes(0);
    expect(toggleModal).toHaveBeenCalledTimes(1);
});

//removes could not parse stylesheet prime react error - JSDOM issue with PrimeReact colour picker component
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
  }
};