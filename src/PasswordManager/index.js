import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    checkboxStatus: false,
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state

    const filteredPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredPasswordsList})
  }

  onChangeSearchInput = event => {
    const {passwordsList} = this.state
    const searchInput = event.target.value
    console.log(searchInput)
    const filteredSearchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({passwordsList: filteredSearchResults})
    console.log(filteredSearchResults)
  }

  onClickAddButton = () => {
    const {passwordsList} = this.state
    const filteredCommentsList = passwordsList.filter(
      eachPassword => eachPassword.isShowPassword === true,
    )
    this.setState({
      passwordsList: filteredCommentsList,
    })
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      checkboxStatus,
    } = this.state

    const initialClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newPassword = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
        isShowPassword: true,
        initialBackgroundClassName: initialClassName,
        isChecked: checkboxStatus,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderInputForm = () => (
    <form
      className="add-new-password-container"
      onSubmit={this.onAddNewPassword}
    >
      <h1 className="add-new-password-heading">Add New Password</h1>
      <div className="input-text-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
          alt="website"
          className="website-image"
        />
        <input
          type="text"
          className="input-text"
          placeholder="Enter Website"
          onChange={this.onChangeWebsite}
        />
      </div>
      <div className="input-text-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
          alt="username"
          className="website-image"
        />
        <input
          type="text"
          className="input-text"
          placeholder="Enter Username"
          onChange={this.onChangeUsername}
        />
      </div>
      <div className="input-text-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
          alt="password"
          className="website-image"
        />
        <input
          type="password"
          className="input-text"
          placeholder="Enter Password"
          onChange={this.onChangePassword}
        />
      </div>
      <div className="add-button-container">
        <button
          type="submit"
          className="add-button"
          onClick={this.onClickAddButton}
        >
          Add
        </button>
      </div>
    </form>
  )

  renderNoPasswordContainer = () => {
    const {passwordsList, checkboxStatus} = this.state
    const passwordsListLength = passwordsList.length

    const renderNoPasswordImage = () => (
      <div className="no-password-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-image"
        />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    )

    const renderPasswordsList = () =>
      //   const {passwordsList} = this.state
      passwordsList.map(eachPassword => (
        <PasswordItem
          key={eachPassword.id}
          passwordDetails={eachPassword}
          onDeletePassword={this.onDeletePassword}
        />
      ))

    let newList
    const renderNewList = () => {
      if (passwordsListLength > 0) {
        newList = renderPasswordsList()
      } else {
        newList = renderNoPasswordImage()
      }
      return newList
    }

    console.log(checkboxStatus)

    const onChangeCheckboxStatus = event => {
      if (event.target.checked) {
        this.setState({checkboxStatus: true})
      } else {
        this.setState({checkboxStatus: false})
      }
    }

    return (
      <div className="no-password-container">
        <div className="header">
          <div className="password-count-container">
            <h1 className="your-password-heading">Your Passwords</h1>
            <p className="passwords-count">{passwordsListLength}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
              alt="search"
              className="search-icon"
            />
            <input
              type="Search"
              className="search-bar"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <hr className="hor-rule" />

        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={onChangeCheckboxStatus}
          />
          <label htmlFor="checkbox" className="show-password-text">
            Show passwords
          </label>
        </div>
        <ul className="unordered-list-container">{renderNewList()}</ul>
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inputs-container">
          {this.renderInputForm()}
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>
        {this.renderNoPasswordContainer()}
      </div>
    )
  }
}
export default PasswordManager
