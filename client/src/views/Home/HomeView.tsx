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
            Update 9th Jan 2024: Work on this demo has just started so there is
            not much working right now. Please check back in the coming days and
            weeks to see this demo improve.
          </b>
        </p>
        <p>
          This is a very basic example of an application built with Django and
          React using{" "}
          <a href="https://djream.io" target="_blank">
            Djream
          </a>{" "}
          to connect them. It will eventually be a simple blogging app.
        </p>
        <p>
          This application is backed by Django views which provide the data and
          perform operations. The frontend is rendered with React using
          components from
          <a href="https://mui.com/" target="_blank">
            MUI
          </a>
          .
        </p>
        <p>
          Please browse around and have a look at the requests being made in
          your network tab to get an idea of how Djream is fetching the data
          from Django.
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
