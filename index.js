const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig"); ///////////////////

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     summary: Página de inicio
 *     description: Retorna un mensaje de bienvenida
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

app.get("/", (request, response) => {
  response.send("<h1>Esta es la lista de contactos</h1>");
});

//READ ALL
/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Obtener todos los contactos
 *     description: Retorna una lista de todos los contactos
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
app.get("/contacts", (request, response) => {
  response.json(contacts);
});

//READ GET BY ID

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Obtener un contacto por ID
 *     description: Retorna un contacto específico basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */

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

/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Crear un nuevo contacto
 *     description: Crea un nuevo contacto con la información proporcionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */

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

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Actualizar un contacto existente
 *     description: Actualiza la información de un contacto existente basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */

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

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Eliminar un contacto existente
 *     description: Elimina un contacto existente basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       204:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */

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

//ESQUEMAS PARA SAWWAGER

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del contacto
 *         name:
 *           type: string
 *           description: Nombre del contacto
 *         email:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del contacto
 *         phone:
 *           type: string
 *           description: Número de teléfono del contacto
 *     ContactInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del contacto
 *         email:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del contacto
 *         phone:
 *           type: string
 *           description: Número de teléfono del contacto
 *       required:
 *         - name
 *         - email
 *         - phone
 */
