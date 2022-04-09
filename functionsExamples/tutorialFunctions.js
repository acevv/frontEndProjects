const baseURL = "http://localhost:8080/api"

function htmlizeResponse(res) {
    return (
        '<div class="alert alert-secondary mt-2 role="alert"><pre>' + JSON.stringify(res, null, 2) + '</pre></div>'
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
        published: false,
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
            const message = `An error has been occured: ${res.status}, ${res.statusText}`;
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
        }
        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err.message);
    }
}


async function getAllData() {
    let resultElement = document.getElementById("getAllResult");
    resultElement.innerHTML = "";

    try {
        const res = await fetch(`${baseURL}/tutorials`);
        if (!res.ok) {
            const message = `An error has been occured: ${res.status}, ${res.statusText}`;
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
        }
        resultElement.innerHTML = htmlizeResponse(result);
    } catch (error) {
        resultElement.innerHTML = htmlizeResponse(error.message);
    }
}

async function getById() {
    let resultElement = document.getElementById("getAllResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("get-id").value;

    if (id) {
        try {
            const res = await fetch(`${baseURL}/tutorials/${id}`)

            if (!res.ok) {
                const message = `An error has been occured: ${res.status}, ${res.statusText}`;
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
            }
            resultElement.innerHTML = htmlizeResponse(result);


        } catch (error) {
            resultElement.innerHTML = htmlizeResponse(error.message);
        }
    }
}

async function getByName() {
    let resultElement = document.getElementById('getAllResult');
    resultElement.innerHTML = "";

    const name = document.getElementById("get-name").value;

    if (name) {
        try {
            let url = new URL(`${baseURL}/tutorials/name`);
            const params = {
                keyword: name,
            };

            url.search = new URLSearchParams(params);

            const res = await fetch(url);

            if (!res.ok) {
                const message = `An error has been occured: ${res.status}, ${res.statusText}`;
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
            }
            resultElement.innerHTML = htmlizeResponse(result);


        } catch (error) {
            resultElement.innerHTML = htmlizeResponse(error.message);
        }
    } else {
        // resultElement.innerHTML = htmlizeResponse("Specify keyword");
    }
}
async function putData() {
    let resultElement = document.getElementById("put-result");
    resultElement.innerHTML = "";

    const id = document.getElementById("put-id").value;
    const title = document.getElementById("put-name").value;
    const description = document.getElementById("put-description").value;
    const published = document.getElementById("put-published").checked;

    const putData = {
        name: title,
        description: description,
        published: published,
    };

    try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(putData),
        });
        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();
        const result = {
            status: res.status + " " + res.statusText,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
        };

        resultElement.innerHTML = htmlizeResponse(result);

    } catch (error) {
        resultElement.innerHTML = htmlizeResponse(error);
    }
}

async function deleteAll() {
    let resultElement = document.getElementById("deleteAllResult");
    resultElement.innerHTML = "";

    try {
        const res = await fetch(`${baseURL}/tutorials`, {
            method: "delete"
        });

        if (!res.ok) {
            const message = `Error  has occured ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const result = {
            status: res.status + " " + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type")
            },
            data: data,
        };

        resultElement.innerHTML = htmlizeResponse(result);

    } catch (error) {
        resultElement.innerHTML = htmlizeResponse(error);
    }
}

async function deleteById() {
    let resultElement = document.getElementById("deleteAllResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("delete-id").value;

    try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, {
            method: "delete"
        });

        if(!res.ok){
            const message = `Error  has occured ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();

        const result = {
            status: res.status +  " " + res.statusText, 
            headers: {
                "Content-Type": res.headers.get("Content-Type")
            },
            data: data
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (error) {
        resultElement.innerHTML = htmlizeResponse(error);
    }
}

async function clearPostOutput() {
    let resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
    document.getElementById("post-title").value = "";
    document.getElementById("post-description").value = "";
}

