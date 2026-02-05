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
  modules: [
    'nuxt-gtag','@nuxtjs/i18n', '@nuxtjs/plausible'],

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID || '',
    enabled: !!process.env.GOOGLE_ANALYTICS_ID
  },

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
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano',
        file: 'it.json'
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.json'
      },
      {
        code: 'nl',
        iso: 'nl-NL',
        name: 'Nederlands',
        file: 'nl.json'
      },
      {
        code: 'ar',
        iso: 'ar',
        name: 'العربية',
        file: 'ar.json',
        dir: 'rtl'
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
        file: 'ja.json'
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
        file: 'pt.json'
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
        '/en/performance',
        // Spanish routes (with /es prefix)
        '/es',
        '/es/semantic-html',
        '/es/keyboard-navigation',
        '/es/media-accessible',
        '/es/color-contrast',
        '/es/accessible-forms',
        '/es/aria-components',
        '/es/performance',
        // Italian routes (with /it prefix)
        '/it',
        '/it/semantic-html',
        '/it/keyboard-navigation',
        '/it/media-accessible',
        '/it/color-contrast',
        '/it/accessible-forms',
        '/it/aria-components',
        '/it/performance',
        // German routes (with /de prefix)
        '/de',
        '/de/semantic-html',
        '/de/keyboard-navigation',
        '/de/media-accessible',
        '/de/color-contrast',
        '/de/accessible-forms',
        '/de/aria-components',
        '/de/performance',
        // Dutch routes (with /nl prefix)
        '/nl',
        '/nl/semantic-html',
        '/nl/keyboard-navigation',
        '/nl/media-accessible',
        '/nl/color-contrast',
        '/nl/accessible-forms',
        '/nl/aria-components',
        '/nl/performance',
        // Portuguese routes (with /pt prefix)
        '/pt',
        '/pt/semantic-html',
        '/pt/keyboard-navigation',
        '/pt/media-accessible',
        '/pt/color-contrast',
        '/pt/accessible-forms',
        '/pt/aria-components',
        '/pt/performance',
        // Arabic routes (with /ar prefix)
        '/ar',
        '/ar/semantic-html',
        '/ar/keyboard-navigation',
        '/ar/media-accessible',
        '/ar/color-contrast',
        '/ar/accessible-forms',
        '/ar/aria-components',
        '/ar/performance',
        // Japanese routes (with /ja prefix)
        '/ja',
        '/ja/semantic-html',
        '/ja/keyboard-navigation',
        '/ja/media-accessible',
        '/ja/color-contrast',
        '/ja/accessible-forms',
        '/ja/aria-components',
        '/ja/performance'
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
