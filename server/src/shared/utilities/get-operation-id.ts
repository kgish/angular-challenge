export function GetOperationId(model: string, operation: string) {
  const m = ToTitleCase(model).replace(/\s/g, '');
  const o = ToTitleCase(operation).replace(/\s/g, '');

  return {
    title: '',
    operationId: `${m}_${o}`,
  };
}

function ToTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}
