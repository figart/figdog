module.exports={
    plugins: [
        {
            resolve: 'figdog-theme',
            options: {
                siteTitle: 'Figdog',
                siteSlogan: 'PERSPECTIVES ON MARKETING AND MANAGED IT SERVICES',
                topMenuLinks:[
                    {
                       name:'figdog',
                       link:'/'
                    },
                    {
                        name:'',
                        link:'www.twitter.com',
                        icon: 'fab fa-twitter'
                     },
                     {
                        name:'',
                        link:'www.rss.com',
                        icon: 'fas fa-rss'
                     },
                     {
                        name:'',
                        link:'www.linkedin.com',
                        icon: 'fab fa-linkedin-in'
                     },
                ],
                colors:{
                    primary: '#f03838',
                    darkGray: "#424242",
                    darkDarkGray: "#303030"
                },
                breakpoints:{
                    mobileWidth:`600px`,
                    tabletWidth:`700px`,
                    desktopWidth:`889px`
                }
            }
        }
    ]
}