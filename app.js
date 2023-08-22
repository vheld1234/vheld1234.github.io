const form = document.getElementById("myForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    result.innerHTML = ""

    // What the User entered
    const inputValue = form.querySelector("input").value;
    // token from local session storage
    // TODO: find a more secure way to cache the token during session
    const token = localStorage.getItem('token')
    const apiUrl = 'https://electrical-db-service.onrender.com/api/data';

    fetch(apiUrl,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue })
        })
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data.message);
                })
            }
            return response.json();
        })
        .then(data => {
            for (let key in data[inputValue]) {
                const content = document.createElement("p");
                content.textContent = `${data[inputValue][key]}`
                result.appendChild(content);
            }
        })
        .catch(error => {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = error.message;
            errorMessage.style.color = "red";
            result.appendChild(errorMessage);
        });

});

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('token');
})