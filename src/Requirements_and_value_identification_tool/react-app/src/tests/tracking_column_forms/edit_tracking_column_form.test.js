/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditColumnForm from '../../components/tracking_column_forms/edit_tracking_column_form';

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
    belongs_to: '2',
    teams: [34]
};
const non_completed_stories = [ {
    "id": 50,
    "story_id": "50",
    "epic_id": "43",
    "team_id": "34",
    "title": "Payment System",
    "order": 1,
    "tags": [
        27
    ],
    "user_story": "As a power crazed lunatic\nI would like to take everyone's money\nSo that I can rule the world",
    "definition_of_done": "World ruled.",
    "values": [
        25
    ],
    "story_points": "0",
    "priority": "MEDIUM",
    "pairable": false,
    "assigned_to": [
        75
    ],
    "state": "Untracked",
    "completed": false,
    "last_edited_by": "75",
    "last_edited": "Sat Feb 24 2024",
    "created_by": "75",
    "time_created": "Sat Feb 24 2024"
}];
const epics = [];
const column = {
    id: 59,
    column_id: '59',
    dashboard_id: '0000',
    team_id: '34',
    title: 'Backlog',
    mark_as_complete: false,
    stories: [],
    story_list: '',
    WIP: 2
};
const toggleModal = jest.fn();
const resetState = jest.fn();

test('Loads form fields properly', async () => {
    const { getByText } = render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} toggle={toggleModal} resetState={resetState}/>
    );
    const title_exists = getByText('Column title:');
    const wip_limit_exists = getByText('WIP limit:');
    const checkbox_exists = getByText('Mark stories that are in this column as complete:');
    const delete_exists = getByText('Delete Column');

    expect(title_exists).toBeTruthy();
    expect(wip_limit_exists).toBeTruthy();
    expect(checkbox_exists).toBeTruthy();
    expect(delete_exists).toBeTruthy();
});
 
test('Title on change works', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );
    userEvent.type(screen.getByTitle('title'), 's');

    expect(screen.getByTitle('title')).toHaveValue('Backlogs');
});

test('Title validation works for too short titles', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.clear(screen.getByTitle('title'));
    expect(screen.getByText('Please enter a title')).toBeInTheDocument();
    expect(screen.queryByText("The title can't be longer than 30 characters")).not.toBeInTheDocument();
});

test('Title validation works for too long titles', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState}toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('title'), 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong');
    expect(screen.getByText("A title can't be longer than 30 characters")).toBeInTheDocument();
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
});

test('Title validation works for valid titles', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('title'), 'Valid title');
    expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    expect(screen.queryByText("A title can't be longer than 30 characters")).not.toBeInTheDocument();
});

test('Title validation works for protected keyword', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.clear(screen.getByTitle('title'));
    userEvent.type(screen.getByTitle('title'), 'Done');
    expect(screen.getByText('Done is a protected keyword - stories in this column will automatically be marked as completed')).toBeInTheDocument();
});

test('WIP validation not triggered for valid limit', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );
    userEvent.type(screen.getByTitle('WIP'), '1');

    expect(screen.getByTitle('WIP')).toHaveValue('21');
});

test('WIP validation works for non-numberical input', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('WIP'), 'letters');
    expect(screen.getByText('Please enter a positive integer, 0 means that no WIP limit will be applied')).toBeInTheDocument();
});

test('WIP validation works for negative input', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState}toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('WIP'), -1);
    expect(screen.getByText('Please enter a positive integer, 0 means that no WIP limit will be applied')).toBeInTheDocument();
});

test('Check story is properly loaded', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    expect(screen.queryByText('No Options Available')).not.toBeInTheDocument();
});

test('Check tick checkbox works', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    fireEvent.click(screen.getByTitle('mark_as_complete'));
    expect(screen.getByTitle('mark_as_complete')).toBeChecked();

    fireEvent.click(screen.getByTitle('mark_as_complete'));
    expect(screen.getByTitle('mark_as_complete')).not.toBeChecked();
});

test('Create Column should trigger an alert if the form is invalid', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('WIP'), -1);
    userEvent.clear(screen.getByTitle('title'));

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update Column'));
    expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Create Column not should trigger an alert if the form is valid', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} resetState={resetState} toggle={toggleModal} />
    );

    userEvent.type(screen.getByTitle('title'), 'Test value title');

    global.alert = jest.fn();
    fireEvent.click(screen.getByText('Update Column'));
});

test('Delete column triggers alert', async () => {
    render(
        <EditColumnForm team={team} user={user} non_completed_stories={non_completed_stories} epics={epics} column={column} toggle={toggleModal} />
    );
    var spyOnWindow = jest.spyOn(window,'confirm')

    fireEvent.click(screen.getByText('Delete Column'));
    expect(spyOnWindow).toHaveBeenCalledTimes(1);
    
});

