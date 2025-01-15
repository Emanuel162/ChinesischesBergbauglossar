document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('mark').forEach(mark => {
        mark.addEventListener('click', () => {
            const currentUrl = window.location.href;
            const modifiedUrl = currentUrl.split('/memorialtext')[0];

            // we have to cut mark.id because the id itself contains '"' around them
            const searchId = mark.id.substring(1, mark.id.length - 1);

            window.location.href = modifiedUrl + '/glossary.html?id=' + searchId;
        })
    })
});