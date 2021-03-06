import React from "react";

const Error = () => {
  return (
    <section className="hero is-medium  is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-centered">
            <div className="column is-6 pt-6">
              <h1 className="title" style={{ fontSize: "5rem" }}>
                Oops!
              </h1>
              <h3 className="subtitle">
                We can't seem to find the page you're looking for
              </h3>
              <button className="button is-rounded is-primary">Contact Us</button>
            </div>
            <div className="column is-6 pb-7">
              <img src="/assets/404.png" alt="Page not found" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
