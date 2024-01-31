import { Component } from 'react';

export class UnauthorisedPage extends Component {
    render() {
        return (
            <>
                <div className="unauthorised-header mb-0"> Unauthorised</div>

                <div className="error-text mt-0"> You do not have permission to view this resource</div>
            </>
        );
    }
}

export default UnauthorisedPage;
