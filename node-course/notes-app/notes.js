const chalk = require('chalk');
const fs = require('fs');
const { title } = require('process');

const getNotes = (noteA, noteB) => {
    return {
        noteA,
        noteB
    }
}



const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicated = notes.filter((item, index) => {
        return item.title === title
    })
    if (duplicated.length === 0) {
        notes.push({
            'title': title,
            'body': body
        })
        saveNotes(notes)
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}


const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json');
        const dataJson = databuffer.toString();
        return JSON.parse(dataJson)

    } catch (e) {
        return []
    }
}
const listNote = () => {
    const loadNote = loadNotes();
    // loadNote.forEach((i) => console.log(i, "list"))
}
const readNote = (title) => {
    const loadNote = loadNotes();
    const find = loadNote.find((name, index) => name.title == title);
    if (find) {
        console.log(chalk.red.inverse('Discovered'))
    } else {
        console.log(chalk.green('Not found'))
    }
}

const removeNotes = (title, body) => {

    const databuffer = fs.readFileSync('notes.json');
    const dataJson = databuffer.toString();
    const items = JSON.parse(dataJson);
    console.log(items, "items")
    const filter = items.filter((val, index) => val.title !== title);
    console.log("please filter", filter)
    const dataJsons = JSON.stringify(filter)
    fs.writeFileSync('notes.json', dataJsons)


}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNote: listNote,
    readNote: readNote
}