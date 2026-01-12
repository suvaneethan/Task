function Contact() {
    return (
        <div className="container mt-4">
            <h1>Contact Us</h1>

            <form>
                <input placeholder="Name" /><br />
                <input placeholder="Email" /><br />
                <textarea placeholder="Message"></textarea><br />
                <button>Submit</button>
            </form>

            <p>Address: Spixworth, UK</p>
            <p>Phone: 01234 567890</p>

            <div className="mt-4">
                <h5>Find Us</h5>
                <div
                    style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6c757d"
                    }}
                >
                    Map Placeholder
                </div>
            </div>

        </div>
    );
}

export default Contact;
