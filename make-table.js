// node make-table.js
import https from "https";

https.get("https://data.jsdelivr.com/v1/package/gh/ObedCabanzo/public-assets@main", res => {
  let data = "";
  res.on("data", c => data += c);
  res.on("end", () => {
    const json = JSON.parse(data);
    const rows = json.files
      .map(f => f.name)
      .filter(p => p.startsWith("trivia/gif/") || p.startsWith("trivia/sound/") || p.startsWith("trivia/video/"))
      .map(p => {
        const parts = p.split("/");
        const name = parts[parts.length - 1];
        const tipo = parts[1]; // gif | sound | video
        const cdn  = `https://cdn.jsdelivr.net/gh/ObedCabanzo/public-assets@main/${p}`;
        return `| ${name} | ${tipo} | ${cdn} |`;
      });

    console.log("| Nombre de archivo | Tipo | CDN |");
    console.log("|---|---|---|");
    console.log(rows.join("\n"));
  });
});