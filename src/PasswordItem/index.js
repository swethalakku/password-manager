import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword} = props
  const {
    id,
    website,
    username,
    initialBackgroundClassName,
    isChecked,
  } = passwordDetails

  const passwords = passwordDetails.password

  const onClickDelete = () => {
    onDeletePassword(id)
  }

  const initial = website.slice(0, 1).toUpperCase()
  return (
    <li className="list-container">
      <h1 className={`initial ${initialBackgroundClassName}`}>{initial}</h1>
      <div className="container">
        <p>{website}</p>
        <p>{username}</p>
        {isChecked ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        ) : (
          <p>{passwords}</p>
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordItem
