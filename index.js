#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const Wallet = require('ethereumjs-wallet')
const util = require('ethereumjs-util')
const fs = require('fs');

const askQuestions = () => {
    const questions = [
      {
        type: "input",
        name: "PrivateKey",
        message: "Please paste your private Key here"
      
      },
      {
        type: "password",
        name: "Password",
        message: "Please paste your destination address here"
      
      }

    ];
    return inquirer.prompt(questions);
  };

const init = () => {
    console.log(
      chalk.red(
        figlet.textSync("Private key to Ethereum Wallet", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  }

  const success = (filepath) => {
    console.log(
      chalk.white.bgGreen.bold(`Generated wallet file ${filepath}`)
    );
  };
  
  const run = async () => {
    // show script introduction
    init();
  //0x844e8391e356d9278e5cefff2e880a2292b8456150bf26233ceb3f3365e36f8b
    const answers = await askQuestions();
    const { PrivateKey, Password} = answers;
    let wl=new Wallet(util.toBuffer(PrivateKey))
    let fn=wl.getV3Filename();
    let data = JSON.stringify(wl.toV3(Password));  
    fs.writeFileSync(fn, data); 
    
    success(process.cwd()+"/"+fn);
  
  
  };

  run();
