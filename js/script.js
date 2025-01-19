document.getElementById('register-form').addEventListener("submit", async (e)=>{
    e.preventDefault();
    // const id = document.querySelector("#user_id").value;
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    const body = {
        name: name,
        email : email
    }
    console.log(body)

    const response = await fetch("http://localhost:1337/user", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data)
})



document.getElementById('create-post').addEventListener("submit", async (e)=> {
    e.preventDefault()
    const id = document.querySelector("#user_id").value;
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    const body = {
        user_id: id,
        title: title,
        content: content
    }

    const response = await fetch("http://localhost:1337/posts", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data)
})

