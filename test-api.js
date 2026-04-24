const htmlPayload = `
  <html>
    <body>
      <p>Voici un article avec une image HTML injectée par n8n</p>
      <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop" alt="Montre de test" />
    </body>
  </html>
`;

fetch('http://localhost:3001/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Test depuis n8n (Webhook simulé)",
    sourceURL: "https://example.com/n8n-test",
    summary: "Cet article a été envoyé via l'API. L'image a été extraite dynamiquement depuis le HTML.",
    imageURL: htmlPayload,
    category: "Test API",
    type: "Article"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
