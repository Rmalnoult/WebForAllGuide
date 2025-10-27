export const useSEOConfig = () => {
  const baseUrl = 'https://webforallguide.com'

  const seoConfig = {
    '/': {
      title: 'Accessibilité Web - Guide Pratique WCAG | Romain Malnoult',
      description: 'Guide pratique et interactif de l\'accessibilité web. Apprenez les normes WCAG, testez avec des exemples concrets : HTML sémantique, ARIA, navigation clavier, contrastes et formulaires accessibles.',
      keywords: 'accessibilité web, WCAG, a11y, guide accessibilité, normes WCAG',
      ogImage: '/og-image.png'
    },
    '/semantic-html': {
      title: 'HTML Sémantique - Guide Accessibilité Web',
      description: 'Apprenez à utiliser les éléments HTML sémantiques pour une meilleure accessibilité. Structure de page, titres, boutons vs liens, et listes accessibles avec exemples pratiques.',
      keywords: 'HTML sémantique, balises HTML, accessibilité HTML, structure sémantique',
      ogImage: '/og-image.png'
    },
    '/keyboard-navigation': {
      title: 'Navigation Clavier - Guide Accessibilité Web',
      description: 'Maîtrisez la navigation clavier pour l\'accessibilité web. Focus visible, skip links, modales avec focus trap, et raccourcis clavier selon les normes WCAG.',
      keywords: 'navigation clavier, focus, tabindex, skip link, modal accessible',
      ogImage: '/og-image.png'
    },
    '/media-accessible': {
      title: 'Images et Médias Accessibles - Guide WCAG',
      description: 'Rendez vos images et médias accessibles : textes alternatifs pertinents, galeries d\'images navigables au clavier, vidéos avec sous-titres et contrôles accessibles.',
      keywords: 'alt text, images accessibles, vidéos accessibles, sous-titres, médias',
      ogImage: '/og-image.png'
    },
    '/color-contrast': {
      title: 'Contrastes et Couleurs WCAG - Guide Accessibilité',
      description: 'Respectez les ratios de contraste WCAG : 4.5:1 minimum, adaptation au daltonisme, et thèmes accessibles. Outils et exemples pratiques de contrastes conformes.',
      keywords: 'contraste WCAG, ratio contraste, daltonisme, thème sombre, couleurs accessibles',
      ogImage: '/og-image.png'
    },
    '/accessible-forms': {
      title: 'Formulaires Accessibles - Guide WCAG',
      description: 'Créez des formulaires accessibles avec labels explicites, validation accessible, messages d\'erreur clairs, et groupes de champs structurés selon WCAG.',
      keywords: 'formulaires accessibles, labels, validation formulaire, aria-invalid, erreurs accessibles',
      ogImage: '/og-image.png'
    },
    '/aria-components': {
      title: 'Composants ARIA - Guide Accessibilité Web',
      description: 'Maîtrisez ARIA pour des composants web accessibles : accordéons, menus déroulants, tableaux triables, zones live, et notifications toast selon les normes WAI-ARIA.',
      keywords: 'ARIA, WAI-ARIA, accordéon accessible, menu accessible, aria-live',
      ogImage: '/og-image.png'
    },
    '/performance': {
      title: 'Performance et Adaptabilité - Guide Accessibilité',
      description: 'Optimisez votre site pour l\'accessibilité : prefers-reduced-motion, support du zoom 200%, responsive design, lazy loading et performances pour tous les utilisateurs.',
      keywords: 'performance accessibilité, reduced motion, zoom, responsive, lazy loading',
      ogImage: '/og-image.png'
    }
  }

  const getPageSEO = (path) => {
    const config = seoConfig[path] || seoConfig['/']

    return {
      title: config.title,
      meta: [
        { name: 'description', content: config.description },
        { name: 'keywords', content: config.keywords },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${baseUrl}${path}` },
        { property: 'og:title', content: config.title },
        { property: 'og:description', content: config.description },
        { property: 'og:image', content: `${baseUrl}${config.ogImage}` },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:site_name', content: 'Guide Accessibilité Web' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: `${baseUrl}${path}` },
        { name: 'twitter:title', content: config.title },
        { name: 'twitter:description', content: config.description },
        { name: 'twitter:image', content: `${baseUrl}${config.ogImage}` },
        { name: 'twitter:creator', content: '@romainmalnoult' }
      ],
      link: [
        { rel: 'canonical', href: `${baseUrl}${path}` }
      ]
    }
  }

  return {
    getPageSEO
  }
}
