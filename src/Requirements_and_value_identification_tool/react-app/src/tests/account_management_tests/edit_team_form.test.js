/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditTeamForm from '../../components/account_management/edit_team_form.js';

//mocked data:
const team = {
    "id": 31,
    "belongs_to": 24,
    "team_name": "The A Team",
    "team_photo": "https://niamhgillespie.pythonanywhere.com/media/team_images/istockphoto-153703469-1024x1024.jpg",
    "team_leads": [],
    "team_members": [
        71
    ]
};
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
    const { getByText } = render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);
    const title_exist = getByText('Update Team');
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

test('Team name on change works', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.clear(screen.getByTitle('team_name'));
    userEvent.type(screen.getByTitle('team_name'), 'Team 1');

    expect(screen.getByTitle('team_name')).toHaveValue('Team 1');
});

test('Title validation works for too short titles', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('team_name'), 'a');
    userEvent.clear(screen.getByTitle('team_name'));
    expect(screen.getByText('Please enter a team name')).toBeInTheDocument();
    expect(screen.queryByText("A team name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('Title validation works for too long titles', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.type(
        screen.getByTitle('team_name'),
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
    );
    expect(screen.getByText("A team name cannot be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a team name')).not.toBeInTheDocument();
});

test('Title validation works for valid titles', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('team_name'), 'Valid team name');
    expect(screen.queryByText('Please enter a team name')).not.toBeInTheDocument();
    expect(screen.queryByText("A team name cannot be longer than 30 characters")).not.toBeInTheDocument();
});

test('Add team lead works as expected', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    expect(screen.getByPlaceholderText('Add Team Leads')).toHaveValue('');
});


test('Add team member works as expected', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    expect(screen.getByPlaceholderText('Add Team Members')).toHaveValue('');
});

test('Add profile photo works as expected', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);
    const testFile = new File(['hello'], 'hello.png', {type: 'image/png'})

    global.URL.createObjectURL = jest.fn();
    const fileInput = screen.getByTitle('team_photo')
    userEvent.upload(fileInput, testFile)

    expect(screen.queryByText("No file chosen")).not.toBeInTheDocument();
});

test('Create team should trigger an alert if the form is invalid', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.clear(screen.getByTitle('team_name'));

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update Team'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Create epic not should trigger an alert if the form is invalid', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    userEvent.type(screen.getByTitle('team_name'), 'Team 1');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update Team'));
    expect(global.alert).toHaveBeenCalledTimes(0);
});

test('Loads delete modal', async () => {
    render(<EditTeamForm user={user} team={team} toggle={toggleModal} />);

    var spyOnWindow = jest.spyOn(window, 'confirm');
    fireEvent.click(screen.getByTitle('delete_button'));
    expect(spyOnWindow).toHaveBeenCalledTimes(1);
}); 