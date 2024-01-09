import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    width: 100vw;
`;

const Header = styled.div`
    background-color: #535bf2;
    color: white;
    padding: 20px;
`;

const Logo = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;


const Body = styled.div`
    padding: 20px;

    h1 {
        font-weight: 700;
        font-size: 1.5em;
        margin-bottom: 20px;
    }
`;


export default function Layout({children}: React.PropsWithChildren) {
    return <Wrapper>
        <Header>
            <Logo>Djreampress</Logo>
        </Header>
        <Body>{children}</Body>
    </Wrapper>
}
