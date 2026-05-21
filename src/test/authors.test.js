import request from "supertest";
import app from "../server.js";

describe("Authors API (robusto)", () => {
  let authorId;

  //GET todos
  test("GET /authors devuelve status 200", async () => {
    const response = await request(app).get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  //CREATE AUTHOR (lo usamos como base)
  test("POST /authors crea un autor", async () => {
    const response = await request(app)
      .post("/authors")
      .send({
        name: "Autor Test",
        email: `test_${Date.now()}@mail.com`,
        bio: "Bio de prueba",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");

    authorId = response.body.id;
  });

  //GET BY ID dinámico
  test("GET /authors/:id devuelve un autor", async () => {
    const response = await request(app).get(`/authors/${authorId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", authorId);
  });

  //GET inexistente (ok fijo)
  test("GET /authors/:id devuelve 404 si no existe", async () => {
    const response = await request(app).get("/authors/999999");

    expect(response.statusCode).toBe(404);
  });

  //POST validación
  test("POST /authors devuelve 400 sin email", async () => {
    const response = await request(app).post("/authors").send({
      name: "Autor sin email",
    });

    expect(response.statusCode).toBe(400);
  });

  //PUT dinámico
  test("PUT /authors/:id modifica un autor", async () => {
    const response = await request(app).put(`/authors/${authorId}`).send({
      bio: "Bio actualizada desde test",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.bio).toBe("Bio actualizada desde test");
  });

  //DELETE inexistente (ok fijo)
  test("DELETE /authors/:id devuelve 404 si no existe", async () => {
    const response = await request(app).delete("/authors/999999");

    expect(response.statusCode).toBe(404);
  });
});