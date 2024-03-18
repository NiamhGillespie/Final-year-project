/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddValueModal from '../../components/value_forms/add_value_modal';

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
    const { getByText } = render(<AddValueModal team={team} user={user} toggle={toggleModal} />);
    const column_exists = getByText('Add Value');

    expect(column_exists).toBeTruthy();
}); 

test('Loads modal', async () => {
    const { getByText } = render(<AddValueModal team={team} user={user} toggle={toggleModal} />);
    jest.fn()
    fireEvent.click(screen.getByText('Add Value'));

    const modal_submit_exists = getByText('Create Value');
    expect(modal_submit_exists).toBeTruthy();
});


