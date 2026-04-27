const createBtn = document.getElementById("createBtn");
const container = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.style.background = note.color || "#fff";

    div.innerHTML = `
      <input type="text" placeholder="Title" value="${note.title}">
      <textarea rows="3" placeholder="Write note...">${note.text}</textarea>
      <small>${note.time}</small>

      <div class="actions">
        <div class="color-picker">
          <span style="background:#fff" data-color="#fff"></span>
          <span style="background:#ffcccb" data-color="#ffcccb"></span>
          <span style="background:#d4f8e8" data-color="#98f8cd"></span>
          <span style="background:#fff5ba" data-color="#fff5ba"></span>
        </div>
        <span class="delete"><img src="./assests/images/recycle-bin.png" alt=""></span>
      </div>
    `;

    const title = div.querySelector("input");
    const text = div.querySelector("textarea");
    const del = div.querySelector(".delete");
    const colors = div.querySelectorAll(".color-picker span");

    title.addEventListener("input", () => {
      notes[index].title = title.value;
      saveNotes();
    });

    text.addEventListener("input", () => {
      notes[index].text = text.value;
      saveNotes();
    });

    del.onclick = () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    };

    colors.forEach(c => {
      c.onclick = () => {
        notes[index].color = c.dataset.color;
        saveNotes();
        renderNotes();
      };
    });

    container.appendChild(div);
  });
}

createBtn.addEventListener("click", () => {
  const newNote = {
    title: "",
    text: "",
    time: new Date().toLocaleString(),
    color: "#fff"
  };

  notes.unshift(newNote);
  saveNotes();
  renderNotes();

  setTimeout(() => {
    document.querySelector(".note input").focus();
  }, 0);
});

renderNotes();