import React, { PureComponent } from "react"
import SharedButtons            from "../../SharedButtons"
import * as utils               from "../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, title, url, userPath, editPath, createdAt, showEditButton } = this.props
    const existAuthor = Object.keys(author).length > 0
    return (
      <div className="score-header">
        <div>
          <h1 className="title">{title}</h1>
          {existAuthor && (
            <a href={userPath} className="author-name">
              <figure className="image is-24x24">
                <img src={author.icon_url} alt={author.name} />
              </figure>
              <strong>@{author.name}</strong>
            </a>
          )}
          <p className="created-at">
            {utils.humanDateTime(createdAt, true)}
          </p>
        </div>
        <div>
          <SharedButtons url={utils.sharedUrl(url)} title={title} asShow />
          {showEditButton && (
            <a href={editPath} className="button is-primary is-medium">
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
              <span>edit</span>
            </a>
          )}
        </div>
      </div>
    )
  }
}
