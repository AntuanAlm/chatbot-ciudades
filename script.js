window.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('chat_form');
    const input = document.getElementById('user_input');
    const chatBox = document.getElementById('chat_box');

    let ultimaCiudad = '';
    let ultimaConsulta = ''; // "clima", "comida" o "ambos"

    // --- MENSAJE DE BIENVENIDA AUTOMÁTICO ---
    mostrarBot('¡Hola! Soy el bot que te ayuda a conocer el clima 🌤️ y la gastronomía 🍽️ de las ciudades más turísticas de España. ¿Con qué ciudad te puedo ayudar?');

    function mostrarBot(mensaje) {
        const botMsg = document.createElement('p');
        botMsg.className = 'bot';
        botMsg.textContent = '🤖 Bot: ' + mensaje;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function normalizar(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function extraerCiudad(texto) {
        texto = normalizar(texto);
        for (let ciudad in comidasTipicas) {
            if (texto.includes(ciudad)) return ciudad;
        }
        return null;
    }

    const traduccionesClima = {
        "sunny": "soleado ☀️",
        "clear": "despejado 🌤️",
        "partly cloudy": "parcialmente nublado ⛅",
        "cloudy": "nublado ☁️",
        "overcast": "cubierto 🌥️",
        "mist": "niebla 🌫️",
        "light rain": "lluvia ligera 🌧️",
        "moderate rain": "lluvia moderada 🌧️",
        "heavy rain": "lluvia fuerte 🌧️🌧️",
        "snow": "nieve ❄️",
        "thunder": "tormenta ⛈️"
    };

    const comidasTipicas = {
  "madrid": ["Cocido madrileño", "Bocadillo de calamares", "Callos a la madrileña"],
  "barcelona": ["Pa amb tomàquet", "Esqueixada", "Crema catalana"],
  "valencia": ["Paella", "Horchata", "Fideuà"],
  "sevilla": ["Gazpacho", "Salmorejo", "Tortilla de camarones"],
  "granada": ["Tortilla del Sacromonte", "Piononos", "Remojón granadino"],
  "cordoba": ["Salmorejo", "Flamenquín", "Rabo de toro"],
  "malaga": ["Espeto de sardinas", "Porra antequerana", "Ajoblanco"],
  "cadiz": ["Pescaito frito", "Tortillitas de camarones", "Atún encebollado"],
  "almeria": ["Caldo quemao", "Gurullos", "Cherigan"],
  "huelva": ["Gambas blancas", "Jamón de Jabugo", "Choco frito"],
  "jaen": ["Andrajos", "Pipirrana", "Aceitunas aliñadas"],
  "jerez": ["Rabo de toro", "Tapa de jamón", "Langostinos"],
  "marbella": ["Espeto de sardinas", "Gazpacho", "Pescaito frito"],
  "ronda": ["Queso de cabra", "Chivo lechal", "Tortilla de espárragos"],
  "antequera": ["Mollete", "Porra antequerana", "Bienmesabe"],
  "ubeda": ["Andrajos", "Aceite de oliva", "Migas"],
  "baza": ["Cordero segureño", "Migas", "Tortilla de espárragos"],
  "motril": ["Quisquillas", "Espetos", "Pulpo seco"],
  "algeciras": ["Pescado frito", "Tortillitas de camarones", "Gazpacho"],
  "los barrios": ["Arroz caldoso", "Atún encebollado", "Pescado a la sal"],
  "sanlucar": ["Langostinos", "Manzanilla", "Acedías"],
  "el puerto de santa maria": ["Mariscos", "Fideos con caballa", "Tortillitas de camarones"],
  "bilbao": ["Bacalao al pil-pil", "Pintxos", "Txangurro"],
  "zaragoza": ["Borraja", "Ternasco de Aragón", "Huevos al salmorejo"],
  "alicante": ["Arroz a banda", "Turrón", "Caldero"],
  "coruña": ["Pulpo a feira", "Empanada gallega", "Lacón con grelos"],
  "valladolid": ["Lechazo asado", "Queso de Villalón", "Sopa de ajo"],
  "murcia": ["Zarangollo", "Caldero del Mar Menor", "Pastel de carne"],
  "salamanca": ["Hornazo", "Jamón de Guijuelo", "Chanfaina"],
  "san sebastian": ["Pintxos", "Txuleta", "Kokotxas de merluza"],
  "palma": ["Ensaimada", "Sobrasada", "Frito mallorquín"],
  "oviedo": ["Fabada asturiana", "Cachopo", "Sidra"],
  "santander": ["Rabas", "Sobaos", "Anchoas"],
  "gijon": ["Cachopo", "Fabada", "Sidra"],
  "burgos": ["Morcilla de Burgos", "Queso de Burgos", "Olla podrida"],
  "segovia": ["Cochinillo", "Judiones de la Granja", "Ponche segoviano"],
  "toledo": ["Mazapán", "Carcamusas", "Venado estofado"],
  "cuenca": ["Morteruelo", "Zarajos", "Alajú"],
  "teruel": ["Jamón de Teruel", "Migas", "Trufa negra"],
  "soria": ["Torreznos", "Mantequilla de Soria", "Cordero asado"],
  "leon": ["Cecina", "Botillo", "Sopa de ajo"],
  "ponferrada": ["Botillo", "Empanada berciana", "Pimientos asados"],
  "vigo": ["Mariscos", "Pulpo a feira", "Empanada gallega"],
  "lugo": ["Lacón con grelos", "Pulpo", "Queso de tetilla"],
  "ourense": ["Pulpo a feira", "Empanada", "Chorizo"],
  "pamplona": ["Chistorra", "Pimientos del piquillo", "Estofado de toro"],
  "logroño": ["Patatas a la riojana", "Chorizo", "Vino de Rioja"],
  "ciudad real": ["Duelos y quebrantos", "Pisto manchego", "Queso manchego"],
  "albacete": ["Atascaburras", "Gazpachos manchegos", "Miguelitos"],
  "guadalajara": ["Cabrito asado", "Tarta de miel", "Sopa de ajo"],
  "talavera": ["Perdiz estofada", "Mazapán", "Queso"],
  "avila": ["Yemas de Santa Teresa", "Chuletón de Ávila", "Judías del Barco"],
  "zamora": ["Pulpo a la sanabresa", "Bacalao a la tranca", "Arroz a la zamorana"],
  "benidorm": ["Arroz con costra", "Caldereta", "Helado artesanal"],
  "calvia": ["Coca de trampó", "Frito mallorquín", "Ensaimada"],
  "san bartolomé de tirajana": ["Papas arrugadas", "Mojo picón", "Gofio escaldado"],
  "adeje": ["Conejo en salmorejo", "Ropa vieja", "Queso de cabra"],
  "salou": ["Suquet de peix", "Arroz negro", "Romesco"],
  "lloret de mar": ["Mariscos", "Paella marinera", "Crema catalana"],
  "pájara": ["Cabrito al horno", "Gofio", "Pescado a la sal"],
  "santiago de compostela": ["Tarta de Santiago", "Pulpo a feira", "Empanada gallega"],
"las palmas": ["Papas arrugadas", "Sancocho canario", "Bienmesabe"],
"santa cruz de tenerife": ["Carne fiesta", "Ropa vieja", "Queso de cabra"],
"arrecife": ["Sancocho", "Pescado a la sal", "Gofio"],
"puerto del rosario": ["Cabrito al horno", "Gofio escaldado", "Papas arrugadas"],
"san cristóbal de la laguna": ["Ropa vieja", "Queso de flor", "Gofio"],
"telde": ["Papas arrugadas", "Gofio", "Carne de cabra"],
"agüimes": ["Carne de cochino", "Gofio escaldado", "Papas arrugadas"],
"la orotava": ["Conejo en salmorejo", "Puchero canario", "Gofio"],
"granadilla de abona": ["Papas arrugadas", "Mojo picón", "Pescado fresco"],
"san isidro": ["Papas arrugadas", "Gofio", "Carne fiesta"]

};


    const saludos = /\b(hola|buenos días|buenas tardes|buenas noches|hey|hi|hola chaval|saludos|qué tal|buen día|buenas|holi|holita|buenas noches|buenas tardes|buenos dias|hello|ola|saluditos|qué pasa|que pasa|buenas a todos|buenas a todas|buenas gente|buenas equipo)\b/i;
    const gracias = /\b(gracias|muchas gracias|mil gracias|ok|okey| vale vale)\b/i;
    const no = /\b(no|nop|na|nada|nope|negativo|nunca|jamás|de ninguna manera|ni hablar|en absoluto|de ningún modo)\b/i;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        const userMsg = document.createElement('p');
        userMsg.className = 'user';
        userMsg.textContent = '🧑 Tú: ' + text;
        chatBox.appendChild(userMsg);

        input.value = '';
        input.focus();
        chatBox.scrollTop = chatBox.scrollHeight;

        const lower = text.toLowerCase();
        const quiereComida = /\b(comida|comidas|plato|típico|típica)\b/i.test(lower);
        const quiereClima = /\b(clima|tiempo|temperatura|viento)\b/i.test(lower);
        const quiereAmbos = /\b(las dos|las dos cosas|ambas|ambos)\b/i.test(lower);

        // --- SALUDOS ---
        if (saludos.test(lower)) {
            mostrarBot('¡Hola! 😊 ¿De qué ciudad española quieres saber el clima 🌤️ o la comida típica 🍽️?');
            return;
        }

        // --- GRACIAS ---
        if (gracias.test(lower)) {
            mostrarBot('De nada 😄. ¿Quieres saber algo de otra ciudad española?');
            return;
        }

        let ciudad = extraerCiudad(lower);
        if (!ciudad && ultimaCiudad) ciudad = ultimaCiudad;

        // --- No ---
        if (no.test(lower)) {
            mostrarBot('Entiendo. Si necesitas algo más, solo dime el nombre de una ciudad española.');
            return;
        }

        // --- CIUDAD NO VÁLIDA ---
        if (!ciudad) {
            mostrarBot('❗ Lo siento, solo hablo de ciudades españolas y estamos mejorando el chatbot. Por favor, dime otra ciudad española.');
            return;
        }

        ultimaCiudad = ciudad;

        // --- RESPUESTA SEGÚN CONSULTA ---
        if (quiereAmbos || (quiereComida && quiereClima)) {
            obtenerClima(ciudad).then(climaMsg => {
                const comidaMsg = obtenerComida(ciudad);
                mostrarBot(`${climaMsg}\n${comidaMsg}`);
                ultimaConsulta = 'ambos';
            });
            return;
        }

        if (quiereClima) {
            obtenerClima(ciudad).then(climaMsg => {
                mostrarBot(climaMsg);
                ultimaConsulta = 'clima';
            });
            return;
        }

        if (quiereComida) {
            mostrarBot(obtenerComida(ciudad));
            ultimaConsulta = 'comida';
            return;
        }

        mostrarBot('¿Quieres saber el clima 🌤️, la comida típica 🍽️ o las dos cosas 🤔?');
    });

    function obtenerComida(ciudad) {
        const comidas = comidasTipicas[ciudad];
        return comidas
            ? `🍽️ En ${ciudad}, algunos platos típicos son: ${comidas.map(c => `🍴 ${c}`).join(', ')}.`
            : `😕 No tengo información de comida típica para "${ciudad}".`;
    }

    function obtenerClima(ciudad) {
        return fetch(`https://wttr.in/${encodeURIComponent(ciudad)}?format=j1`)
            .then(res => res.json())
            .then(data => {
                if (data && data.current_condition && data.current_condition[0]) {
                    const cond = data.current_condition[0];
                    const temp = cond.temp_C;
                    let desc = cond.weatherDesc[0].value.toLowerCase();
                    desc = traduccionesClima[desc] || desc;
                    const wind = cond.windspeedKmph;
                    return `🌤️ En ${ciudad}, la temperatura es ${temp}°C, ${desc} y el viento es de ${wind} km/h 💨.`;
                } else {
                    return `😕 No pude obtener el clima para "${ciudad}".`;
                }
            })
            .catch(() => '⚠️ Hubo un error al obtener los datos meteorológicos.');
    }

});
