import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Container from "../../components/container";
import TopMenuLinks from "../../components/organisms/topmenulinks";
import * as variable from "../../components/variables.js";
import bg from "../../images/bg.png";
import { Global, css } from "@emotion/core";

const HeaderStyle = styled.header``;

export const Header = ({ menuLinks, topMenuLinks, footerMenuLinks }) => {
  return (
    <HeaderStyle className="fig-header">
      <Global
        styles={css`
          .fig-header {
            background-image: url(${bg});
            background-position: center;
            background-size: 1150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 34px 0px 15px 0px;
            background-color: white;
            @media (max-width: ${variable.tabletWidth}) {
              background-image: none;
            }
          }
          .dark {
            .fig-header {
              background-color: ${variable.darkBlue};
            }
          }
        `}
      />
      <Container className="header-menu-logo">
        <TopMenuLinks
          topMenuLinks={topMenuLinks}
          menuLinks={menuLinks}
          footerMenuLinks={footerMenuLinks}
        ></TopMenuLinks>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
