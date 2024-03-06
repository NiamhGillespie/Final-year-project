/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTagForm from '../components/tag_forms/add_tag_form.js';

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
    const { getByText } = render(<AddTagForm team={team} user={user} toggle={toggleModal} />);
    const title_exists = getByText('Tag title:');
    const description_exists = getByText('Tag description:');
    const colour_example_exists = getByText('Colour example');
    const create_btn_exists = getByText('Create Tag');

    expect(title_exists).toBeTruthy();
    expect(description_exists).toBeTruthy();
    expect(colour_example_exists).toBeTruthy();
    expect(create_btn_exists).toBeTruthy();
});

test('Title on change works', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);
    userEvent.type(screen.getByTitle('title'), 'Test tag title');

    expect(screen.getByTitle('title')).toHaveValue('Test tag title');
});

test('Title validation works for too short titles', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), '');
    expect(screen.getByText('Please enter a title')).toBeInTheDocument();
    expect(screen.queryByText("The title can't be longer than 30 characters")).not.toBeInTheDocument();
});

test('Title validation works for too long titles', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong');
    expect(screen.getByText("The title can't be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
});

test('Title validation works for valid titles', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Valid title');
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
});

test('Description validation works for too long titles', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('description'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );
    expect(screen.getByText("The description can't be longer than 200 characters")).toBeInTheDocument();
});

test('Description validation works for valid titles', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('description'), 'Valid description');
    expect(screen.queryByText("A description can't be longer than 200 characters")).not.toBeInTheDocument();
});

test('Create tag should trigger an alert if the form is invalid', async () => {
    render(<AddTagForm team={team} user={user} />);

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create Tag'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Create tag not should trigger an alert if the form is invalid', async () => {
    render(<AddTagForm team={team} user={user} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('title'), 'Test tag title');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Create Tag'));
    expect(global.alert).toHaveBeenCalledTimes(0);
});

//removes could not parse stylesheet prime react error - JSDOM issue with PrimeReact colour picker component
//removes could not parse stylesheet prime react error - JSDOM issue with PrimeReact colour picker component
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (params.find((p) => p.toString().includes(jsDomCssError))) {
  }
};