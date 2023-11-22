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
    // CompareTo method
    compareTo(other) {
        if (this.percentage < other.percentage) {
            return -1;
        }
        if (this.percentage > other.percentage) {
            return 1;
        }
        return 0;
    }
}

// JSON
const jsonUrl = "data/treemap.json";

// Treemap variables
var treemapTitle = "";
var elementsList = [];
var chart = {
    width: 0,
    height: 0
};
window.addEventListener("load", () => {
    chart.width = document.getElementById("treemap-container").offsetWidth;
    chart.height = document.getElementById("treemap-container").offsetHeight;
});



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
// Sort elements : descending order
function sortElements() {
    elementsList.sort((a, b) => b.compareTo(a));
}

// Squarify algorithm
function squarify(data, width, height, parent) {
    if (!data || width <= 0 || height <= 0) {
      return [];
    }
  
    // Triez les données par ordre décroissant de leurs valeurs
    data.sort((a, b) => b.percentage - a.percentage);
  
    // Liste des cellules résultantes
    const cells = [];
  
    // Fonction récursive pour le carrelage
    function squarifyHelper(data, parent, remainingWidth, remainingHeight) {
      if (data.length === 0) {
        return;
      }
  
      const element = data[0];
  
      // Calculez la hauteur en fonction du pourcentage restant
      const elementHeight = (element.percentage / remainingWidth) * remainingHeight;
  
      // Ajoutez la cellule à la liste avec les dimensions appropriées en pourcentage
      const cell = {
        name: element.name,
        percentage: element.percentage,
        imageUrl: element.imageUrl,
        colorHex: element.colorHex,
        isClickable: element.isClickable,
        clickUrl: element.clickUrl,
        x0: parent ? parent.x1 : 0,
        y0: parent ? parent.y1 : 0,
        x1: parent ? parent.x1 + element.percentage : element.percentage,
        y1: parent ? parent.y1 + elementHeight : elementHeight
      };
  
      cells.push(cell);
  
      // Mettez à jour les dimensions disponibles (largeur ou hauteur) en fonction de la valeur de la donnée
      squarifyHelper(
        data.slice(1),
        cell,
        remainingWidth - element.percentage,
        remainingHeight - elementHeight
      );
    }
  
    squarifyHelper(data, null, width, height);
  
    // Mettre à jour les données avec les positions calculées en pixels
    cells.forEach((cell, index) => {
      data[index].x0 = cell.x0 * width;
      data[index].y0 = cell.y0 * height;
      data[index].x1 = cell.x1 * width;
      data[index].y1 = cell.y1 * height;
    });
    return cells;
  }
  
// Treemap creation
function creatTreemap() {
    // Sort elements
    sortElements();
    // Selecting the treemap container
    const treemapContainer = document.getElementById("treemap-container");

    // Check if the container exists and if the data has been recovered
    if (!treemapContainer || elementsList.length === 0) {
        console.error("Treemap container not found or no data available.");
        return;
    }

    // Applying the squarify algorithm
    const treemapData = squarify(elementsList, treemapContainer.offsetWidth, treemapContainer.offsetHeight);

    // Creating the treemap elements
    treemapData.forEach(element => {
        const cell = document.createElement("div");
        cell.className = "treemap-cell";
        cell.style.backgroundColor = element.colorHex;
        cell.textContent = `${element.name} (${element.percentage}%)`;
        // Set the position and size of the cell based on the squarify result
        cell.style.position = "absolute";
        cell.style.left = `${element.x0}px`;
        cell.style.top = `${element.y0}px`;
        cell.style.width = `${element.x1 - element.x0}px`;
        cell.style.height = `${element.y1 - element.y0}px`;

        // Adding the cell to the treemap
        treemapContainer.appendChild(cell);
    });
}

// Run program
readJSON().then(() => creatTreemap());
