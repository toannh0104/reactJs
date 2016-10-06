import React from 'react';
import Photo from './Photo';

const PhotoGrid = React.createClass({
    render() {
        console.log("Render PhotoGid")
        if (this.props.posts.length > 0) {
            return (
                <div className="photo-grid">
                    { this.props.posts.map((post, i) => <Photo {...this.props} key={i} i={i} post={post}/>)}
                </div>

            )
        }else{
            return (
                <div className="photo-grid">

                </div>

            )
        }
    }
});

export default PhotoGrid;
