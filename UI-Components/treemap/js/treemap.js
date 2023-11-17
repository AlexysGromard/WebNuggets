// Element Class : TreemapElement
class TreemapElement {
    constructor(name, percentage, imageUrl, colorHex, isClickable, clickUrl) {
        this.name = name;
        this.percentage = percentage;
        this.imageUrl = imageUrl;
        this.colorHex = colorHex;
        this.isClickable = isClickable;
        this.clickUrl = clickUrl;
    }
}

// JSON
const jsonUrl = "../data/treemap.json";

// Treemap variables
var treemapTitle = "";
var elementsList = [];

// JSON reader
async function readJSON() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error("An error occurred while accessing the file.");
        }
        const data = await response.json();
        treemapTitle = data.title;
        // Creating a new item
        data.elements.forEach(element => {
            elementsList.push(new TreemapElement(element.name, element.percentage, element.imageUrl, element.colorHex, element.isClickable, element.clickUrl));
        });
    } catch (error) {
        console.error("There was an error with data recovery", error);
    }
}

// Treemap creation
function creatTreemap() {
    // Selecting the treemap container
    const treemapContainer = document.getElementById("treemap-container");

    // Check if the container exists and if the data has been recovered
    if (!treemapContainer || elementsList.length === 0) {
        console.error("Treemap container not found or no data available.");
        return;
    }

    // Creating the treemap elements
    elementsList.forEach(element => {
        const cell = document.createElement("div");
        cell.className = "treemap-cell";
        cell.style.backgroundColor = element.colorHex;
        cell.textContent = `${element.name} (${element.percentage}%)`;
        // Calculating the size of the cell
        cell.style.width = `${element.percentage}%`;
        cell.style.height = `${element.percentage}%`;
        // Adding the cell to the treemap
        treemapContainer.appendChild(cell);
    });
}



// Run program
readJSON().then(() => creatTreemap());
