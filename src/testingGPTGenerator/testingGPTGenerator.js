const fs = require('fs');
const path = require('path');
const { getChatGptResponse } = require('./config/chatgptConfig');
const ProgressBar = require('progress');


async function generateComponentTests(componentCode, componentName) {
  const prompt = `Provide the jest code for this component ${componentName} component.\n\n${componentCode}, Note that the test folder is three levels down in the file directory and components is in "components" directory, just give me the code`;
  const testCode = await getChatGptResponse(prompt);

  return testCode;
}

async function main() {
  const componentsPath = path.join(__dirname, '../components');
  const testFolderPath = path.join(__dirname, '../test/unit');

  try {
    const componentDirs = await fs.promises.readdir(componentsPath);
    const progressBar = new ProgressBar('[:bar] :current/:total :percent', {
      total: componentDirs.length,
      width: 30,
    });
    
    for (const componentDir of componentDirs) {
      const componentPath = path.join(componentsPath, componentDir, `${componentDir}.js`);
      const componentTestName = componentDir.toLowerCase();
      
      try {
        const componentCode = await fs.promises.readFile(componentPath, 'utf-8');
        const testCode = await generateComponentTests(componentCode, componentTestName);
        
        const testFilePath = path.join(testFolderPath, componentTestName, `${componentTestName}.test.js`);

        if (!fs.existsSync(path.join(testFolderPath, componentTestName))) {
          fs.mkdirSync(path.join(testFolderPath, componentTestName), { recursive: true });
        }
        await fs.writeFileSync(testFilePath, testCode);
        progressBar.tick();
        
        console.log(`Test file generated for ${componentTestName}`);
      } catch (error) {
        console.error(`Error processing component ${componentTestName}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Error reading components directory:', error.message);
  }
}

main();
