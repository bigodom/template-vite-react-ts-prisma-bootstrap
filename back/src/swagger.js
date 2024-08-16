import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "API",
        version: "1.0.0",
        description: "API documentation"
    },
    servers: [
      {
        url: "http://192.168.11.95:3010",
        description: "Development server"
      }
    ],
    tags: [
        {
            name: "User",
            description: "User endpoints"
        },
        {
            name: "Beneficio",
            description: "Beneficio endpoints"
        }
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
        schemas: {
            User: {
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    email: { type: "string" },
                    login: { type: "string" },
                    password: { type: "string" },
                    role: { type: "string" }
                }
            },
            Beneficio: {
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    valor: { type: "number" },
                    id_comprador: { type: "integer" },
                    prazo_de_pagamento: { type: "string" },
                    situação: { type: "string" },
                    tipo_de_baixa: { type: "string" },
                    obs: { type: "string" }
                }
            }
        },
    }
}

const outputFile = "./src/swagger.json"
const routes = ["./src/routes/userRoutes.js", "./src/routes/beneficioRoutes.js"]

swaggerAutogen({openapi: '3.1.0'})(outputFile, routes, doc)