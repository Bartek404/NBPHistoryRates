const date = document.querySelector('#date')
const amountOne = document.querySelector('#amountOne')
const amountTwo = document.querySelector('#amountTwo')
const currency = document.querySelector('#currency')
const infoRate = document.querySelector('.info-rate')
const errorMsg = document.querySelector('.error-msg')

date.valueAsDate = new Date()

const calculate = () => {
	const APIrequest = `https://api.nbp.pl/api/exchangerates/rates/a/${currency.value}/${date.value}`
	fetch(APIrequest)
		.then(res => res.json())
		.then(data => {
			infoRate.textContent = `Kurs dla ${data.currency} w dniu ${date.value} wynosił średnio: ${data.rates[0].mid} PLN`
			amountTwo.value = amountOne.value * data.rates[0].mid
			errorMsg.textContent = ''
		})
		.catch(error => {
			amountTwo.value = 0
			infoRate.textContent = `Brak danych.`
			errorMsg.textContent = 'Weekend, lub nieprawidłowa data.'
			console.error(`Odpowiedź serwara NBP: ${error}`)
			checkHoliday()
		})
}

const checkHoliday = () => {
	const year = date.value.slice(0, -6)
	const APIholidayRequest = `https://date.nager.at/api/v3/publicholidays/${year}/PL`

	fetch(APIholidayRequest)
		.then(res => res.json())
		.then(data => {
			data.forEach(element => {
				if (element.date === date.value) {
					amountTwo.value = 0
					infoRate.textContent = 'Brak danych ze względu na święto narodowe:'
					errorMsg.textContent = `${element.localName}.`
				}
			})
		})
		.catch(error => console.error(error))
}

date.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
currency.addEventListener('change', calculate)
calculate()
