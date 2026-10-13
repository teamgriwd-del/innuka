const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const files = fs.readdirSync(assetsDir).filter(file => 
  (file.endsWith('.jpg') || file.endsWith('.png')) && 
  (file.startsWith('lotion_') || file.startsWith('hair_') || 
   file.startsWith('makeup_') || file.startsWith('soap_') || 
   file.startsWith('fragrance_') || file.startsWith('hero'))
);

let imports = '';
let exportString = 'export const images = {\n';

files.forEach((file, index) => {
  const varName = `img_${index}`;
  imports += `import ${varName} from './${file}';\n`;
  exportString += `  '${file}': ${varName},\n`;
});

exportString += '};\n';

fs.writeFileSync(path.join(assetsDir, 'index.js'), imports + '\n' + exportString);
console.log('src/assets/index.js generated!');
