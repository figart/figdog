module.exports={
    plugins: [
        {
            resolve: 'figdog-theme',
            options: {
                siteTitle: 'Figdog',
                siteSlogan: 'PERSPECTIVES ON MARKETING AND MANAGED IT SERVICES',
                logo:'/images/Logo-White.png',
                topMenuLinks:[
                    {
                        name:'DARK MODE',
                        link:'#',
                        icon: 'fas fa-toggle-on'
                    }
                ],
                footerMenuLinks:[
                    {
                        name:'ABOUT',
                        link:'/about',
                     },
                     {
                        name:'FOLLOW ME',
                        link:'www.twitter.com',
                     },
                     {
                        name:'ARCHIVE',
                        link:'/archive',
                     },
                     {
                        name:'CONTACT',
                        link:'/contact',
                     },
                ],
                colors:{
                    primary: '#1C3B61',
                    darkGray: "#424242",
                    darkDarkGray: "#303030",
                    lightGray: "#C4C4C4",
                    cream: "#061836",
                    gold: "#EBBA7D",
                    orange: "#DE6936",
                    red: "#BF0F0F",
                    darkBlue: "#061836"

                },
                breakpoints:{
                    mobileWidth:`611px`,
                    tabletWidth:`611px`,
                    desktopWidth:`612px`
                }
            }
        }
    ]
}