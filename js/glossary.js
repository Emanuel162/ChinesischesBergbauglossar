document.addEventListener('DOMContentLoaded', () => {

    const buttons = Array.from(document.getElementsByClassName('button'));
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            //Close this entry again when it was open and do nothing more
            const hiddenDiv = button.querySelector('div.hidden-information');
            if (hiddenDiv.innerText !== '') {
                hiddenDiv.innerText = '';
                return;
            }

            // close all entrys
            buttons.forEach((buttonElement) => {
                const hiddenDiv = buttonElement.querySelector('div.hidden-information');
                hiddenDiv.innerText = '';
            })

            // open clicked entry
            hiddenDiv.innerText = "blubby";
        })
    })
})
