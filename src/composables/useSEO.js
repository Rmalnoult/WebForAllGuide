import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO() {
  const route = useRoute()

  // Configuration SEO par page
  const seoConfig = {
    '/': {
      title: 'Accessibilité Web - Guide Pratique WCAG | Romain Malnoult',
      description: 'Guide pratique et interactif de l\'accessibilité web. Apprenez les normes WCAG, testez avec des exemples concrets : HTML sémantique, ARIA, navigation clavier, contrastes et formulaires accessibles.',
      keywords: 'accessibilité web, WCAG, a11y, guide accessibilité, normes WCAG'
    },
    '/semantic-html': {
      title: 'HTML Sémantique - Guide Accessibilité Web',
      description: 'Apprenez à utiliser les éléments HTML sémantiques pour une meilleure accessibilité. Structure de page, titres, boutons vs liens, et listes accessibles avec exemples pratiques.',
      keywords: 'HTML sémantique, balises HTML, accessibilité HTML, structure sémantique'
    },
    '/keyboard-navigation': {
      title: 'Navigation Clavier - Guide Accessibilité Web',
      description: 'Maîtrisez la navigation clavier pour l\'accessibilité web. Focus visible, skip links, modales avec focus trap, et raccourcis clavier selon les normes WCAG.',
      keywords: 'navigation clavier, focus, tabindex, skip link, modal accessible'
    },
    '/media-accessible': {
      title: 'Images et Médias Accessibles - Guide WCAG',
      description: 'Rendez vos images et médias accessibles : textes alternatifs pertinents, galeries d\'images navigables au clavier, vidéos avec sous-titres et contrôles accessibles.',
      keywords: 'alt text, images accessibles, vidéos accessibles, sous-titres, médias'
    },
    '/color-contrast': {
      title: 'Contrastes et Couleurs WCAG - Guide Accessibilité',
      description: 'Respectez les ratios de contraste WCAG : 4.5:1 minimum, adaptation au daltonisme, et thèmes accessibles. Outils et exemples pratiques de contrastes conformes.',
      keywords: 'contraste WCAG, ratio contraste, daltonisme, thème sombre, couleurs accessibles'
    },
    '/accessible-forms': {
      title: 'Formulaires Accessibles - Guide WCAG',
      description: 'Créez des formulaires accessibles avec labels explicites, validation accessible, messages d\'erreur clairs, et groupes de champs structurés selon WCAG.',
      keywords: 'formulaires accessibles, labels, validation formulaire, aria-invalid, erreurs accessibles'
    },
    '/aria-components': {
      title: 'Composants ARIA - Guide Accessibilité Web',
      description: 'Maîtrisez ARIA pour des composants web accessibles : accordéons, menus déroulants, tableaux triables, zones live, et notifications toast selon les normes WAI-ARIA.',
      keywords: 'ARIA, WAI-ARIA, accordéon accessible, menu accessible, aria-live'
    },
    '/performance': {
      title: 'Performance et Adaptabilité - Guide Accessibilité',
      description: 'Optimisez votre site pour l\'accessibilité : prefers-reduced-motion, support du zoom 200%, responsive design, lazy loading et performances pour tous les utilisateurs.',
      keywords: 'performance accessibilité, reduced motion, zoom, responsive, lazy loading'
    }
  }

  // Fonction pour mettre à jour les meta tags
  const updateMetaTags = (path) => {
    const config = seoConfig[path] || seoConfig['/']

    // Update title
    document.title = config.title

    // Update meta description
    updateMetaTag('name', 'description', config.description)
    updateMetaTag('name', 'keywords', config.keywords)

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', config.title)
    updateMetaTag('property', 'og:description', config.description)
    updateMetaTag('property', 'og:url', `https://a11y-demo.romainmalnoult.dev${path}`)

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', config.title)
    updateMetaTag('name', 'twitter:description', config.description)
    updateMetaTag('name', 'twitter:url', `https://a11y-demo.romainmalnoult.dev${path}`)

    // Update canonical URL
    updateCanonicalUrl(path)
  }

  // Helper pour mettre à jour ou créer un meta tag
  const updateMetaTag = (attribute, key, content) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`)

    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, key)
      document.head.appendChild(element)
    }

    element.setAttribute('content', content)
  }

  // Helper pour mettre à jour l'URL canonique
  const updateCanonicalUrl = (path) => {
    let link = document.querySelector('link[rel="canonical"]')

    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }

    link.setAttribute('href', `https://a11y-demo.romainmalnoult.dev${path}`)
  }

  // Watcher pour mettre à jour les meta tags lors du changement de route
  watch(() => route.path, (newPath) => {
    updateMetaTags(newPath)
  }, { immediate: true })

  return {
    updateMetaTags
  }
}
