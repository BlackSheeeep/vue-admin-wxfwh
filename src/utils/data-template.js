export function mainMenu(name = "", enablechildren = false, children = []) {
  return {
    name,
    enablechildren,
    children
  }
}
export function subMenu(name = "", linkto = "") {
  return {
    name,
    linkto
  }
}

export function keyword(keyword, contentType, comment, content) {
  return {
    keyword: keyword || "test",
    contentType: contentType || "text",
    comment: comment || "test",
    content: content || ""
  }
}
