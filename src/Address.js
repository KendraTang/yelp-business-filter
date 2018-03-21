import nl2br from 'react-nl2br'

export default (address) => 
  // Add whitespace between ASCII and CJK characters, and convert newline to
  // <br>
  nl2br(address
    .replace(/(\w)(?=[\u2E80-\u9FFF])/g, '$1 ')
    .replace(/([\u2E80-\u9FFF])(?=\w)/g, '$1 ')
  )
