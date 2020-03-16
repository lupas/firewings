module.exports = {
  title: 'Firewings',
  description: "Useful helper-functions for Firebase's JS SDK.",
  themeConfig: {
    heroImage: '/firewings_logo.png',
    logo: '/firewings_logo.png',
    repo: 'lupas/firewings',

    sidebar: {
      '/basics/': [
        {
          title: 'Basics', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 3, // optional, defaults to 1
          children: [
            '/basics/introduction/',
            '/basics/getting-started/',
            '/basics/typescript/'
          ]
        }
      ],
      '/functions/': [
        {
          title: 'Functions', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 2, // optional, defaults to 1
          children: ['/functions/firestore/']
        }
      ],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Basics', link: '/basics/introduction/' },
      { text: 'Functions', link: '/functions/firestore/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
