//CommentList.js
import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
        return (
            <Comment 
                author={ comment.author }
                key={ comment['_id'] }
                uniqueID={ comment['_id'] }
                onCommentDelete={ this.props.onCommentDelete }
                onCommentUpdate={ this.props.onCommentUpdate }>
                { comment.text}
            </Comment>
        )
        })
        return (
            <div class="columns is-gapless is-multiline is-mobile" style={ style.commentList }>
                { commentNodes }
            </div>
        )
    }
}

export default CommentList;