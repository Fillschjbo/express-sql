document.querySelector('form').addEventListener("submit", async (e)=>{
    e.preventDefault();
    const id = document.querySelector("#user_id").value;
    const title = document.querySelector("#name").value;
    const content = document.querySelector("#content").value;

    const body = {
        id: Number(id),
        title : title,
        content : content
    }
    console.log(body)

    const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data)
})