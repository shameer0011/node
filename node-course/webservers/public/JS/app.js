



const wheather = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "Loading";
messageTwo.textContent = '';

wheather.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    console.log(location, "loc")
    fetch(`http://localhost:3000/wheather?address=${location}&degree=45`).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(error)
            }
        }).catch((error) => {
            console.log(error)
        })
    })
})