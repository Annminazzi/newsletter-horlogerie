import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'src', 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return [];
  }
};

// Helper to write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing DB:", error);
  }
};

// GET articles
app.get('/api/articles', (req, res) => {
  const articles = readDB();
  res.json(articles);
});

// POST new article (from n8n)
app.post('/api/articles', (req, res) => {
  const { title, sourceURL, summary, imageURL, category, type, date } = req.body;

  // Extract the actual image URL from the HTML provided in imageURL
  let extractedImageURL = "";
  if (imageURL) {
    const imgMatch = imageURL.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      extractedImageURL = imgMatch[1];
    }
  }

  const newArticle = {
    id: Date.now().toString(),
    title: title || "Nouvel Article",
    summary: summary || "Résumé non disponible.",
    imageURL: extractedImageURL, // Extracted or empty (will trigger fallback in UI)
    sourceURL: sourceURL || "#",
    category: category || "Actualités",
    type: type || "Article",
    date: date || new Date().toISOString()
  };

  const articles = readDB();
  // Add to the top of the list
  articles.unshift(newArticle);
  writeDB(articles);

  res.status(201).json({ message: "Article ajouté avec succès", article: newArticle });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
