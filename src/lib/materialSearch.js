function normalize(value) {
  return String(value).normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('id').trim()
}

export function matchesQuery(text, query) {
  const normalizedText = normalize(text)
  return normalize(query).split(/\s+/).every(term => normalizedText.includes(term))
}

export function filterModules(modules, query) {
  return modules.filter(mod => matchesQuery(
    [mod.title, mod.description, ...mod.subtopics.map(sub => sub.title)].join(' '), query,
  ))
}

export function findMaterialResults(modules, query) {
  if (!query.trim()) return []
  return modules.flatMap(mod => {
    const results = []
    if (matchesQuery(`${mod.title} ${mod.description}`, query)) {
      results.push({ key: mod.id, title: mod.title, context: 'Modul materi', to: `/materi/${mod.id}` })
    }
    for (const subtopic of mod.subtopics) {
      if (matchesQuery(subtopic.title, query)) {
        results.push({ key: subtopic.id, title: subtopic.title, context: mod.title, to: `/materi/${mod.id}?topik=${encodeURIComponent(subtopic.id)}` })
      }
    }
    return results
  })
}
