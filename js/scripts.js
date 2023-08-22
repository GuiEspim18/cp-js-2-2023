/** 
 * @type {{ type: string; name: string; placeholder: string;}}
 */
let formData = new Object();
const form = document.querySelector("div.form-inputs");
/** 
 * @type {{type: string; name: string; placeholder: string; input: HTMLInputElement}[]}
 */
const inputs = [
    { type: "text", name: "description", placeholder: "Descrição" },
    { type: "text", name: "author", placeholder: "Autor" },
    { type: "text", name: "department", placeholder: "Departamento" },
    { type: "text", name: "importance", placeholder: "Importancia" }
];
const button = document.querySelector("button.submit-btn");
const tbody = document.querySelector("table>tbody");
/** 
 * @type {{ type: string; name: string; placeholder: string;}[]}
 */
const rows = new Array();


/** 
 * function to add inputs to form on html
 * @param { Element | null } form 
 * @param {{ type: string; name: string; placeholder: string;}[]} inputs
 */
function addInputs(form, inputs) {
    for (const item of inputs) {
        const input = document.createElement("input");
        input.type = item.type;
        input.id = item.name;
        input.placeholder = item.placeholder;
        form.appendChild(input)
        item.input = input;
    }
}


/** 
 * function to add form inputs event to get the form value
 * @param {{ type: string; name: string; placeholder: string;}[]} inputs 
 * @param { Element } button
 */

function addFormEvents(inputs, button) {
    for (let item of inputs) item.input.addEventListener('keyup', () => formData[item.name] = item.input.value);
    button.addEventListener("click", validate);
}


function validate() {
    const submited = submit(formData);
    if (!submited) {
        alert("Preencha todos os campos obrigatórios");
        for (let item of inputs) {
            if (item.input.value.length === 0) {
                item.input.classList.add("invalid");
                item.input.addEventListener('focus', () => item.input.classList.remove("invalid"));
            }
        } 
    } else {
        const tr = document.createElement("tr");
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("icon-button")
        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined");
        icon.innerText = "delete";
        const iconTd = document.createElement("td");
        removeBtn.append(icon);
        iconTd.appendChild(removeBtn);
        for (let item in formData) {
            const td = document.createElement("td");
            td.innerText = formData[item];
            tr.appendChild(td);
        }
        tr.appendChild(iconTd);
        tbody.appendChild(tr);
        removeBtn.addEventListener("click", () => tr.remove())
        rows.push(formData);
        for (let item of inputs) item.input.value = "";
    }
}


/** 
 * function to submit the form and get the event from object form
 * @param {{ description: string; author: string; department: string; importance: string;}} value
 * @returns { boolean }
 */
function submit(value) {
    for (let item in value) {
        if (value.hasOwnProperty(item) === undefined || value[item].length === 0) return false;
        return true
    }
}


/** 
 * Function to add the event ripple to the button
 * @param { Event } event
 */
function createRipple(event) {
    /** 
     * Creating button
     * @type { HTMLButtonElement }
     */
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");
    /** 
     * getting span from the html
     * @type { HTMLSpanElement }
     */
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);
}

function main() {
    addInputs(form, inputs);
    addFormEvents(inputs, button);
    const buttons = document.querySelectorAll("button");
    for (let item of buttons) item.addEventListener('click', createRipple);
}

main();