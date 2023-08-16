const date = document.querySelector('#date')
const amountOne = document.querySelector('#amountOne')
const amountTwo = document.querySelector('#amountTwo')
const currency = document.querySelector('#currency')
const infoRate = document.querySelector('.info-rate')
const errorMsg = document.querySelector('.error-msg')

const calculate = () => {
	const APIrequest = `http://api.nbp.pl/api/exchangerates/rates/a/${currency.value}/${date.value}`
	fetch(APIrequest)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			console.log(data.rates[0].mid)
			infoRate.textContent = `Kurs dla ${data.currency} w dniu ${date.value} wynosił średnio: ${data.rates[0].mid} PLN`
			amountTwo.value = amountOne.value * data.rates[0].mid
			errorMsg.textContent = ''
		})
		.catch(error => {
			infoRate.textContent = `Prawdopodone święto lub brak danych dla podanego dnia.`
			errorMsg.textContent = `Komunikat serwera NBP do odczytania w konsoli przeglądarki.`
			console.error(`Odpowiedź serwara NBP: ${error}`)
		})
}

date.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
currency.addEventListener('change', calculate)
calculate()
