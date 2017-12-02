import React, { PureComponent } from "react"

export default class ShowUser extends PureComponent {
  render() {
    const { user: { screen_name, profile, site_url }, isOwn, handleToggleEdit } = this.props
    return (
      <div className="card-content">
        <h2 className="title is-4">
          {screen_name}
        </h2>
        <div className="content">
          {site_url && (
            <p className="url">
              <a href={site_url} target="_blank">
                <span className="icon">
                  <i className="fa fa-home" />
                </span>
                {site_url}
              </a>
            </p>
          )}
          <p className="profile">{profile}</p>
          {isOwn && (
            <div>
              <p>
                <a
                  className="button is-primary"
                  role="presentation"
                  style={{ display: "block" }}
                  onClick={handleToggleEdit}
                >
                  <span className="icon">
                    <i className="fa fa-pencil-square-o" />
                  </span>
                  <span>edit</span>
                </a>
              </p>
              <p>
                <a href="/logout" className="button" style={{ display: "block" }}>
                  <span className="icon">
                    <i className="fa fa-sign-out" />
                  </span>
                  <span>logout</span>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
