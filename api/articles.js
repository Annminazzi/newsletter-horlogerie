import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Configurer les headers CORS pour permettre à n8n d'envoyer des requêtes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer la requête de pré-vérification CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- GET : Récupérer les articles depuis Supabase ---
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false }); // Les plus récents d'abord

    if (error) {
      console.error("Erreur Supabase GET:", error);
      return res.status(500).json({ message: "Erreur lors de la récupération des articles" });
    }

    return res.status(200).json(data || []);
  }

  // --- POST : Ajouter un nouvel article (webhook n8n) ---
  if (req.method === 'POST') {
    const { title, sourceURL, summary, imageURL, category, type, date } = req.body || {};

    // Extraire l'URL de l'image si imageURL contient du HTML
    let extractedImageURL = "";
    if (imageURL) {
      const imgMatch = imageURL.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        extractedImageURL = imgMatch[1];
      }
    }

    const newArticle = {
      title: title || "Nouvel Article",
      summary: summary || "Résumé non disponible.",
      imageURL: extractedImageURL,
      sourceURL: sourceURL || "#",
      category: category || "Actualités",
      type: type || "Article",
      // Si aucune date n'est fournie, Supabase utilisera sa valeur par défaut `now()`
      ...(date ? { date } : {}) 
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([newArticle])
      .select();

    if (error) {
      console.error("Erreur Supabase POST:", error);
      return res.status(500).json({ message: "Erreur lors de l'insertion dans la base de données", error });
    }

    return res.status(201).json({ message: "Article ajouté avec succès", article: data[0] });
  }

  // Si la méthode n'est ni GET ni POST
  return res.status(405).json({ message: "Method Not Allowed" });
}
