import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Configure CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.all("/api/auth/*", toNodeHandler(auth));

// Middleware pour analyser le JSON
app.use(express.json());

// Route de base
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Test de connexion à la base de données
prisma
  .$connect()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
