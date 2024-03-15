/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DeleteValueModal from '../../components/value_forms/delete_value_modal';

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
const value = {
    "id": 25,
    "tag_id": "25",
    "team_id": "34",
    "title": "Test value",
    "description": "",
    "sub_values": [],
    "colour": "1e00ff"
}

test('Loads modal button', async () => {
    const { getByText } = render(<DeleteValueModal team={team} user={user} value={value} toggle={toggleModal} />);
    const column_exists = getByText('Delete');

    expect(column_exists).toBeTruthy();
});

test('Loads modal', async () => {
    const { getByText } = render(<DeleteValueModal team={team} user={user} value={value} toggle={toggleModal} />);

    fireEvent.click(screen.getByText('Delete'));

    const modal_check_exists = getByText('Are you sure you want to permenantly delete this value?');
    expect(modal_check_exists).toBeTruthy();
});

test('Check delete runs', async () => {
    const { getByText } = render(<DeleteValueModal team={team} user={user} value={value} toggle={toggleModal} />);
    
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByTitle('delete_button'));

    const modal_check_exists = getByText('Are you sure you want to permenantly delete this value?');
    expect(modal_check_exists).toBeTruthy();
});


