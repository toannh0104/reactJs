import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Photo = React.createClass({
	
  render() {
    const { post, i, comments } = this.props;
    console.log("Render Photo")
	var href = post._links.self.href;
	var id = href.substr(href.lastIndexOf("/")+1, href.length);
	
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/view/${id}`}>
            <img src={post.image} alt={post.title} className="grid-photo" />
          </Link>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.title}</p>
          <div className="control-buttons">
            <button onClick={this.props.increment.bind(null, i, href)} className="likes">&hearts; {post.likes}</button>
            <Link className="button" to={`/view/${id}`}>
              <span className="comment-count">
                <span className="speech-bubble"></span>
                {comments[id] ? comments[id].length : 0 }
              </span>
            </Link>
          </div>
        </figcaption>

      </figure>
    )
  }
});

export default Photo;
