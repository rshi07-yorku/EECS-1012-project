
const textarea = document.getElementById('test');
const output = document.getElementById('output');

function render() {
    output.innerHTML = marked.parse(textarea.value);
}

textarea.addEventListener('input', render);
render();