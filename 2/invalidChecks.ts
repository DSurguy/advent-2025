// Check if the ID is multiple repeated sequences (123123123)
export const isInvalid = (id: string): {
  invalid: boolean;
  logLines: string;
} => {
  let logLines = [];
  let invalid = false;
  logLines.push(id)
  
  for( let offset=1; offset <= id.length/2; offset++) {
    let result = "";
    for( let i=0; i<id.length - offset; i++){
      result += id[i+offset] === id[i] ? "0" : "1"
    }
    
    logLines.push(`${"".padEnd(offset, ' ')}${id}`)
    
    // The length of the matching offset must be a factor of the id's length
    if( id.length % offset === 0 && result.includes("1") === false ) {
      logLines.push(`${"".padEnd(offset, ' ')}${result} - match`)
      invalid = true;
      break;
    }
    else logLines.push(`${"".padEnd(offset, ' ')}${result}`)
  }
  
  return {
    invalid,
    logLines: logLines.join('\n'),
  }
}

// Check if the id is simple full repeat (123123)
export const simpleIsInvalid = (id: string) => {
  if( id.length % 2 === 1) return false;
  return id.substring(0, id.length/2) === id.substring(id.length/2)
}