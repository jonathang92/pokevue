export const webShare = async (shareData: ShareData): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.error('Error sharing content:', error)
      throw error
    }
  } else {
    throw new Error('Web Share API is not supported in this browser or context.')
  }
}

export const copyToClipboard = async (textToCopy: string): Promise<boolean> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      return true
    } catch (err) {
      console.error('Error copying text to clipboard:', err)
      return false
    }
  }
  console.warn('Clipboard API not supported or context is not secure (HTTPS).')
  return false
}
