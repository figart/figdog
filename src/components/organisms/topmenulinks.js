import { Link } from 'gatsby'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Container from 'figdog-theme/src/components/container'
import MobileMenu from 'figdog-theme/src/components/organisms/mobilemenu'
import * as variable from 'figdog-theme/src/components/variables.js'
import { Global, css } from "@emotion/core"
import ThemeContext from 'figdog-theme/src/components/context/ThemeContext'


const Nav = styled.nav`
    .mobile-menu-list{
        display:none;
    }
    @media (max-width: ${variable.tabletWidth}) {
        .mobile-menu-list{
            display:block;
        }
        .dark-mode{
            display:none;
        }
    }
    width:100%;
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
        width:135px;
    }
    ul{
        display:flex;
        justify-content:space-between;
        align-items: center;
        margin:0px;
        padding:0px;
        li{
            display: flex;
            align-items: center;
            list-style:none;
            margin-right:0px;
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
                &:hover{

                }
            }
        }
    }

`

const TopMenuLinks = ({footerMenuLinks}) => {

    return(

        <Nav className="top-menu">
            <Global
                styles={css`
                .main-links-container {
                    display:inline-flex;
                    li:last-child{
                        margin-left:40px;
                    }
                }
                .top-menu{
                    .logodark{
                        display:none;
                    }
                }
                .dark-switcher{
                    .dark-title:after{
                        content:'\f204';
                        font-family: "Font Awesome 5 Free";
                        font-size:32px;
                        margin-left:15px;
                        color:#3169AC;
                    }
                    .dark-icon:after{
                        content:'OFF';
                        color:white;
                        width: 35px;
                    }
                }
                .dark{
                    .dark-icon:after{
                        content:'ON';
                        color:#498F27;
                    }
                    .dark-switcher{
                        .dark-title:after{
                            content:'\f205';
                        }
                        span{
                            color:#3169AC;
                            span{
                                color:#3169AC;
                            }
                        }
                    }
                }
                @media (max-width: ${variable.tabletWidth}) {
                    .main-links-container{
                        display:none !important;
                    }
                    .top-menu{
                        .logodark{
                            display:block;
                        }
                        .logowhite{
                            display:none;
                        }
                    }
                    .dark{
                        .top-menu{
                            .logodark{
                                display:none;
                            }
                            .logowhite{
                                display:block;
                            }
                        }
                    }
                }
                `}
            />
        <ul>
            <li className="logo logowhite"><Link to="/"><img src={variable.logo}/></Link></li>
            <li className="logo logodark"><Link to="/"><img src={variable.logodark}/></Link></li>
        <div className="main-links-container">
            {footerMenuLinks.map((menuitem, index) =>(
            <li key={index}><Link to={menuitem.link}>{menuitem.name}{menuitem.icon != null && <i class={menuitem.icon}></i>}</Link></li>
          ))}
          </div>
      <li className="mobile-menu-list">
      <MobileMenu className="mobile-menu"></MobileMenu>
      </li>
        </ul>
        
        </Nav>
        
    )

}

      


export default TopMenuLinks