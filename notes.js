import fs from 'fs';
import chalk from 'chalk';

export const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter(function (note){
    //     return note.title === title
    // })

    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        savedNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// export const removeNote =function (title) {
export const removeNote = (title) => {
    const notes = loadNotes()

    // const noteExiting = notes.filter(function (note){
    //     return note.title !== title
    // }
    const noteExiting = notes.filter((note) => note.title !== title)

    if (notes.length > noteExiting.length){
        console.log(chalk.green.inverse('Note removed!'))
        savedNotes(noteExiting);
    } else {
        console.log(chalk.red.inverse('No not found!'))
    }
}

// export const savedNotes = function(notes)
const savedNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// export const loadNotes = function (){
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

export const listNotes = () => {
    const notes = loadNotes();
    
    if (notes.length > 0){
        console.log(chalk.blue.inverse('Your notes :'));   
        notes.forEach((note) => console.log(chalk.yellow(note.title) + ": " + note.body));
        
    } else {
        console.log(chalk.red.inverse('No notes found!'))
    }
}

export const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.yellow(note.title) + ": " + note.body);
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
