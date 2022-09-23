import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, data: []}

  componentDidMount() {
    this.apiCall()
  }

  apiCall = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    this.setState({apiStatus: apiConstants.loading})
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({data: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <ul className="ul-background">
        {data.map(eachItem => (
          <Link className="home-link" to={`/courses/${eachItem.id}`}>
            <li className="list-item" key={eachItem.id}>
              <img
                className="language-icon"
                alt={eachItem.name}
                src={eachItem.logoUrl}
              />
              <p>{eachItem.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="TailSpin" height={50} width={80} />
    </div>
  )

  rederBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return <FailureView />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="homepage-background">
        <Navbar />
        <h1 className="courses-heading">Courses</h1>
        {this.rederBasedOnApiStatus()}
      </div>
    )
  }
}
export default Home
