import { Link } from 'gatsby'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Container from 'figdog-theme/src/components/container'
import * as variable from 'figdog-theme/src/components/variables.js'
import ThemeContext from 'figdog-theme/src/components/context/ThemeContext'


const Nav = styled.nav`
    width:100%;
    color:white;
    button{
        cursor:pointer;
        font-weight:600;
        display: flex;
        align-items: center;
        justify-content:space-between;
        -webkit-appearance: none;
        border:0px;
        background-color:transparent;
        color:white;
        &:focus{
            outline:0px;
        }
        span{
            color:white;
            display: flex;
            align-items: center;
            justify-content:space-between;
            font-family: 'Poppins', sans-serif;
            font-size:18px;
            margin-left:10px;
            font-weight:600;
            span{
                color:#498F27;
            }
        }
    }
    color:white;
    i{
        cursor:pointer;
        color:#3169AC;
        font-size:32px;
        margin-left:15px;
    }
    img{
        width:136px;
    }
    ul{
        display:flex;
        justify-content:space-between;
        margin:0px;
        padding:0px;
        li{
            display: flex;
            align-items: center;
            list-style:none;
            margin-right:10px;
            &:last-child{
                margin-right:0px;
            }
            a{
                display: flex;
                align-items: center;
                color:white;
                text-decoration:none;
                text-transform:uppercase;
                font-size:18px;
                font-weight:500;
                &:hover{

                }
            }
        }
    }
    @media (max-width: ${variable.tabletWidth}) {
        display:none !important;
    }
`

const FooterMenuLinks = ({footerMenuLinks}) => {

    return(
        <Nav>
        <Container>
        <ul>
          {footerMenuLinks.map((menuitem, index) =>(
            <li key={index}><Link to={menuitem.link}>{menuitem.name}{menuitem.icon != null && <i class={menuitem.icon}></i>}</Link></li>
          ))}
      <li className="dark-mode">
      <ThemeContext.Consumer>
            {theme => (
          <button className="dark-switcher" onClick={theme.toggleDark}>
          <span className="dark-title">DARK MODE</span><span className="dark-icon"></span>
      </button>
        )}
           </ThemeContext.Consumer> 
      </li>
        </ul>
        </Container>
        </Nav>
    )

}

      


export default FooterMenuLinks