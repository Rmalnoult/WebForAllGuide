// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-27',

  // Application configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://webforallguide.com/' }
      ],
      meta: [
        { name: 'theme-color', content: '#4C6EF5' },
        { name: 'author', content: 'Romain Malnoult' },
        { name: 'robots', content: 'index, follow' }
      ],
      style: [
        {
          children: `
            :root {
              --color-bg: #ffffff;
              --color-bg-secondary: #F2F5F8;
              --color-text: #122940;
              --color-border: #e2e8f0;
              --color-sidebar-bg: #0C0C0C;
              --color-sidebar-text: #FFFFFF;
            }
            body {
              margin: 0;
              background: var(--color-bg);
              color: var(--color-text);
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .app { min-height: 100vh; display: flex; }
            .app-sidebar {
              width: 280px;
              background: var(--color-sidebar-bg);
              color: var(--color-sidebar-text);
              border-right: 1px solid var(--color-border);
            }
            .app-main { flex: 1; }
          `,
          type: 'text/css'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Guide Pratique de l\'Accessibilité Web',
            description: 'Guide interactif pour apprendre l\'accessibilité web selon les normes WCAG',
            url: 'https://webforallguide.com/',
            author: {
              '@type': 'Person',
              name: 'Romain Malnoult',
              jobTitle: 'Tech Lead Design System & Accessibilité',
              url: 'https://www.linkedin.com/in/romainmalnoult/'
            },
            inLanguage: 'fr-FR',
            keywords: 'accessibilité web, WCAG, a11y, ARIA, HTML sémantique, navigation clavier',
            about: {
              '@type': 'Thing',
              name: 'Accessibilité Web',
              description: 'Pratiques et normes pour rendre le web accessible à tous'
            }
          })
        }
      ]
    },
    pageTransition: false,
    layoutTransition: false,
    spaLoadingTemplate: 'app/spa-loading-template.html'
  },

  // SSR configuration
  ssr: true,

  // CSS configuration
  css: [
    '~/assets/styles/variables.css',
    '~/assets/styles/global.css'
  ],

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: '@import "~/assets/styles/variables.css";'
        }
      }
    }
  },

  // Development configuration
  devtools: { enabled: true },

  // Modules
  modules: ['@nuxtjs/i18n', '@nuxtjs/plausible'],

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'fr'
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false
    }
  },

  // Plausible Analytics configuration
  plausible: {
    domain: 'webforallguide.com',
    // Ignorer localhost et les domaines de développement
    ignoredHostnames: ['localhost', '127.0.0.1'],
    // Auto-track les pages vues
    autoPageviews: true,
    // Auto-track les clics sortants
    autoOutboundTracking: true
  },

  // Nitro configuration for static generation
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        // French routes (default, no prefix)
        '/',
        '/semantic-html',
        '/keyboard-navigation',
        '/media-accessible',
        '/color-contrast',
        '/accessible-forms',
        '/aria-components',
        '/performance',
        // English routes (with /en prefix)
        '/en',
        '/en/semantic-html',
        '/en/keyboard-navigation',
        '/en/media-accessible',
        '/en/color-contrast',
        '/en/accessible-forms',
        '/en/aria-components',
        '/en/performance'
      ],
      ignore: ['/about', '/contact', '/profile', '/semantic-h-t-m-l', '/a-r-i-a-components'],
      failOnError: false
    }
  },

  // Router configuration
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
