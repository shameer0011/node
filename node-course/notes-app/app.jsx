// const fs = require('fs');
// fs.writeFileSync('notes.txt', 'My name is shameer');
// fs.appendFileSync('notes.txt', "  append new text to notes.text")
const s = require('./utils')
const notes = require('./notes');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const { argv } = require('yargs');
// const totalNotes = notes('haii', 'hooi');
// console.log(totalNotes)
// console.log(validator.isURL('https://express-validator.github.io/docs'));
// console.log(validator.isEmail('shameer@gmail.com'))
// console.log(chalk.blue.inverse.bold('success'))
// console.log(process.argv)

// creating commands
// yargs.command({
//     command: 'add',
//     describe: "add new note",
//     handler: function () {
//         console.log("Adding new notes")
//     }
// })
// crerating remove command

yargs.command({
    command: 'remove',
    describe: "remove new note",
    handler: function (argv) {
        console.log(argv, "remove new notes")
        notes.removeNotes(argv.title, argv.body)
    }
})

// creating list command
yargs.command({
    command: 'list',
    describe: "listing  note",
    handler() {
        notes.listNote()
        console.log("listing  more new list notes")


    }
})
// create read notes


yargs.command({
    command: 'read',
    describe: 'Please read list',
    handler(argv) {
        notes.readNote(argv.title)
        console.log("please read lot of books")
    }
})
// first node app.js --help -> it will show command and describe.
//Running node app.js add/remove/list/read


yargs.command({
    command: 'add',
    describe: 'adding elements',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note in body',
            demandOption: true,
            type: 'string'

        }
    },
    handler: function (argv) {
        notes.addNotes(argv.title, argv.body)


    }
})
console.log(yargs.argv)