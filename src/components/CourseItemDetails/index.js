import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADIND',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class CourseItemDetails extends Component {
  state = {renderStatus: apiStatus.initial, data: []}

  componentDidMount() {
    this.getapiCallData()
  }

  getapiCallData = async () => {
    this.setState({renderStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const finalData = data.course_details
      const updatedData = {
        id: finalData.id,
        name: finalData.name,
        imgUrl: finalData.image_url,
        description: finalData.description,
      }
      this.setState({data: updatedData, renderStatus: apiStatus.success})
    } else {
      this.setState({renderStatus: apiStatus.failure})
    }
  }

  renderData = () => {
    const {data} = this.state
    return (
      <div className="course-details">
        <img className="course-image " src={data.imgUrl} alt={data.name} />
        <div className="course-text-container">
          <h1 className="course-heading">{data.name}</h1>
          <p className="course-description">{data.description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="course-loader">
      <Loader type="TailSpin" height={50} width={80} />
    </div>
  )

  renderWithSwitch = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderData()
      case apiStatus.failure:
        return <FailureView />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="courseItemDetails">
        <Navbar />
        {this.renderWithSwitch()}
      </div>
    )
  }
}
export default CourseItemDetails
