import './RequestOffer.css'

function RequestOffer() {

    function handleSubmit() {

    }

    return (
        <div className="form-page">
            <form className="request-offer" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input/>
                <label htmlFor="company-name">Company</label>
                <input/>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description-field"
                    cols="30" rows="10">
                    </textarea>
                <div className="send-button-container">
                    <button type="submit" className="send-button">Send</button>
                </div>
            </form>
        </div>
    )
}

export default RequestOffer;