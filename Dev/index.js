const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?"
    },
    {
      type: "input",
      name: "description",
      message: "What is a brief description of your product?"
    },
    {
      type: "input",
      name: "Installation",
      message: "Steps required to install your product?"
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions and examples for use:"
    },
    {
      type: "input",
      name: "license",
      message: "Any licenses?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "credits",
      message: "List collaborators if any?"
    },
    {
      type: "input",
      name: "contributing",
      message: "List any developers you would like to contribute?"
    },
  ]);
}

function generateMD(input) {
  return `
  # ${input.title}


  ## Description

  ${input.description}

  ## Installation

  ${input.Installation}

  ## Usage

  ${input.usage}

  ## License

  ${input.license}

  ## Contributing

  ${input.contributing}


  ## Contact

  Github Username: ${input.github}
  LinkedIn URL: ${input.linkedin}
  Email Address: ${input.email}

  ## Credits

  ${input.credits}

  `;
}

promptUser()
  .then(function(input) {
    const md = generateMD(input);

    return writeFileAsync("ReadMe.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to ReadMe.md");
  })
  .catch(function(err) {
    console.log(err);
  });
