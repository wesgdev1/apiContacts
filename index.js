const express = require("express");
const app = express();

let contacts = [
  {
    name: "welinton suarez",
    email: "willienn@hotmail.com",
    phone: "3118688254",
  },
  {
    name: "francisco leal",
    email: "willienn@hotmail.com",
    phone: "3118688254",
  },
  {
    name: "andres moreno",
    email: "willienn@hotmail.com",
    phone: "3118688254",
  },
];

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Esta es la lista de contactos</h1>");
});

app.get("/contacts", (request, response) => {
  response.json(contacts);
});

app.post("/contacts", (req, res) => {
  const { body } = req;
  const contact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(body);
  res.status(201).json(body);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
