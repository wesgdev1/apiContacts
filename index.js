const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

let contacts = [
  {
    id: "0c3aea71-6d17-4a0e-ac37-8a0175f790b1",
    name: "elvergalarwerwerwergrraff34343434FGFGFDFDFDFGDFDFFG",
    email: "xxxxxxxx@hotmail.com34343RTRTRT4",
    phone: "QUE CALOR2",
  },
];

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Esta es la lista de contactos</h1>");
});

//READ ALL
app.get("/contacts", (request, response) => {
  response.json(contacts);
});

//READ GET BY ID

app.get("/contacts/:id", (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  const contact = contacts.find(function (element) {
    return id === element.id;
  });

  if (contact) {
    res.json(contact);
  } else {
    next({
      statusCode: 404,
      message: `Note with ${id}, Not Found`,
    });
  }
});

//CREATE
app.post("/contacts", (req, res) => {
  const { body } = req;
  const contact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(contact);
  res.status(201).json(contact);
});

//ACTUALIZAR

//4. Put (Se envía el body)
app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };
  res.json(contacts[contactIndex]);
});

//ELIMINAR

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  let contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  contacts.splice(contactIndex, 1);
  res.sendStatus(204);
});

//MANEJO DE ERRORES

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: "Route Not Found",
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Error" } = err;
  console.log(message);
  res.status(statusCode);
  res.json({
    message,
  });
});

//SERVIDOR
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
