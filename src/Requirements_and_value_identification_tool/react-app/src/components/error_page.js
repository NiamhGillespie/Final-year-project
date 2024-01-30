import { useRouteError } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function ErrorPage() {
    return (
        <div>
            <div className='error-number mb-0'> 404</div>

            <div className='error-text mt-0'> Page not found :(</div>
        </div>
    );
}
