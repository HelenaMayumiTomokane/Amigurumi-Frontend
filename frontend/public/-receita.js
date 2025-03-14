import * as API from './--api.js';

var urlParams = new URLSearchParams(window.location.search);
var amigurumiId = urlParams.get("id").split("?")[0];

// ------------------ Construção dos Dados -------------------------- \\

function loadStitchbookTable() {
    API.APIGet_Stitchbook()
        .then(data => {
            const stitchbookList = document.getElementById("data_stitchbookList");
            stitchbookList.innerHTML = "";

            var urlParams = new URLSearchParams(window.location.search);
            var amigurumiId = urlParams.get("id").split("?")[0];

            data
            .filter(row => parseInt(row.amigurumi_id) === parseInt(amigurumiId))
            .forEach(row => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td><input type="text" name="element" value="${row.element || ""}"></td>
                    <td><input type="text" name="colour" value="${row.colour || ""}"></td>
                    <td><input type="number" name="number_row" value="${row.number_row || ""}"></td>
                    <td><input type="text" name="stich_sequence" value="${row.stich_sequence || ""}"></td>
                    <td><input type="text" name="observation" value="${row.observation || ""}"></td>
                    <td>
                        <button class="btn-edit" data-id="${row.line_id}">Alterar no BD</button>
                        <button class="btn-remove" data-id="${row.line_id}">Deletar no BD</button>
                    </td>
                `;

                const removeButton = tr.querySelector(".btn-remove");
                const editButton = tr.querySelector(".btn-edit");

                removeButton.addEventListener("click", function () {
                    const stitchbookIdDelete = this.getAttribute("data-id");

                    API.APIDelete_Stitchbook(stitchbookIdDelete)
                    .then(data => {
                        alert(data.message)
                        loadStitchbookTable()
                    })
                });

                editButton.addEventListener("click", function () {
                    const stitchbookIdPut = this.getAttribute("data-id");

                    const element = tr.querySelector('input[name="element"]').value;
                    const number_row = tr.querySelector('input[name="number_row"]').value;
                    const colour = tr.querySelector('input[name="colour"]').value;
                    const stich_sequence = tr.querySelector('input[name="stich_sequence"]').value;
                    const observation = tr.querySelector('input[name="observation"]').value;

                    API.APIPut_Stitchbook(stitchbookIdPut, amigurumiId, observation, element,number_row,colour,stich_sequence)
                    .then(data => {
                        alert(data.message)
                        loadStitchbookTable()
                    })
                    
                });

                stitchbookList.appendChild(tr);
            });
        });
}


function addRowStitchbookTable() {
    var urlParams = new URLSearchParams(window.location.search);
    var amigurumiId = urlParams.get("id").split("?")[0];
    const table = document.getElementById("table_stitchbookList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><input type="text" name="element" required></td>
        <td><input type="number" name="number_row" required></td>
        <td><input type="text" name="colour" required></td>
        <td><input type="text" name="stich_sequence" required></td>
        <td><input type="text" name="observation" required></td>
        <td>
            <button class="addStitch-btn">Adicionar no BD</button>
            <button class="deleteStitch-btn">Remover Ponto</button>
        </td>
    `;

    const addButton = newRow.querySelector(".addStitch-btn");
    const deleteButton = newRow.querySelector(".deleteStitch-btn");

    addButton.addEventListener("click", function() {
        const element = newRow.querySelector('input[name="element"]').value;
        const number_row = newRow.querySelector('input[name="number_row"]').value;
        const colour = newRow.querySelector('input[name="colour"]').value;
        const stich_sequence = newRow.querySelector('input[name="stich_sequence"]').value;
        const observation = newRow.querySelector('input[name="observation"]').value;


        API.APIPost_Stitchbook(amigurumiId,element,number_row,colour,stich_sequence,observation)
        .then(data => {
            alert(data.message)
            loadStitchbookTable()
        })
    });

    deleteButton.addEventListener("click", function() {
        removeRow(deleteButton);
    });
}



// ------------------ tabela de Imagem -------------------------- \\
function loadImagemTable(){
    API.APIGet_Image()
        .then(imageData => {
            const container = document.getElementById("cardAmigurumiRecipeImage");
            container.innerHTML = "";

            const filteredImages = imageData
                .filter(row => parseInt(row.amigurumi_id) === parseInt(amigurumiId));

            if (filteredImages.length === 0) return;

            const imageSrcArray = filteredImages.map(row => row.image_route);

            let currentIndex = 0;

            const imageElement = document.createElement('img');
            imageElement.src =  `http://localhost:8000/${imageSrcArray[currentIndex]}`;
            imageElement.id = "amigurumiRecipeImageDisplay";
  
            function showPreviousImage() {
                currentIndex = (currentIndex - 1 + imageSrcArray.length) % imageSrcArray.length;
                imageElement.src =  `http://localhost:8000/${imageSrcArray[currentIndex]}`;
            }
            
            function showNextImage() {
                currentIndex = (currentIndex + 1) % imageSrcArray.length;
                imageElement.src =  `http://localhost:8000/${imageSrcArray[currentIndex]}`;
            }
            
            const nextButton = document.createElement('button_next_previous');
            nextButton.innerText = ">";
            nextButton.addEventListener('click', showNextImage); 

            const prevButton = document.createElement('button_next_previous');
            prevButton.innerText = "<";
            prevButton.addEventListener('click', showPreviousImage);

            container.appendChild(imageElement);
            container.appendChild(prevButton);
            container.appendChild(nextButton);
        });

}


function createImageEditBox() {
    if (document.getElementById("editImageBox")) {
        return; 
    }

    var urlParams = new URLSearchParams(window.location.search);
    var amigurumiId = urlParams.get("id").split("?")[0];

    API.APIGet_Image()
        .then(data => {
            let overlay = document.createElement("div");
            overlay.id = "modalOverlayImage";
            document.body.appendChild(overlay);

            let modal = document.createElement("div");
            modal.id = "editImageBox";

            modal.innerHTML = `
                <h3>Adicionar ou Excluir Imagem do Amigurumi</h3>
                <label>URL da Imagem: <input type="url" id="editImageUrl" placeholder="Cole a URL da imagem"></label><br><br>
                <label>Observação: <input type="text" id="editImageObs" placeholder="Adicione uma observação"></label><br><br>
                <label>Imagem Principal: <input type="checkbox" id="editImagePrincipal"></label><br><br>

                <button id="saveImageEdit">Salvar</button>
                <button id="cancelImageEdit" class="cancel-btn">Cancelar</button>
                <hr>
                <h4>Imagens Existentes</h4>
                <ul id="imageList">
                    ${data
                        .filter(row=> parseInt(row.amigurumi_id) === parseInt(amigurumiId))
                        .map(image => `
                        <li>
                            <img src= http://localhost:8000/"${image.image_route}" alt="Imagem">
                            <span>${image.observation}</span>
                            <span>${image.main_image}</span>
                            <button class="deleteImageBtn" data-id="${image.image_id}">Excluir</button>
                        </li>
                    `).join('')}
                </ul>
            `;

            document.body.appendChild(modal);

            document.getElementById("saveImageEdit").addEventListener("click", function () {

                const main_image = document.getElementById("editImagePrincipal").value == "on"? true: false
                const image_route = document.getElementById("editImageUrl").value
                const observation = document.getElementById("editImageObs").value
                const amigurumi_id = amigurumiId

                API.APIPost_Image(main_image,image_route,observation,amigurumi_id)
                .then(data => {
                    alert(data.message)
                    loadImagemTable()
                })

                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });

            document.getElementById("cancelImageEdit").addEventListener("click", function () {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });

            const deleteBtns = document.querySelectorAll('.deleteImageBtn');
            deleteBtns.forEach(btn => {
                btn.addEventListener("click", function() {
                    const imageId = btn.getAttribute("data-id");

                    API.APIDelete_Image(imageId)
                    .then(data => {
                        alert(data.message)
                        loadImagemTable()
                        btn.parentElement.remove();
                    })
                });
            });
        })
}







// ------------------ tabela de Lista de Materiais -------------------------- \\
function loadMaterialTable(){
    API.APIGet_MaterialList()
        .then(data => {
            let listContainer = document.getElementById("data_amigurumi_material");
            listContainer.innerHTML = "";

            let title = document.createElement("h2");
            title.innerHTML = "Lista de Materiais";
            listContainer.appendChild(title);

            let ul = document.createElement("ul");

            data
            .filter(row => parseInt(row.amigurumi_id) === parseInt(amigurumiId))
            .forEach(material => {
                let li = document.createElement("li");

                li.innerHTML = `
                    <input type="text" name="material" value="${material.material}">
                    <input type="number" name="quantity" value="${material.quantity}" min="0">
                    <input type="text" name="unit" value="${material.unit}">
                    <button class="btn-save" data-id="${material.material_list_id}">Alterar</button>
                    <button class="btn-remove" data-id="${material.material_list_id}">Remover</button>
                `;

                ul.appendChild(li);

                let saveButton = li.querySelector(".btn-save");
                saveButton.addEventListener("click", function () {
                    let materialId = this.getAttribute("data-id");
                    let updatedMaterial = li.querySelector('input[name="material"]').value;
                    let updatedQuantity = li.querySelector('input[name="quantity"]').value;
                    let updatedUnit = li.querySelector('input[name="unit"]').value;

                    API.APIPut_MaterialList(materialId, updatedMaterial, updatedQuantity, updatedUnit)
                    .then(data => alert(data.message))
                });

                let removeButton = li.querySelector(".btn-remove");
                removeButton.addEventListener("click", function () {
                    let materialId = this.getAttribute("data-id");

                    API.APIDelete_MaterialList(materialId)
                    .then(data => {
                        alert(data.message)
                        li.remove()
                    })
                });
            });

            listContainer.appendChild(ul);
    });
}

function addRowMaterialTable() {
    var urlParams = new URLSearchParams(window.location.search);
    var amigurumiId = urlParams.get("id").split("?")[0];

    const table = document.getElementById("table_amigurumi_material").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><input type="text" name="material" required></td>
        <td><input type="number" name="quantity" required min="0"></td>
        <td><input type="text" name="unit" required></td>
        <td>
            <button class="addMaterial-btn">Adicionar no BD</button>
            <button class="deleteMaterial-btn">Remover Linha</button>
        </td>
    `;

    const addButton = newRow.querySelector(".addMaterial-btn");
    const deleteButton = newRow.querySelector(".deleteMaterial-btn");

    addButton.addEventListener("click", function() {
        const material = newRow.querySelector('input[name="material"]').value;
        const quantity = newRow.querySelector('input[name="quantity"]').value;
        const unit = newRow.querySelector('input[name="unit"]').value;

        API.APIPost_MaterialList(amigurumiId,material,quantity,unit)
        .then(data => {
            alert(data.message)
            loadMaterialTable()
        })
    });

    deleteButton.addEventListener("click", function() {
        removeRow(deleteButton);
    });
}






// ------------------ tabela de Dados Básicos -------------------------- \\
function loadInformatianAmigurumi(){
    API.APIGet_FoundationList()
        .then(data => {
            data
            .filter(row=> parseInt(row.amigurumi_id) == parseInt(amigurumiId))
            .forEach(foundation_list => {

                const amigumi_name = document.getElementById("amigurmi_name_recipe")
                amigumi_name.textContent = foundation_list.name

                const amigumi_size = document.getElementById("amigurmi_name_size")
                amigumi_size.textContent = "Tamanho: " + foundation_list.size;

                const amigumi_autor = document.getElementById("amigurmi_name_autor")
                amigumi_autor.textContent = "Criador: " + foundation_list.autor;
            });
    })

}


function createEditBox() {
    if (document.getElementById("editAmigurumiBox")) {
        return;
    }

    var urlParams = new URLSearchParams(window.location.search);
    var amigurumiId = urlParams.get("id").split("?")[0];

    API.APIGet_FoundationList()
        .then(data => {
            const amigurumiData = data.find(row => parseInt(row.amigurumi_id) === parseInt(amigurumiId));

            if (!amigurumiData) {
                alert("Amigurumi não encontrado!");
                return;
            }

            let overlay = document.createElement("div");
            overlay.id = "modalOverlayAmigurumi";
            document.body.appendChild(overlay);

            let modal = document.createElement("div");
            modal.id = "editAmigurumiBox";

            modal.innerHTML = `
                <h3>Editar Amigurumi</h3>
                <label>Nome: <input type="text" id="editName" value="${amigurumiData.name}"></label><br><br>
                <label>Autor: <input type="text" id="editAuthor" value="${amigurumiData.autor}"></label><br><br>
                <label>Tamanho: <input type="number" id="editSize" value="${amigurumiData.size}"></label><br><br>
                <label>Link: <input type="url" id="editLink" value="${amigurumiData.link}"></label><br><br>
                <label>ID Amigurumi Vinculado: <input type="number" id="editLinkedId" value="${amigurumiData.amigurumi_id_of_linked_amigurumi}"></label><br><br>
                <label>Observação: <input type="text" id="editObs" value="${amigurumiData.obs}"></label><br><br>
                <button id="saveEdit">Salvar</button>
                <button id="cancelEdit">Cancelar</button>
            `;

            document.body.appendChild(modal);

            document.getElementById("saveEdit").addEventListener("click", function () {

                const amigurumi_id = amigurumiId
                const name = document.getElementById("editName").value
                const autor = document.getElementById("editAuthor").value
                const size = document.getElementById("editSize").value
                const link = document.getElementById("editLink").value
                const amigurumi_id_of_linked_amigurumi = document.getElementById("editLinkedId").value
                const obs = document.getElementById("editObs").value
 
                API.APIPut_FoundationList(amigurumi_id,name,autor,size,link,amigurumi_id_of_linked_amigurumi,obs)
                .then(data =>{
                    alert(data.message)
                    loadMaterialTable()
                    loadInformatianAmigurumi()
                })

                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });

            document.getElementById("cancelEdit").addEventListener("click", function () {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });
        })
}



function deleteAmigurumi(){
    var urlParams = new URLSearchParams(window.location.search);
    var amigurumi_id = urlParams.get("id").split("?")[0]

    API.APIDelete_FoundationList(amigurumi_id)
    .then(data => {
        alert(data.message)
        window.location.href = "_amigurumi.html"
    })
}



// ------------------ Card de Novas Receitas -------------------------- \\
function loadNewCardsBellow(){
    API.APIGet_FoundationList()
        .then(data => {
            const cardAmigurumi = document.getElementById("cardAmigurumi");
            cardAmigurumi.innerHTML = "";

            const filteredData = data.filter(row => parseInt(row.amigurumi_id_of_linked_amigurumi) === parseInt(amigurumiId));

            if (filteredData.length === 0) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = "Parece que não encontramos nada relacionado a esse item. Não desanime! Tente explorar outras opções incríveis!";
                cardAmigurumi.appendChild(noResultsMessage);
            } else {
                filteredData.forEach(amigurumi => {
                    const card = document.createElement("div");
                    card.className = "cardAmigurumi";

                    API.APIGet_Image()
                        .then(imageData => {
                            const imageSrcArray = imageData
                                .filter(row => row.amigurumi_id == amigurumi.amigurumi_id)
                                .map(row => row.image_route); 

                            let currentIndex = 0;

                            const imageElement = document.createElement('img');
                            imageElement.src = `http://localhost:8000/${imageSrcArray[currentIndex]}`;
                            imageElement.alt = amigurumi.name;
                            imageElement.id = "cardAmigurumiImage";

                            function showPreviousImage() {
                                currentIndex = (currentIndex - 1 + imageSrcArray.length) % imageSrcArray.length;
                                imageElement.src =  `http://localhost:8000/${imageSrcArray[currentIndex]}`;
                            }
                            
                            function showNextImage() {
                                currentIndex = (currentIndex + 1) % imageSrcArray.length;
                                imageElement.src =  `http://localhost:8000/${imageSrcArray[currentIndex]}`;
                            }

                            const nextButton = document.createElement('button_next_previous');
                            nextButton.innerText = ">";
                            nextButton.addEventListener('click', showNextImage); 

                            const prevButton = document.createElement('button_next_previous');
                            prevButton.innerText = "<";
                            prevButton.addEventListener('click', showPreviousImage);

                            const titleElement = document.createElement('h3');
                            titleElement.textContent = amigurumi.name;

                            const link = document.createElement('a');
                            link.href = `_receita.html?id=${amigurumi.amigurumi_id}?name=${amigurumi.name}`;
                            link.textContent = 'Ver Mais';

                            card.appendChild(titleElement);
                            card.appendChild(imageElement);
                            card.appendChild(prevButton);
                            card.appendChild(nextButton);
                            card.appendChild(link);

                            cardAmigurumi.appendChild(card);
                        })
                });
            }
        })
}




document.addEventListener("DOMContentLoaded", () => {
    loadNewCardsBellow();
    loadInformatianAmigurumi();
    loadStitchbookTable();
    loadImagemTable();
    loadMaterialTable();
});

document.getElementById("amigurumi_image_edit").addEventListener("click", createImageEditBox);
document.getElementById("amigurumi_edit").addEventListener("click", createEditBox);
document.getElementById("delete_amigurumi").addEventListener("click", deleteAmigurumi);
document.getElementById('add_material').addEventListener('click', addRowMaterialTable)
document.getElementById('add_stitchbook').addEventListener('click', addRowStitchbookTable)




// ------------------ Complementares -------------------------- \\
function removeRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
