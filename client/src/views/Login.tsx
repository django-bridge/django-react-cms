import React, { ReactElement } from "react";
import { Form } from "@django-render/core";
import styled from "styled-components";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Button, Typography } from "@mui/joy";

import { CSRFTokenContext } from "../contexts";
import FormDef from "../deserializers/Form";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #00246B;
  width: 100vw;
  height: 100vh;
`;

const LoginWrapper = styled.div`
    width: 24rem;
    border-radius: 0.5rem;
    padding: 2.5rem;
    background-color: white;

    h2 {
      color: #333;
      font-weight: 800;
      font-size: 1.5rem;
      line-height: 2rem;
    }
`;

const AlternativeSignIn = styled.div`
  padding: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--joy-palette-neutral-300);

  a:hover {
    text-decoration: none;
  }
`;

const Space = styled.div`
  flex-grow: 1;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

interface LoginViewContext {
  form: FormDef;
  actionUrl: string;
  tempActionUrl: string;
}

function LoginView({
  form,
  actionUrl,
  tempActionUrl
}: LoginViewContext): ReactElement {
  const csrfToken = React.useContext(CSRFTokenContext);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Wrapper>
        <Space />
        <LoginWrapper>
          <Typography level="h4" component="h1" fontWeight={700}>Sign in to Djangopress</Typography>

          <AlternativeSignIn>
            <Form action={tempActionUrl} method="post" noValidate>
              <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
              <Button type="submit">Sign in with a temporary account</Button>
            </Form>
          </AlternativeSignIn>

          <Form action={actionUrl} method="post" noValidate>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

            {form.render({ hideRequiredAsterisks: true })}

            <SubmitButtonWrapper>
              <Button type="submit">Sign in</Button>
            </SubmitButtonWrapper>
          </Form>
        </LoginWrapper>
        <Space />
      </Wrapper>
    </CssVarsProvider>
  );
}
export default LoginView;
