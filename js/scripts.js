function addInputs(form, inputs) {

}

function main() {
    const form = document.querySelector("form");
    const inputs = [
        { type: "text", name: "description" }, 
        { type: "text", name: "author" },
        { type: "text", name: "department" },
        { type: "text", name: "importance" }
    ];
    addInputs(form, inputs);
}

main();