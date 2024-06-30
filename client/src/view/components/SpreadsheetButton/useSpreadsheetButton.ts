import toast from 'react-hot-toast';

export function useSpreadsheetButton() {
  function loadSpreedsheet() {
    try {
      toast.success('Planilha baixada com sucesso!');
    } catch {
      toast.error('Falha em baixar a planilha, tente novamente.');
    }
  }

  return {
    loadSpreedsheet,
  };
}
