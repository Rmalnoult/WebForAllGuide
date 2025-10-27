import html2canvas from 'html2canvas'

export function useExportToImage() {
  const exportElementAsImage = async (element, filename = 'export') => {
    try {
      // Options pour html2canvas
      const options = {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Haute résolution
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: element.offsetWidth,
        height: element.offsetHeight,
        onclone: (clonedDoc) => {
          // S'assurer que tous les styles sont appliqués dans le clone
          const clonedElement = clonedDoc.querySelector('[data-export="true"]')
          if (clonedElement) {
            clonedElement.style.transform = 'none'
            clonedElement.style.position = 'static'
          }
        }
      }

      // Créer le canvas
      const canvas = await html2canvas(element, options)

      // Créer le lien de téléchargement
      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')

      // Déclencher le téléchargement
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return true
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
      return false
    }
  }

  const exportCardAsImage = async (cardTitle) => {
    // Trouver l'élément card par son titre
    const cardElement = document.querySelector(`[data-card-title="${cardTitle}"]`)

    if (!cardElement) {
      console.error('Card non trouvée:', cardTitle)
      return false
    }

    // Nettoyer le titre pour le nom de fichier
    const cleanTitle = cardTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const filename = `formulaire-${cleanTitle}`

    // Ajouter temporairement l'attribut data-export
    cardElement.setAttribute('data-export', 'true')

    try {
      const success = await exportElementAsImage(cardElement, filename)
      return success
    } finally {
      // Nettoyer l'attribut
      cardElement.removeAttribute('data-export')
    }
  }

  return {
    exportElementAsImage,
    exportCardAsImage
  }
}