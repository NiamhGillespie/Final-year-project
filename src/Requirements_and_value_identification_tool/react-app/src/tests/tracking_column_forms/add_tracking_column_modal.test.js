/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddColumnModal from '../../components/tracking_column_forms/add_tracking_column_modal';

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
const non_completed_stories=[];
const epics=[];
const column={
    "id": 59,
    "column_id": "59",
    "dashboard_id": "0000",
    "team_id": "34",
    "title": "Backlog",
    "mark_as_complete": false,
    "stories": [],
    "story_list": "",
    "WIP": 0
}
const toggleModal = jest.fn();

test('Loads modal button', async () => {
    const { getByText } = render(<AddColumnModal team={team} user={user} non_completed_stories={non_completed_stories}
        epics={epics} column={column} toggle={toggleModal} />);
    const column_exists = getByText('Add Column');

    expect(column_exists).toBeTruthy();
});

test('Loads modal', async () => {
    const { getByText } = render(<AddColumnModal team={team} user={user} non_completed_stories={non_completed_stories}
        epics={epics} column={column} toggle={toggleModal} />);
    jest.fn()
    fireEvent.click(screen.getByText('Add Column'));

    const modal_title_exists = getByText('Add Tracking Column');
    expect(modal_title_exists).toBeTruthy();
});

 
