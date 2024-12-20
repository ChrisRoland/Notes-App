const addBtn = document.getElementById('add')
const body = document.querySelector('body');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach(note => newNote(note))
}

addBtn.addEventListener('click', () => newNote())

function newNote(text = "") {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

    const deleteBtn = note.querySelector('.delete');
    const editBtn = note.querySelector('.edit');
    const mainText = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    mainText.innerHTML = marked(text);

    deleteBtn.addEventListener('click', () => {
        note.remove();

        updateLocalStorage();
    });

    editBtn.addEventListener('click', () => {
        mainText.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        mainText.innerHTML = marked(value);

        updateLocalStorage();
    });

    body.appendChild(note);
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll('textarea');

    const notes = []

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
    

}