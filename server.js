// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gyümölcsök tárolása memóriában (példaként)
let fruits = [];

// Gyümölcsök lekérdezése
app.get('/api/fruits', (req, res) => {
    res.json(fruits);
});

// Új gyümölcs hozzáadása
app.post('/api/fruits', (req, res) => {
    const { name, price, unit, quantity } = req.body;

    // Validáció
    if (!name || name.length < 5) {
        return res.status(400).json({ message: 'A gyümölcs nevének legalább 5 karakter hosszúnak kell lennie!' });
    }
    if (!price || price <= 1) {
        return res.status(400).json({ message: 'Az egységárnak nagyobbnak kell lennie, mint 1!' });
    }
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'A mennyiségnek nullánál nagyobbnak kell lennie!' });
    }
    if (!['kg', 'db'].includes(unit)) {
        return res.status(400).json({ message: 'A mennyiségi egység csak "kg" vagy "db" lehet!' });
    }

    // Gyümölcs hozzáadása
    const newFruit = { name, price, unit, quantity };
    fruits.push(newFruit);

    res.status(201).json({ message: 'Gyümölcs sikeresen rögzítve!', fruit: newFruit });
});

// Gyümölcs módosítása (update)
app.put('/api/fruits/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { name, price, unit, quantity } = req.body;

    if (index < 0 || index >= fruits.length) {
        return res.status(404).json({ message: 'A gyümölcs nem található!' });
    }

    // Validáció (ugyanaz, mint a rögzítésnél)
    if (!name || name.length < 5) {
        return res.status(400).json({ message: 'A gyümölcs nevének legalább 5 karakter hosszúnak kell lennie!' });
    }
    if (!price || price <= 1) {
        return res.status(400).json({ message: 'Az egységárnak nagyobbnak kell lennie, mint 1!' });
    }
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'A mennyiségnek nullánál nagyobbnak kell lennie!' });
    }
    if (!['kg', 'db'].includes(unit)) {
        return res.status(400).json({ message: 'A mennyiségi egység csak "kg" vagy "db" lehet!' });
    }

    // Gyümölcs módosítása
    fruits[index] = { name, price, unit, quantity };
    res.status(200).json({ message: 'Gyümölcs sikeresen módosítva!', fruit: fruits[index] });
});

// Gyümölcs törlése (delete)
app.delete('/api/fruits/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= fruits.length) {
        return res.status(404).json({ message: 'A gyümölcs nem található!' });
    }

    // Gyümölcs törlése
    const deletedFruit = fruits.splice(index, 1);
    res.status(200).json({ message: 'Gyümölcs sikeresen törölve!', fruit: deletedFruit });
});

// Statikus fájlok kiszolgálása (HTML, CSS, JS)
app.use(express.static('public'));

// Szerver indítása
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
