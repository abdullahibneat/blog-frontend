import React from "react"

const NewBlogForm = ({ onSubmitForm, title, onChangeTitle, author, onChangeAuthor, URL, onChangeURL }) => <div>
    <h2>Create new</h2>
    <form onSubmit={onSubmitForm}>
        <div>Title: <input type="text" name="title" value={title} onChange={onChangeTitle} /></div>
        <div>Author: <input type="text" name="author" value={author} onChange={onChangeAuthor} /></div>
        <div>URL: <input type="text" name="url" value={URL} onChange={onChangeURL} /></div>
        <button type="submit">create</button>
    </form>
</div>

export default NewBlogForm