import './PostReview.css'

// Novi-backend does not support this.
// Unfinished!

function PostReview() {

    function handleSubmit() {

    }

    return (
        <div className="form-page">
            <form className="request-offer" onSubmit={handleSubmit}>
                <label htmlFor="project">Project</label>
                <input/>
                <label htmlFor="name">Name</label>
                <input/>
                <label htmlFor="review">Review</label>
                <textarea
                    name="review"
                    id="review-field"
                    cols="30" rows="10">
                    </textarea>
                <div className="send-button-container">
                    <button type="submit" className="send-button">Send</button>
                </div>
            </form>
        </div>
    )
}

export default PostReview