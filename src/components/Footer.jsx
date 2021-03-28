import React from 'react'

const Footer = () => {

    return (
        <footer className="footer has-background-warning has-text-white" style={{paddingBottom: 48}}>
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column">
                            <p>Copyright BooksRUs 2021.</p>
                        </div>
                        <div className="column has-text-right">
                            <i className="fab fa-facebook"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-google-plus"></i>
                            <i className="fab fa-linkedin"></i>
                        </div>
                    </div>
                </div>
        </footer>
    )
}

export default Footer