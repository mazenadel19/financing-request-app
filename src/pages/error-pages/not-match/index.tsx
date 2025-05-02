import { Link } from 'react-router-dom'

function NoMatch() {
    return (
        <section>
            <h1>Are you lost?</h1>
            <Link to="/">
                <p>Go back to the home page</p>
            </Link>
        </section>
    )
}

export default NoMatch
