/* eslint-disable testing-library/prefer-screen-queries */
import AddEpicForm from '../../components/epic_forms/add_epic_form.js';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTeam from '../../components/account_management/add_team.js';

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
    const { getByText } = render(<AddTeam user={user} toggle={toggleModal} />);
    const title_exist = getByText('Add Team');
    const team_name_exist = getByText('Team Name:');
    const team_photo_exists = getByText('Team Photo:');
    const team_pp_exists = getByText('Team Photo Preview:');
    const team_lead_exists = getByText('Team Leads:');
    const team_member_exists = getByText('Team Members:');

    expect(title_exist).toBeTruthy();
    expect(team_name_exist).toBeTruthy();
    expect(team_photo_exists).toBeTruthy();
    expect(team_pp_exists).toBeTruthy();
    expect(team_lead_exists).toBeTruthy();
    expect(team_member_exists).toBeTruthy();
});

// test('Title on change works', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);
//     userEvent.type(screen.getByTitle('title'), 'Test epic title');

//     expect(screen.getByTitle('title')).toHaveValue('Test epic title');
// });

// test('Title validation works for too short titles', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);

//     userEvent.type(screen.getByTitle('title'), '');
//     expect(screen.getByText('Please enter a title')).toBeInTheDocument();
//     expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
// });

// test('Title validation works for too long titles', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);

//     userEvent.type(
//         screen.getByTitle('title'),
//         'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
//     );
//     expect(screen.getByText("A title can't be longer than 128 characters")).toBeInTheDocument();
//     expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
// });

// test('Title validation works for valid titles', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);

//     userEvent.type(screen.getByTitle('title'), 'Valid title');
//     expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
//     expect(screen.queryByText("A title can't be longer than 128 characters")).not.toBeInTheDocument();
// });

// test('Add value works as expected', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);

//     userEvent.type(screen.getByPlaceholderText('Choose Values'), 'No values');
//     expect(screen.getByPlaceholderText('Choose Values')).toHaveValue('No values');
// });

// test('Create epic should trigger an alert if the form is invalid', async () => {
//     render(<AddEpicForm team={team} user={user} />);

//     global.alert = jest.fn();
//     fireEvent.click(screen.getByText('Create Epic'));
//     expect(global.alert).toHaveBeenCalledTimes(1);
// });

// test('Create epic not should trigger an alert if the form is invalid', async () => {
//     render(<AddEpicForm team={team} user={user} toggle={toggleModal} />);

//     userEvent.type(screen.getByTitle('title'), 'Test Epic Title');

//     global.alert = jest.fn();
//     fireEvent.click(screen.getByText('Create Epic'));
//     expect(global.alert).toHaveBeenCalledTimes(0);
// });

//removes could not parse stylesheet prime react error - JSDOM issue with PrimeReact colour picker component
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (params.find((p) => p.toString().includes(jsDomCssError))) {
  }
};