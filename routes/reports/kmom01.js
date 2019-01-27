const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const data = {
        data: [
            {
                question: "Berätta utförligt om din syn på nodejs backend ramverk och berätta vilket ramverk du valde och varför.",
                answer: "Jag har inte jättestor erfarenhet av nodejs backend ramverk, men har testat Express litegrann tidigare. Jag gillar enkelheten som t.ex. Express ger, att man inte behöver skriva så många rader kod för att sätta upp sitt projekt. Kan man sen scaffolda fram projektet sparar man ju ytterligare tid och kan fokusera på att implementera sin egen kod. Jag gillar att man använder samma språk för backend och frontend, vilket också förenklar en del. Jag valde att arbeta med Express dels för att det verkar vara det populäraste nodejs backend ramverket, men också för att jag jobbat med det tidigare och känner igen syntaxen. Jag testade också att skapa projekt med bl.a. Hapi och Locomotive och de fungerade på liknande sätt."
            },
            {
                question: "Berätta om din katalogstruktur och hur du organiserade din kod, hur tänkte du?",
                answer: "Jag valde att organisera min kod genom att dela upp den i olika filer. Nu är det inte så många filer än å länge, men det kan nog komma att öka. Jag skapade en katalog för alla mina routes och i den en reports-katalog. I den valde jag att lägga en fil för varje kmom för att slippa få en gigantisk reports-fil. Än så länge har jag bara routes-filerna `routes/index.js` och `routes/reports/kmom01.js"
            },
            {
                question: "Använde du någon form av scaffolding som ditt valda ramverk erbjuder?",
                answer: "Jag använde mig inte av scaffolding för att skapa min me-sida. Däremot testade jag det efteråt för att se vilka filer och struktur man fick. Jag började med att installera express-generatorn `npm install express-generator -g` och sedan använda `express --view=pug myapp`. Filernas struktur påminde om min egen och man fick ett par template-filer i pug-format. Jag har aldrig använt pug, men det verkade smidigt och jag ska kolla närmare på det."
            },
            {
                question: "Vad är din TIL för detta kmom?",
                answer: "Veckans TIL är hur man kan sätta upp en server på digitalocean. Jag har också fått lite bättre koll på olika js-ramverk och hur man kan scaffolda fram bas-projekt. Dessutom har jag blivit så pass bättre på tmux att jag uppskattar att använda det. Jag har nu en session igång med olika namngivna fönster. Ett för min lokala me-api-miljö och ett för debian-servern."
            }
        ]
    };

    res.json(data);
});

module.exports = router;
