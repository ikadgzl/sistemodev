fetch('https://randomuser.me/api/?results=10')
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((employee) => {
      const cardTemplate = document.querySelector('template');

      const card = cardTemplate.content.cloneNode(true);

      card.querySelector('img').src = employee.picture.large;
      card.querySelector('h4').innerText = `${employee.name.title} ${employee.name.first} ${employee.name.last}`;
      card.querySelector('p').innerText = employee.email;

      document.body.appendChild(card);
    });
  });

fetch('http://localhost:8080/employees')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let html = '';
    data.forEach((item) => {
      html += `<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
    <td>${item.title}</td>
    </tr>`;
    });

    document.querySelector('table').innerHTML += html;
  });
