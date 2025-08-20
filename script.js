
const subjects = [
    { name: "Razonamiento Verbal", desc: "Desarrolla tus habilidades verbales y comprensión lectora.", link: "https://denismatcv.blogspot.com/p/razonamiento-verbal.html?m=1", img: "img/razonamiento.jpg" },
    { name: "Aritmética", desc: "Aprende operaciones básicas, fracciones y más.", link: "#", img: "img/aritmetica.jpg" },
    { name: "Álgebra", desc: "Ecuaciones, expresiones algebraicas y funciones.", link: "#", img: "img/algebra.jpg" },
    { name: "Geometría", desc: "Figuras, áreas y propiedades geométricas.", link: "#", img: "img/geometria.jpg" },
    { name: "Física", desc: "Conceptos fundamentales de la física y su aplicación.", link: "#", img: "img/fisica.jpg" }
];

const grid = document.getElementById("subjects-grid");
const search = document.getElementById("search");

function displaySubjects(filter = "") {
    grid.innerHTML = "";
    const filtered = subjects.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(sub => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${sub.img}" alt="${sub.name}">
            <div class="card-content">
                <h3>${sub.name}</h3>
                <p>${sub.desc}</p>
                <a href="${sub.link}" target="_blank">Ver más</a>
            </div>`;
        grid.appendChild(card);
    });
}

search.addEventListener("input", e => displaySubjects(e.target.value));
document.addEventListener("DOMContentLoaded", () => displaySubjects());
