export const portfolioQuery = `
*[_type == "portfolio"] | order(_createdAt desc) {
  _id,
  title,
  description, // <-- ini sekarang PortableText
  tools,
  view,
  content
}
`
export const aboutQuery = `
  *[_type == "about"][0]{
    title,
    content,
    techStack
  }
`