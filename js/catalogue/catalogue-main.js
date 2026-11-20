async function getdata() {
    const response = await fetch("http://localhost:3000/articles")
    const data = await response.json()
    console.log(data)
}
getdata()