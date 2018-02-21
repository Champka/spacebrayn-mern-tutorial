//Comment.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            author: '',
            text: ''
        }

        //binding all our functions to this class
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }

    updateComment(e) {
        e.preventDefault();
        this.setState({
            //brings up the update field when we click on the update link
            toBeUpdated: !this.state.toBeUpdated
        });
    }

    handleCommentUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;

        let comment = { author: author, text: text };

        this.props.onCommentUpdate(id, comment);

        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            text: ''
        })
    }

    deleteComment(e) {
        e.preventDefault();

        let id = this.props.uniqueID;
        this.props.onCommentDelete(id);

        console.log('oops deleted');
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
 
    render() {
        return (
            <div class="column">
                <div class="card">
                    <div class="card-content" style={ style.comment }>
                        <h3 class="title">{this.props.author}</h3>
                        <span class="subtitle" dangerouslySetInnerHTML={ this.rawMarkup() } />
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            <a class="button is-primary" style={ style.updateLink } href='#' onClick={ this.updateComment }>update</a>
                        </div>
                        <div class="card-footer-item">
                            <a class="button is-danger" style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>
                        </div>
                    </footer>
                    <footer class="card-footer">
                        <div class="card-footer_item">
                            {   (this.state.toBeUpdated)
                            ? (
                                <div class="card-footer-item">
                                    <form onSubmit={ this.handleCommentUpdate }>
                                        <div class="field">
                                            <label class="label">Name</label>
                                            <div class="control">
                                                <input class="input" type='text' placeholder='Update name…' style={ style.commentFormAuthor } value={ this.state.author } onChange= { this.handleAuthorChange } />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Comment</label>
                                            <div class="control">
                                                <input class="input" type='text' placeholder='Update your comment…' style= { style.commentFormText } value={ this.state.text } onChange={ this.handleTextChange } />
                                            </div>
                                        </div>
                                        <div class="field is-grouped">
                                            <div class="control">
                                                <input class="button is-primary" type='submit' style={ style.commentFormPost } value='Update' />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                            : null}
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Comment;