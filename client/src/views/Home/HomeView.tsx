import styled from "styled-components";

import Layout from "../../components/Layout";

const HomeWrapper = styled.div`
  padding: 20px;

  h1 {
    font-weight: 700;
    font-size: 1.5em;
    margin-bottom: 2em;
  }

  p {
    margin-bottom: 1em;
    max-width: 600px;
    line-height: 1.5em;
  }

  b {
    font-weight: 700;
  }
`;

export default function HomeView() {
  return (
    <Layout>
      <HomeWrapper>
        <h1>Welcome to Djreampress!</h1>
        <p>
          <b>
            Update 9th Jan 2024: I have just started building this, and I'm
            pushing changes as I make them so not much is working right now :).
            Please check back in the coming days and weeks to see this demo
            improve.
          </b>
        </p>
        <p>
          This is a very basic example of an application built with Djream. It's
          tiny blogging app that is built with Django and React using Djream as
          the glue.
        </p>
        <p>
          All of this application is backed by Django views which provide the
          data and perform operations. The frontend is rendered entirely with
          React using components from MUI.
        </p>
        <p>
          Please browse around and have a look at the requests being made in
          your network tab to get an idea of how Djream is fetching the data
          from Django. Sorry for the looks, I'm not a great designer!
          (contibutions would be very welcome)
        </p>
        <p style={{ marginTop: "2em" }}>
          <b>
            <a href="https://github.com/kaedroho/djreampress" target="_blank">
              See the source code
            </a>
          </b>
        </p>
      </HomeWrapper>
    </Layout>
  );
}
