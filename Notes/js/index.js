const Addbtn = document.querySelector("#Addbtn").addEventListener("click", function () {
    AddNote();
})

const main2 = document.querySelector("#main");


const saveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    let data = [];
    notes.forEach((note) => {
        // console.log(note.value);
        data.push(note.value);
    })

    if (data.length === 0) {
        localStorage.removeItem("notes");
        AddNote();
    } else {

        localStorage.setItem("notes", JSON.stringify(data))
    }
    // console.log(data)

}
const AddNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `<div class="toolbar">
                <i class="save fa-regular fa-floppy-disk"></i>
                <i class="trash fas fa-trash"></i>

            </div>
            <textarea>${text}</textarea>`;

    main2.appendChild(note);
    saveNote();

    note.querySelector(".trash").addEventListener(
        "click", () => {
            note.remove();
            saveNote();
        }
    )

    note.querySelector(".save").addEventListener(
        "click", () => {
            saveNote();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout", () => {
            saveNote();
        }
    )



}

(
    function () {
        let LsNotes = JSON.parse(localStorage.getItem("notes"));
        if (LsNotes === null) {
            AddNote();
        } else {

            console.log(LsNotes);

            LsNotes.forEach((LsNote) => {
                AddNote(LsNote);
            })
        }
    }
)()