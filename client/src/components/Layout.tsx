import { Link } from "@djream/core";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
`;

const Sidebar = styled.div`
  background-color: #535bf2;
  color: white;
  width: 150px;
  display: flex;
  flex-flow: column;
`;

const Logo = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 20px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  box-sizing: border-box;
  background-color: rgba(1, 1, 1, 0);
  transition: background-color 0.5s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Menu = styled.ul`
  width: 100%;
`;

const MenuItem = styled.li`
  width: 100%;

  > a {
    display: block;
    padding: 10px;
    width: 100%;
    text-decoration: none;
    color: white;
    box-sizing: border-box;
    background-color: rgba(1, 1, 1, 0);
    transition: background-color 0.5s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Body = styled.div`
  width: 100%;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Wrapper>
      <Sidebar>
        <Logo href="/">Djreampress</Logo>
        <Menu>
          <MenuItem>
            <Link href="/posts/">Posts</Link>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Body>{children}</Body>
    </Wrapper>
  );
}
