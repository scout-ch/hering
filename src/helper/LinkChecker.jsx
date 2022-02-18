


export function checkLinks(sectionsByKey, links) {
  return sectionsByKey.map((section) => {
    const chapters = section.chapters
    return chapters.map((chapter) => {
      const content = chapter.content
      const regexp = '\\$([\\w|-]*)\\$';
      const result = [...content.matchAll(regexp)];
      return result.map(link => {
        const found = links.find((l) => {return l['key'] === link[1]})
        if (typeof found === 'undefined') {
          console.error('falscher link', link[1], chapter.slug_with_section)
        }
        return null
      })
    })
  });

}