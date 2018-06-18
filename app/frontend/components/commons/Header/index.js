import React, { PureComponent } from "react"
import classNames               from "classnames"
import { Link  }                from "react-router-dom"
import LoginModal               from "../LoginModal"
import Notification             from "../Notification"
import NotificationIcon         from "../Notification/NotificationIcon"
import * as path                from "../../../utils/path"
import * as utils               from "../../../utils"

export default class Header extends PureComponent {
  constructor(props) {
    super(props)
    const { notifications } = props
    this.state = {
      burger: false,
      isActiveLoginModal: false,
      isActiveNotification: false,
      notifications
    }
  }
  componentWillReceiveProps({ pathname, notifications }) {
    if (pathname !== this.props.pathname) this.setState({ burger: false })
    if (notifications !== this.state.notifications) this.setState({ notifications })
  }
  handleToggleBurger       = () => this.setState({ burger: !this.state.burger })
  handleToggleLoginModal   = () => this.setState({ isActiveLoginModal: !this.state.isActiveLoginModal })
  handleToggleNotification = () => this.setState({ isActiveNotification: !this.state.isActiveNotification })
  handleClearNotification  = () => (
    this.setState({ isActiveNotification: false, notifications: [] })
  )
  render() {
    const { burger, isActiveLoginModal, isActiveNotification, notifications } = this.state
    const { currentUser: { name, icon }, pathname } = this.props
    const userPath = path.user.show(name)
    const burgerClass = classNames("navbar-burger", "burger", { "is-active": burger })
    const navMenuClass = classNames("navbar-menu", { "is-active": burger })
    const navbarItemClass = (targetPath) => classNames("navbar-item", { "is-active": pathname === targetPath })

    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item title-logo">
              <h1 className="title is-4">
                <img src="/assets/images/logo_white.png" alt="rechord" />
                <span>rechord</span>
              </h1>
            </Link>
            <div className={burgerClass} onClick={this.handleToggleBurger} role="presentation">
              <span /><span /><span />
            </div>
          </div>

          <div className={navMenuClass}>
            <div className="navbar-start">
              <Link to={path.about} className={navbarItemClass(path.about)}>
                About
              </Link>
              <span className="navbar-item">
                <span style={{ opacity: 0.5 }}>FAQ</span>
              </span>
              <Link to={path.changelog} className={navbarItemClass(path.changelog)}>
                Changelog
              </Link>
            </div>

            <div className="navbar-end">
              {name && (
                <NotificationIcon
                  isActiveNotification
                  notifications={notifications}
                  handleToggleNotification={this.handleToggleNotification}
                />
              )}
              {name ? (
                <Link to={userPath} className={`${navbarItemClass(userPath)} current-user`}>
                  <span>
                    @{name}
                  </span>
                  <img src={utils.iconUrl(icon, "thumb")} className="user-icon" width={32} height={32} alt={name} />
                </Link>
              ) : (
                <div className="navbar-item">
                  <div className="field">
                    <div className="control">
                      <button
                        className="button is-primary is-inverted login-button"
                        onClick={this.handleToggleLoginModal}
                      >
                        <span className="icon">
                          <i className="fa fa-sign-in" />
                        </span>
                        <span>Login / Register</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!name && <LoginModal active={isActiveLoginModal} hideModal={this.handleToggleLoginModal} />}
            <Notification
              notifications={notifications}
              isActive={isActiveNotification}
              handleToggleNotification={this.handleToggleNotification}
              handleClearNotification={this.handleClearNotification}
            />
          </div>
        </div>
      </nav>
    )
  }
}
