export const extractJson = (content: string) => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1]; // Devuelve el bloque JSON
  }
  return false;
};
