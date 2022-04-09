const baseURL = "http://localhost:8080/api"

function htmlizeResponse(res) {
    return (
        '<div class="alert alert-secondary mt-2" role="alert"><pre>' + JSON.stringify(res, null, 2) + '</pre></div>'
    );
}

async function postData() {

    let resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";

    const name = document.getElementById("post-title").value;
    const description = document.getElementById("post-description").value;

    const postData = {
        name: name,
        description: description,
        published: 'false'
    };

    try {
        const res = await fetch(`${baseURL}/tutorials`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
        });
        if (!res.ok) {
            const message = `An error has been occured: ${res.status} , ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();
        const result = {
            status: res.status + " " + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
        };
        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err.message)
    }
}

async function getAllData() {
    let resultElement = document.getElementById("getAllResult");
    resultElement.innerHTML = "";

    try {
        const res = await fetch(`${baseURL}/tutorials`);
        if (!res.ok) {
            const message = `An error has occured ${res.status}  - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();

        const result = {
            status: res.status + " " + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            length: res.headers.get("Content-Length"),
            data: data,
        };

        insertDropDown(data);
        resultElement.innerHTML = htmlizeResponse(result);

        createTableFromJson(data, resultElement);


    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }

}

async function getDataById() {
    let resultElement = document.getElementById("getAllResult");
    resultElement.innerHTML = "";

    let putId = document.getElementById("put-id");
    let putTitle = document.getElementById("put-name");
    let putDescription = document.getElementById("put-description");

    const id = document.getElementById("get-id").value;

    if (id) {
        try {
            const res = await fetch(`${baseURL}/tutorials/${id}`);

            if (!res.ok) {
                const message = `An error has been occured  ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();
            

            const result = {
                status: res.status + " " + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                },
                data: data,
            };



            resultElement.innerHTML = htmlizeResponse(result);
            putId.value=data.id;
            putTitle.value=data.name;
            putDescription.value=data.description;



        } catch (err) {
            resultElement.innerHTML = htmlizeResponse(err);
        }
    } else {
        resultElement.innerHTML = "You need to specify ID first"
    }

}

async function getDataByName() {
    let resultElement = document.getElementById("getAllResult");
    resultElement.innerHTML = "";

    const name = document.getElementById("get-name").value;

    if (name) {
        let url = new URL(`${baseURL}/tutorials/name`);

        const params = {
            keyword: name
        };

        url.search = new URLSearchParams(params);

        try {
            const res = await fetch(url);
            if (!res.ok) {
                const message = `An error has been occured  ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {
                status: res.status + " " + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                },
                data: data,
            };

            resultElement.innerHTML = htmlizeResponse(result);
        } catch (err) {
            resultElement.innerHTML = htmlizeResponse(err);
        }

    } else {
        resultElement.innerHTML = "You need to specify Keword for name first"
    }


}

// async function uploadFile(){
//     const myInput = document.getElementById('get-file');

// // Later, perhaps in a form 'submit' handler or the input's 'change' handler:
// fetch('https://example.com/some_endpoint', {
//   method: 'POST',
//   body: myInput.files[0],
// })
// }

// document.querySelector('#fileUpload').addEventListener('change', event => {
//     handleImageUpload(event)
//   })

async function putData(){
    let resultElement = document.getElementById("put-result");
    resultElement.innerHTML= "";

    const id = document.getElementById("put-id").value;
    const title = document.getElementById("put-name").value;
    const description = document.getElementById("put-description").value;
    const published = document.getElementById("put-published").checked;

    const putData = {
        name: title,
        description: description,
        published: published,
    };

    try{
        const res = await fetch(`${baseURL}/tutorials/${id}`,{
            method: "put",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(putData),
        });

        if(!res.ok){
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();

        const result ={
            status: res.status + " " + res.statusText,
            headers:{
                "Content-Type": res.headers.get("Content-Type")
            },
            data: data

        };
        resultElement.innerHTML = htmlizeResponse(result);

    }catch (err) {
        resultElement.innerHTML = (err.message);
    }

}

async function deleteAll(){
    let resultElement = document.getElementById("deleteAllResult");
    resultElement.innerHTML = "";

    try{
        const res = await fetch(`${baseURL}/tutorials`,{
            method: "delete"
        });

        if(!res.ok){
            const message = `Error has occured ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();

        const result = {
            status: res.status + " " + res.statusText,
            headers:{
                "Content-Type": res.headers.get("Content-type")
            },
            data: data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
        
    }catch(err){
        resultElement.innerHTML = htmlizeResponse(err);
    }

}

async function deleteById(){
    let resultElement = document.getElementById("deleteAllResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("delete-id").value;

    try{

        const res = await fetch(`${baseURL}/tutorials/${id}`, {
            method: "delete"
        });

        if(!res.ok){
            const message = `Error has occured ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();
        const result = {
            status: res.status + "" + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
            },
            data: data
        };

        resultElement.innerHTML = htmlizeResponse(result);

    }catch(err){
        resultElement.innerHTML = htmlizeResponse(err);
    }



}


function createTableFromJson(data, resultElement) {
    // var books = [{
    //         "Book ID": "1",
    //         "Book Name": "Computer Architecture",
    //         "Category": "Computers",
    //         "Price": "125.60"
    //     },
    //     {
    //         "Book ID": "2",
    //         "Book Name": "Asp.Net 4 Blue Book",
    //         "Category": "Programming",
    //         "Price": "56.00"
    //     },
    //     {
    //         "Book ID": "3",
    //         "Book Name": "Popular Science",
    //         "Category": "Science",
    //         "Price": "210.40"
    //     }
    // ];

    var col = [];
//get all key (column names) from book
    for(var i=0; i<data.length; i++){
        for ( var key in data[i]){
            if (col.indexOf(key) === -1){
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");

    var tr = table.insertRow(-1);
// create table header
    for(var i=0; i<col.length; i++){
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

// kreira onolku redovi kolku shto ima objekti vo responsot
    for( var i=0; i< data.length; i++){
        tr = table.insertRow(-1);
        var id = data[i][col[0]];
        for(j=0; j<col.length;j++){
            var tableCell = tr.insertCell(-1);
            tableCell.setAttribute("id", col[j]+ "_" + id);
            tableCell.innerHTML = data[i][col[j]];
        }
        tr.setAttribute("id", "row_" + id);
    }


    // var resultElement = document.getElementById("result");
    // resultElement.innerHTML = "";

    resultElement.appendChild(table);


}


function insertDropDown(data){
    // var birds = [
    //     {
    //         "ID":"001",
    //         "BirdName":"Eurasian Dove"
    //     },
    //     {
    //         "ID":"002",
    //         "BirdName":"Eagle"
    //     },
    //     {
    //         "ID":"003",
    //         "BirdName":"Parrot"
    //     }
    // ];

    var element = document.getElementById("getAll-selectId");
    for(var i=0; i<data.length; i++){
        element.innerHTML = element.innerHTML + '<option value="' + data[i]['id'] +'">' + data[i]['name'] + '</option>';
    }

}

function show(element){
    var msg = document.getElementById("ddresult");
    msg.innerHTML = 'Selected item: <b>' + element.options[element.selectedIndex].text + '</b> </br>' + 'ID: ' + element.value ;

}