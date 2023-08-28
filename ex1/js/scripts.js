let formData = new Object();
const form = document.querySelector("div.form-inputs");
const options = [
    { name: "Departamento", value: "", disabled: true},
    { name: "RH", value: "rh", disabled: false},
    { name: "Financeiro", value: "financeiro", disabled: false},
    { name: "TI", value: "ti", disabled: false},
    { name: "Administrativo", value: "administrativo",disabled: false},
];
const importance =[
    { name: "Importância", value: "", disabled: true},
    { name: "Prioridade 1", value: 1, disabled: false},
    { name: "Prioridade 2", value: 2, disabled: false},
    { name: "Prioridade 3", value: 3, disabled: false},
    { name: "Prioridade 4", value: 4,disabled: false},
    { name: "Prioridade 5", value: 5,disabled: false},
];
const inputs = [
    { type: "text", name: "description", placeholder: "Descrição" },
    { type: "text", name: "author", placeholder: "Autor" },
    { type: "select", name: "department", placeholder: "Departamento", options: options },
    { type: "select", name: "importance", placeholder: "Importância", options: importance },
    { type: "number", name: "value", placeholder: "Valor"},
];
const button = document.querySelector("button#submit");
const tbody = document.querySelector("table>tbody");
const list = new Array();
const ol = document.querySelector("ol");

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
        if (formData.author && formData.department && formData.description&& formData.importance && formData.value) {
            list.push(formData)
            populate(list)
            for (let item of inputs) item.input.value = "";
            formData = new Object();
        } else {
            for (let item of inputs) {
                if (item.input.value.length === 0 || item.input.value === "") {
                    item.input.classList.add("invalid");
                    item.input.addEventListener('focus', () => item.input.classList.remove("invalid"));
                }
            } 
        }
    }
}

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

function removeFormList(item) {
    const index = list.indexOf(item);
    list.splice(index, 1);
    populate(list);
}

function submit(value) {
    for (let item in value) {
        if (value.hasOwnProperty(item) === undefined || value[item].length === 0) return false;
        return true
    }
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");
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