const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

let contacts = [];

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Esta es la lista de contactos</h1>");
});

//READ
app.get("/contacts", (request, response) => {
  response.json(contacts);
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
app.put("/contact/:id", (req, res) => {
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
