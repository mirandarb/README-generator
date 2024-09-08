// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: input => input ? true : 'Title is required.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description for your project:',
        validate: input => input ? true : 'Description is required.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide installation instructions:',
        validate: input => input ? true : 'Installation instructions are required.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage information:',
        validate: input => input ? true : 'Usage information is required.'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
        validate: input => input ? true : 'Contribution guidelines are required.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions:',
        validate: input => input ? true : 'Test instructions are required.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None']
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: input => input ? true : 'GitHub username is required.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: input => input ? true : 'Email address is required.'
    }
];

const generateREADME = data => {
    const licenseBadge = data.license !== 'None' ? `![License](https://img.shields.io/badge/license-${data.license.replace(' ', '%20')}-blue.svg)` : '';
    const tableOfContents = `
## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)`;

    return `# ${data.title}

${licenseBadge}

## Description
${data.description}

${tableOfContents}

## Installation
${data.installation}

## Usage
${data.usage}

## License
This project is licensed under the ${data.license} License.

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
If you have any questions, please reach out to me on [GitHub](https://github.com/${data.github}) or via email at ${data.email}.
`;
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(path.join(process.cwd(), fileName), data, 'utf8');
};

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then(answers => {
        const readmeContent = generateREADME(answers);
        writeToFile('README.md', readmeContent);
        console.log('README.md has been generated!');
    });
}

// Function call to initialize app
init();
