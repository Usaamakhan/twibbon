export function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm || !searchTerm.trim() || !text) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return `<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">${part}</mark>`;
    }
    return part;
  }).join('');
}

export function highlightMultipleFields(campaign, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) {
    return campaign;
  }

  return {
    ...campaign,
    title: highlightSearchTerm(campaign.title, searchTerm),
    description: highlightSearchTerm(campaign.description, searchTerm),
    category: highlightSearchTerm(campaign.category, searchTerm),
    creator: highlightSearchTerm(campaign.creator, searchTerm),
    hashtag: highlightSearchTerm(campaign.hashtag, searchTerm)
  };
}