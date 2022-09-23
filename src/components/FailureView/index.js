import {Link} from 'react-router-dom'

import './index.css'

const FailureView = () => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      alt="failure view"
    />
    <h1 className="failure-heading ">Oops! Something Went Wrong</h1>
    <p className="failure-paragraph">
      We cannot seem to find the page you are looking for.
    </p>
    <Link to="/">
      <button className="retry-button" type="button">
        Retry
      </button>
    </Link>
  </div>
)
export default FailureView
