/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditValueModal from '../../components/value_forms/edit_value_modal';

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
const tag = {
    "id": 25,
    "tag_id": "25",
    "team_id": "34",
    "title": "Test value",
    "description": "",
    "colour": "1e00ff"
}
 
test('Loads modal button', async () => {
    const { getByText } = render(<EditValueModal team={team} user={user} value={tag} toggle={toggleModal} />);
    const tag_exists = getByText('Test value');

    expect(tag_exists).toBeTruthy();
});

test('Loads modal', async () => {
    const { getByText } = render(<EditValueModal team={team} user={user} value={tag} toggle={toggleModal} />);

    fireEvent.click(screen.getByText('Test value'));

    const modal_check_exists = getByText('Update Value');
    expect(modal_check_exists).toBeTruthy();
});


