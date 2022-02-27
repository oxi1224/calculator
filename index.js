const outputEl = document.getElementById('output');
const inputEl = document.getElementById('input');
const buttons = inputEl.querySelectorAll('td');
const switchField = document.getElementById("switch-field");

function calculator() {
    let output = [];
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (["DEL", "RESET", "="].includes(button.textContent)) {
                if (button.textContent === "DEL") {
                    output.pop();
                    outputEl.textContent = output.join('');
                } else if (button.textContent === "RESET") {
                    output.length = 0;
                    outputEl.textContent = output.join('');
                } else {
                    for(let i = 0; i < output.length; ++i){
                        if(output[i] === 'x'){
                            output[i] = '*';
                        }
                    }
                    outputEl.textContent = eval(output.join(''));
                    output = [...outputEl.textContent];
                }
            } else {
                output.push(button.textContent)
                if (output[0].match(/[0-9]/) || output[0].match('-')){
                    outputEl.textContent = output.join('');
                } else {
                    output.shift();
                }
            }
        })
    });
}
calculator();

function themeToggle() {
    let theme = 1;
    const themeIndicator = document.getElementById("switch-ball"); 
    switchField.addEventListener("click", toggle);
    function toggle() {
        if (theme == 1) {
            theme++;
            themeIndicator.style.transform = 'translateX(23px)';
            document.body.classList.toggle("theme2")
        } else if (theme == 2) {
            theme++;
            themeIndicator.style.transform = 'translateX(46px)';
            document.body.classList.toggle("theme2")
            document.body.classList.toggle("theme3")
        } else {
            theme = 1;
            themeIndicator.style.transform = 'translateX(0px)';
            document.body.classList.toggle("theme3")
        }
    }
}
themeToggle();