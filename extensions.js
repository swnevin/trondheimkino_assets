const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
    
    form {
      font-family: 'Roboto', sans-serif;
      max-width: 100%;
      margin: auto;
      padding: 0px;
      background-color: transparent;
      border-radius: 8px;
    }

    label {
      font-size: 1em;
      color: #333;
      display: block;
      margin: 10px 0 5px;
      font-weight: 500;
    }

    input[type="text"], input[type="email"], textarea {
      width: 100%;
      border: 2px solid #3480c2; /* Tykkere kant med ønsket farge */
      background-color: #fff;
      color: #333;
      margin: 10px 0;
      padding: 10px;
      outline: none;
      font-size: 1em;
      font-family: Arial, sans-serif; /* Bytter til Arial */
      border-radius: 8px; /* Avrundede hjørner */
      box-sizing: border-box;
    }

    textarea {
      height: 100px;
    }

    .invalid {
      border-color: red;
    }

    .submit {
      background-color: #3480c2; /* Samme farge som borderen */
      border: none;
      color: white;
      padding: 12px;
      border-radius: 8px; /* Avrundede hjørner */
      margin-top: 20px;
      width: 100%;
      cursor: pointer;
      font-size: 1em;
      font-weight: 500;
    }
  </style>

  <label for="name">Navn</label>
  <input type="text" class="name" name="name" required><br>

  <label for="email">E-post</label>
  <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br>

  <label for="message">Melding</label>
  <textarea class="message" name="message" required></textarea><br>

  <input type="submit" class="submit" value="Send">
`;

    formContainer.addEventListener('input', function () {
      const name = formContainer.querySelector('.name');
      const email = formContainer.querySelector('.email');
      const message = formContainer.querySelector('.message');

      if (name.checkValidity()) name.classList.remove('invalid');
      if (email.checkValidity()) email.classList.remove('invalid');
      if (message.checkValidity()) message.classList.remove('invalid');
    });

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = formContainer.querySelector('.name');
      const email = formContainer.querySelector('.email');
      const message = formContainer.querySelector('.message');

      if (
        !name.checkValidity() ||
        !email.checkValidity() ||
        !message.checkValidity()
      ) {
        name.classList.add('invalid');
        email.classList.add('invalid');
        message.classList.add('invalid');
        return;
      }

      formContainer.querySelector('.submit').remove();

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          name: name.value,
          email: email.value,
          message: message.value,
        },
      });
    });

    element.appendChild(formContainer);
  },
};
