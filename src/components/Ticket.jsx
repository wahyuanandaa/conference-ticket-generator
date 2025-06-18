import logoMark from "../assets/images/logo-mark.svg"
import iconGithub from "../assets/images/icon-github.svg"
import defaultAvatar from "../assets/images/image-avatar.jpg"

export default function Ticket({ userData }) {
  const generateTicket = () => {
    return Math.floor(Math.random() * 100000) + 100000
  }

  return (
    <div className="ticket active">
      <div className="ticket__left">
        <header className="ticket__header">
          <div className="ticket__header-left">
            <img className="ticket__logo" src={logoMark} alt="logo" />
          </div>
          <div className="ticket__header-right">
            <h3 className="ticket__title">Coding Conf</h3>
            <span className="ticket__date">Jan 31, 2025 / Austin, TX</span>
          </div>
        </header>
        <footer className="ticket__footer">
          <img
            className="ticket__avatar"
            src={userData.avatar || defaultAvatar}
            alt="avatar"
          />
          <div className="ticket__footer-content">
            <h3 className="ticket__name">{userData.name}</h3>
            <div className="ticket__social">
              <img className="ticket__icon" src={iconGithub} alt="github" />
              <span className="ticket__github">{userData.github}</span>
            </div>
          </div>
        </footer>
      </div>
      <div className="ticket__right">
        <span className="ticket__number">#{generateTicket()}</span>
      </div>
    </div>
  )
}
