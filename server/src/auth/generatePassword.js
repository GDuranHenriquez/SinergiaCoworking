
function generatePassword(){
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz';
  const num = '0123456789';
  const character  = '!@#$%^&*.';
  var pass = '';
  for (let i = 1; i <= 6; i++) {
    const char = Math.floor(Math.random() * str.length + 1);      
    pass += str.charAt(char)
  }
  for (let i = 1; i <= 3; i++) {
    const char = Math.floor(Math.random() * num.length + 1);      
    pass += num.charAt(char)
  }
  for (let i = 1; i <= 3; i++) {
    const char = Math.floor(Math.random() * character.length + 1);      
    pass += character.charAt(char)
  }
  
  pass = pass.split('');
  for (let i = pass.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pass[i], pass[j]] = [pass[j], pass[i]];
  }
  const shuffledString = pass.join('');  
  return shuffledString;
};

module.exports = { generatePassword };
