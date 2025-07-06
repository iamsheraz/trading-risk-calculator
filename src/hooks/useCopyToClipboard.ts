import { useState, useCallback } from 'react';

interface CopyToClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Custom hook for copying text to clipboard
 * Returns copy function and success state
 */
export function useCopyToClipboard(): CopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setIsCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      
      return true;
    } catch (error) {
      console.warn('Failed to copy text to clipboard:', error);
      setIsCopied(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setIsCopied(false);
  }, []);

  return { isCopied, copyToClipboard, reset };
}

// Usage example:
// const { isCopied, copyToClipboard } = useCopyToClipboard();
// const handleCopy = () => copyToClipboard('Text to copy');