const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => p.querySelectorAll(s);

let input = $("input");
let ul_todo = $(".todo");
let ul_done = $(".done");
let form = $("form");

form.addEventListener("submit", (event) => add(event, ul_todo));


export function add(event, place) {
    // console.log('add');
    event.preventDefault();

    if (input.value) {
        place.innerHTML += `<li><span>id: </span>${input.value}
        <span class="buttons">
            <button class="setDone icon-checkmark"></button>
            <button class="update icon-pencil"></button>
            <button class="remove icon-bin"></button>
            <button class="setUndone icon-undo"></button>
        </span>
                        </li>`;
        // localStorage.setItem("todos", JSON.stringify([...JSON.parse(localStorage.todos || '[]'), input.value]))
        input.value = "";
    }

    // addEventListener to all buttons
    // -- !!! --  every time adding for all todos again. need change to add every time for the new one only 
    $$(".setDone").forEach(item => item.addEventListener("click", (event) => move(event, ul_done)));
    $$(".setUndone").forEach(item => item.addEventListener("click", (event) => move(event, ul_todo)));
    $$(".update").forEach(item => item.addEventListener("click", update));
    $$(".remove").forEach(item => item.addEventListener("click", remove));
}

export function move(event, place) {
    // console.log('move');
    console.log(event.target);
    event.target.parentNode.parentNode.remove();
    place.appendChild(event.target.parentNode.parentNode);
}


function remove(event) {
    // console.log('remove');
    event.preventDefault();
    event.target.parentNode.parentNode.remove();
}


export function update(event) {
    console.log('update');
    if (input.value) {
        console.log(event.target.parentNode.parentNode.childNodes[1].nodeValue);
        event.target.parentNode.parentNode.childNodes[1].nodeValue = input.value + ' ';
        input.value = '';
    }
}
