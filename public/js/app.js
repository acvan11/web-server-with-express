
console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
// 	res.json().then((data) => {
// 		console.log(data)
// 	})
// })

// fetch('http://localhost:3000/weather?address=').then((res) =>{
// 	res.json().then((data) => {
// 		if(data.error){
// 			console.log(data.error)
// 		}else{
// 		console.log(data)}
// 	})
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
	event.preventDefault() // prevent to refresh the page
	
	const location = search.value
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	// const url = 'http://localhost:3000/weather?address=' + location
	fetch('http://localhost:3000/weather?address=' + location).then((res) => {
		res.json().then((data) => {
			if (data.error){
				console.log(data.error)
				messageOne.textContent = data.error
			}else{
				console.log(data.location)
				console.log(data.forecast)
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})

})