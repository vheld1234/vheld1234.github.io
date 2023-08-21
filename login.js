document.addEventListener('DOMContentLoaded', () => {

    const result = document.getElementById("result");
    const loginForm = document.getElementById('loginForm'); 
  
    loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      result.innerHTML = "" 
  
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      
      const button = document.getElementById('loginButton');
      button.classList.add('loading');
      try {
        const response = await fetch('https://electrical-db-service.onrender.com/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
  
          // Store the token in localStorage
          localStorage.setItem('token', token);
  
          // Redirect to the protected page
          window.location.href = 'app.html';
        } else {
          console.error('Login failed');
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Login Failed: Incorrect Username or Password";
          errorMessage.style.color = "red";
          result.appendChild(errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      button.classList.remove('loading');
    });
  });
  