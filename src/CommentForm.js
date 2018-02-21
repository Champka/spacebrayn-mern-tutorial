//CommentForm.js
import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
 
    handleSubmit(e) {
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }

    render() {
        return (
            <section class="section">
                <div class="container">
                    <h1 class="title">Add a comment</h1>
                    <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                        <div class="field">
                            <label>Name</label>
                            <div class="controls">
                                <input
                                    class="input"
                                    type='text'
                                    placeholder='Your name…'
                                    style={ style.commentFormAuthor}
                                    value={ this.state.author }
                                    onChange={ this.handleAuthorChange } />
                            </div>
                        </div>
                        <div class="field">
                            <label>Name</label>
                            <div class="controls">
                                <input
                                    class="input"
                                    type='text'
                                    placeholder='Say something…'
                                    style={ style.commentFormText}
                                    value={ this.state.text }
                                    onChange={ this.handleTextChange } />
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <input
                                    class="button is-link"
                                    type='submit'
                                    style={ style.commentFormPost }
                                    value='Post' />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default CommentForm;