/** 
 * @type {{ description: string; author: string; department: string; importance: number}}
 */
let formData = new Object();
const form = document.querySelector("div.form-inputs");
/** 
 * @type {{name: string; value: string; disabled: boolean}[]}
 */
const options = [
    { name: "Departamento", value: "", disabled: true},
    { name: "RH", value: "rh", disabled: false},
    { name: "Financeiro", value: "financeiro", disabled: false},
    { name: "TI", value: "ti", disabled: false},
    { name: "Administrativo", value: "administrativo",disabled: false},
];
/** 
 * @type {{type: string; name: string; placeholder: string; input: HTMLInputElement, options: {name: string; value: string}[]}[]}
 */
const inputs = [
    { type: "text", name: "description", placeholder: "Descrição" },
    { type: "text", name: "author", placeholder: "Autor" },
    { type: "select", name: "department", placeholder: "Departamento", options: options },
    { type: "number", name: "importance", placeholder: "Importancia" }
];
const button = document.querySelector("button#submit");
const tbody = document.querySelector("table>tbody");
const createBtn = document.querySelector("button#create-list");
/** 
 * @type {{ description: string; author: string; department: string; importance: number}[]}
 */
const list = new Array();
const ol = document.querySelector("ol");


/** 
 * function to add inputs to form on html
 * @param { Element | null } form 
 * @param {{ type: string; name: string; placeholder: string; input: HTMLInputElement, options: {name: string; value: string; disabled: boolean}[]}[]} inputs
 */
function addInputs(form, inputs) {
    for (const item of inputs) {
        let input = document.createElement("input");
        input.type = item.type;
        input.id = item.name;
        input.placeholder = item.placeholder;
        if (item.type === "select") {
            input = document.createElement("select");
            item.options.forEach(element => {
                const opt = document.createElement("option");
                opt.textContent = element.name;
                opt.value = element.value;
                opt.disabled = element.disabled;
                input.append(opt)
            });
        }
        form.appendChild(input)
        input.value = "";
        item.input = input;
    }
}


/** 
 * function to add form inputs event to get the form value
 * @param {{ type: string; name: string; placeholder: string; input: HTMLInputElement}[]} inputs 
 * @param { Element } button
 */

function addFormEvents(inputs, button) {
    for (let item of inputs) {
        if (item.type === "input") item.input.addEventListener('keyup', () => formData[item.name] = item.input.value);
        else item.input.addEventListener('change', () => formData[item.name] = item.input.value);
    }
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
        list.push(formData)
        // const tr = document.createElement("tr");
        // const removeBtn = document.createElement("button");
        // removeBtn.classList.add("icon-button")
        // const icon = document.createElement("span");
        // icon.classList.add("material-symbols-outlined");
        // icon.innerText = "delete";
        // const iconTd = document.createElement("td");
        // removeBtn.append(icon);
        // iconTd.appendChild(removeBtn);
        // for (let item in formData) {
        //     const td = document.createElement("td");
        //     td.innerText = formData[item];
        //     tr.appendChild(td);
        // }
        // tr.appendChild(iconTd);
        // tbody.appendChild(tr);
        // const listItem = { value: formData.description, importance: Number(formData.importance) }
        // list.push(listItem);
        // tr.id = list.indexOf(listItem)
        // removeBtn.addEventListener("click", () => removeFormList(tr))
        populate(list)
        for (let item of inputs) item.input.value = "";
        formData = new Object();
    }
}

/** 
 * @param {{ description: string; author: string; department: string; importance: number}[]} l
 */


function populate(l) {
    tbody.replaceChildren();
    l.forEach(element => {
        const tr =  document.createElement("tr");
        for (let item in element) {
            const td = document.createElement("td");
            td.textContent = element[item];
            tr.appendChild(td);
        }
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.addEventListener("click", () => removeFormList(element));
        const iconTd = document.createElement("td");
        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined");
        icon.innerText = "delete";
        removeBtn.appendChild(icon);
        removeBtn.classList.add("icon-button");
        iconTd.appendChild(removeBtn);
        tr.appendChild(iconTd);
        tbody.appendChild(tr);  
    });
    ol.replaceChildren();
    const orderedList = l.sort((a, b)=> a.importance - b.importance);
    orderedList.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element.description;
        ol.appendChild(li);
    });
}

/** 
 * @param {{ description: string; author: string; department: string; importance: string;}} item
 */

function removeFormList(item) {
    const index = list.indexOf(item);
    list.splice(index, 1);
    populate(list);
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

/** 
 * @param {Element} button
 * @param { HTMLOListElement } ol
 */

function createList(button, ol) {
    button.addEventListener("click", () => {
        ol.replaceChildren();
        const orderList = list.sort((a, b) => a.importance - b.importance);
        for (let item of orderList) {
            const li = document.createElement("li")
            li.textContent = item.value;
            ol.appendChild(li)
        }
    });
}

function main() {
    addInputs(form, inputs);
    addFormEvents(inputs, button);
    const buttons = document.querySelectorAll("button");
    for (let item of buttons) item.addEventListener('click', createRipple);
    createList(createBtn, ol);
}

main();