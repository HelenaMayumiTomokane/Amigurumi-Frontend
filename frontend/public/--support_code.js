//aba destinada para códigos reutilizáveis

const baseURL = "http://127.0.0.1:5000"

/*------------------- API com a tabela Stitchbook ---------------------------*/
export function APIGet_Stitchbook(){
    return fetch(`${baseURL}/stitchbook`)
        .then(response => response.json())
        .then(data => data)
}



export function APIPost_Stitchbook(amigurumi_id,element_id,number_row,colour_id,stich_sequence,observation){
    return fetch(`${baseURL}/stitchbook`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "amigurumi_id": parseInt(amigurumi_id) ,
            "observation": String(observation),
            "element_id": parseInt(element_id),
            "number_row": parseInt(number_row),
            "colour_id": parseInt(colour_id),
            "stich_sequence": String(stich_sequence),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIPut_Stitchbook(stitchbookIdPut, amigurumi_id, observation, element_id,number_row,colour_id,stich_sequence){
    return fetch(`${baseURL}/stitchbook/line_id`, { 
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "line_id": parseInt(stitchbookIdPut),
                "amigurumi_id": parseInt(amigurumi_id),
                "observation": String(observation),
                "element_id": parseInt(element_id),
                "number_row": parseInt(number_row),
                "colour_id": parseInt(colour_id),
                "stich_sequence": String(stich_sequence),
            })
        })
        .then(response => response.json())
        .then(data => data)
}



export function APIDelete_Stitchbook(stitchbookIdDelete){
    return fetch(`${baseURL}/stitchbook/line_id`, { 
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "line_id": parseInt(stitchbookIdDelete),
            })
        })
        .then(response => response.json())
        .then(data => data)
}



/*------------------- API com a tabela Stitchbook Sequence ---------------------------*/
export function APIGet_Stitchbook_Sequence(){
    return fetch(`${baseURL}/stitchbook_sequence`)
    .then(response => response.json())
    .then(data => data)
}



export function APIPost_Stitchbook_Sequence(amigurumi_id,element_name,element_order,repetition){
    return fetch(`${baseURL}/stitchbook_sequence`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "amigurumi_id": parseInt(amigurumi_id) ,
            "element_name": String(element_name),
            "element_order": parseInt(element_order),
            "repetition": parseInt(repetition),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIPut_Stitchbook_Sequence(element_id,amigurumiId, element_name, element_order,repetition){
    return fetch(`${baseURL}/stitchbook_sequence/element_id`, { 
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "element_id": parseInt(element_id),
            "amigurumi_id":parseInt(amigurumiId),
            "element_order": parseInt(element_order),
            "element_name": String(element_name),
            "repetition": parseInt(repetition),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIDelete_Stitchbook_Sequence(element_id){
    return fetch(`${baseURL}/stitchbook_sequence/element_id`, { 
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "element_id": parseInt(element_id),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



/*------------------- API com a tabela Image ---------------------------*/
export function APIPost_Image(main_image,amigurumi_id,list_id,image_base64){
    return fetch(`${baseURL}/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "main_image": Boolean(main_image),
            "amigurumi_id": parseInt(amigurumi_id),
            "list_id":parseInt(list_id),
            "image_base64": String(image_base64)
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIGet_Image(){
    return fetch(`${baseURL}/image`)
        .then(response => response.json())
        .then(data => data)
}



export function APIPut_Image(image_id,main_image,amigurumi_id,list_id,image_base64){
    return fetch(`${baseURL}/image/image_id`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "image_id": parseInt(image_id),
            "main_image": Boolean(main_image),
            "amigurumi_id": parseInt(amigurumi_id),
            "list_id":parseInt(list_id),
            "image_base64": String(image_base64)
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIDelete_Image(imageId){
    return fetch(`${baseURL}/image/image_id`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "image_id": parseInt(imageId)
        })
    })
    .then(response => response.json())
    .then(data => data)
}



/*------------------- API com a tabela Material ---------------------------*/
export function APIGet_MaterialList(){
    return fetch(`${baseURL}/material_list`)
    .then(response => response.json())
    .then(data => data)
}



export function APIPost_MaterialList(amigurumi_id,material_name,quantity,list_id,colour_id){
    return fetch(`${baseURL}/material_list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "amigurumi_id": parseInt(amigurumi_id),
            "material_name": String(material_name),
            "quantity": String(quantity),
            "list_id": parseInt(list_id),
            "colour_id": parseInt(colour_id),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIPut_MaterialList(materialId, material_name, quantity,list_id,colour_id,amigurumi_id){
    return fetch(`${baseURL}/material_list/material_id`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "material_id":parseInt(materialId),
            "material_name": String(material_name),
            "quantity": String(quantity),
            "list_id": parseInt(list_id),
            "colour_id": parseInt(colour_id),
            "amigurumi_id": parseInt(amigurumi_id),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIDelete_MaterialList(materialId){
    return fetch(`${baseURL}/material_list/material_id`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "material_id": parseInt(materialId)
        })
    })
    .then(response => response.json())
    .then(data => data)
}



/*------------------- API com a tabela Foundation ---------------------------*/
export function APIGet_FoundationList(){
    return fetch(`${baseURL}/foundation_list`)
        .then(response => response.json())
        .then(data => data)
}



export function APIPost_FoundationList(nameAmigurumi,autorAmigurumi,sizeAmigurumi,linkAmigurumi,relationship){
    return fetch(`${baseURL}/foundation_list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "name": String(nameAmigurumi),
            "autor": String(autorAmigurumi),
            "size": parseFloat(sizeAmigurumi),
            "link": String(linkAmigurumi),
            "relationship": parseInt(relationship),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIPut_FoundationList(amigurumi_id,name,autor,size,link,relationship,date){
    return fetch(`${baseURL}/foundation_list/amigurumi_id`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "amigurumi_id": parseInt(amigurumi_id),
            "name": String(name),
            "autor": String(autor),
            "size": parseFloat(size),
            "link": String(link),
            "relationship": parseInt(relationship),
            "date": new Date(date)
        })
    })
    .then(response => response.json())
    .then(data => data)
}



export function APIDelete_FoundationList(amigurumi_id){
    return fetch(`${baseURL}/foundation_list/amigurumi_id`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "amigurumi_id": parseInt(amigurumi_id),
        })
    })
    .then(response => response.json())
    .then(data => data)
}



/*------------------- Código para criação de cards dos amigurumis, que levam para a página de Receitas ---------------------------*/
export function createAmigurumiImageCard(cardID, filteredData){
    const cardAmigurumi = document.getElementById(cardID);
    cardAmigurumi.innerHTML = "";

    const uniqueIds = new Set();

    filteredData.forEach(amigurumi => {
        if (!uniqueIds.has(amigurumi.amigurumi_id)) {
            uniqueIds.add(amigurumi.amigurumi_id);
            
            const card = document.createElement("div");
            card.className = "cardAmigurumi";

            APIGet_Image()
                .then(imageData => {
                    const imageSrcArray = imageData
                        .filter(row => parseInt(row.amigurumi_id) == parseInt(amigurumi.amigurumi_id))
                        .map(row => row.image_base64); 

                    let currentIndex = 0;

                    const imageElement = document.createElement('img');
                    imageElement.src = `data:image/jpeg;base64,${imageSrcArray[currentIndex]}`
                    imageElement.alt = amigurumi.name;
                    imageElement.id = "cardAmigurumiImage";

                    function showPreviousImage() {
                        currentIndex = (currentIndex - 1 + imageSrcArray.length) % imageSrcArray.length;
                        imageElement.src = `data:image/jpeg;base64,${imageSrcArray[currentIndex]}`;
                    }
                    
                    function showNextImage() {
                        currentIndex = (currentIndex + 1) % imageSrcArray.length;
                        imageElement.src = `data:image/jpeg;base64,${imageSrcArray[currentIndex]}`;
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
                    link.href = `_receita.html?id=${amigurumi.amigurumi_id}`;
                    link.textContent = 'Ver Mais';
                    

                    card.appendChild(titleElement);
                    card.appendChild(imageElement);
                    card.appendChild(prevButton);
                    card.appendChild(nextButton);
                    card.appendChild(link);
                    

                    cardAmigurumi.appendChild(card);
                })
        }
    });
}


/*------------------- Código para adicição de um novo amigurumi ---------------------------*/
export function addNewAmigurumiFoundation(relationship) {
    let overlay = document.createElement("div");
    overlay.id = "modalOverlayAmigurumi";
    document.body.appendChild(overlay);

    let modal = document.createElement("div");
    modal.id = "addNewAmigurumiBox";
    modal.innerHTML = `
        <h3>Adicionar um Novo Amigurumi</h3>
        <label>Nome*: <input type="text" id="editName" required></label><br><br>
        <label>Autor*: <input type="text" id="editAuthor" required></label><br><br>
        <label>Tamanho (cm)*: <input type="number" id="editSize" required></label><br><br>
        <label>Link: <input type="url" id="editLink" required></label><br><br>
        <button id="saveEdit">Salvar</button>
        <button id="cancelEdit">Cancelar</button>
    `;

    document.body.appendChild(modal);

    document.getElementById("saveEdit").addEventListener("click", function () {

        const nameAmigurumi = document.getElementById("editName").value
        const autorAmigurumi =  document.getElementById("editAuthor").value
        const sizeAmigurumi = parseFloat(document.getElementById("editSize").value)
        const linkAmigurumi =  document.getElementById("editLink").value       

        APIPost_FoundationList(nameAmigurumi,autorAmigurumi,sizeAmigurumi,linkAmigurumi,relationship)
        .then(data => {
            if(data.message !== undefined){
                alert(data.message)
                window.location.href = `_receita.html?id=${data.amigurumi_id}`
            }else{
                const errorMessage = data.map(err => {
                    const field = err.loc?.join('.') || 'campo desconhecido';
                    return `Error in field "${field}": ${err.msg} (${err.type})`;
                }).join('\n');

                alert(errorMessage);
            }           
        })

        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    });

    document.getElementById("cancelEdit").addEventListener("click", function () {
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    })

}