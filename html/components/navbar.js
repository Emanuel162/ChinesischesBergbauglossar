const loadNavbar = () => {
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        fetch('./components/navbar-template.html') // Fetch the external file
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(templateHTML => {
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = templateHTML;

                const template = tempContainer.querySelector('template');
                if (template) {
                    const content = template.content.cloneNode(true);
                    navbarContainer.appendChild(content);
                } else {
                    console.error('No template found in the loaded HTML.');
                }
            })
            .catch(error => console.error('Error loading navbar template:', error));
    } else {
        console.warn('Navbar container (#navbar) not found.');
    }
}

// Load the navbar when the script runs
loadNavbar();
