// public/script.js
document.addEventListener('DOMContentLoaded', function() {
    const fruitForm = document.getElementById('fruit-form');
    const fruitList = document.getElementById('fruit-list');
    const messageDiv = document.getElementById('message');

    // Gyümölcsök betöltése
    fetch('/api/fruits')
        .then(response => response.json())
        .then(fruits => {
            fruits.forEach(fruit => addFruitToList(fruit));
        });

    // Új gyümölcs rögzítése
    fruitForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const unit = document.getElementById('unit').value;
        const quantity = parseFloat(document.getElementById('quantity').value);

        // Adatok elküldése a szervernek
        fetch('/api/fruits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, unit, quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                messageDiv.textContent = data.message;
            }
            if (data.fruit) {
                addFruitToList(data.fruit);
                fruitForm.reset();
            }
        })
        .catch(error => console.error('Hiba:', error));
    });

    // Gyümölcs hozzáadása a Flexbox listához
    function addFruitToList(fruit) {
        const fruitItem = document.createElement('div');
        fruitItem.classList.add('fruit-item');
        
        fruitItem.innerHTML = `
            <h3>${fruit.name}</h3>
            <p>Egységár: <strong>${fruit.price} HUF</strong></p>
            <p>Mennyiség: <strong>${fruit.quantity} ${fruit.unit}</strong></p>
        `;

        fruitList.appendChild(fruitItem);
    }
});
