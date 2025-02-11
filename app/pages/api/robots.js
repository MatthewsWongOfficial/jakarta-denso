export default function handler(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    res.status(200).send(`User-agent: *
  Disallow:
  
  Sitemap: https://jakartaintldenso.com/sitemap.xml`);
  }
  