/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTagModal from '../../components/tag_forms/add_tag_modal';

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

test('Loads modal button', async () => {
    const { getByText } = render(<AddTagModal team={team} user={user} toggle={toggleModal} />);
    const column_exists = getByText('Add Tag');

    expect(column_exists).toBeTruthy();
});
 
test('Loads modal', async () => {
    const { getByText } = render(<AddTagModal team={team} user={user} toggle={toggleModal} />);
    jest.fn()
    fireEvent.click(screen.getByText('Add Tag'));

    const modal_submit_exists = getByText('Create Tag');
    expect(modal_submit_exists).toBeTruthy();
});


