import express from "express";
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = fs.readFileSync('chave-api.txt', 'utf-8');
console.log(API_KEY)


const genAI = new GoogleGenerativeAI(API_KEY);
// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const prompt = "Me fale porquê estudar programação é importante independente da profissão?"
const result = await model.generateContent(prompt);
const response = result.response;
const text = response.text();


const app = express()
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/api", (req, res) => {
    res.status(200).send(text);
});
