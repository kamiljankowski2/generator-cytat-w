const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const adviceParagraph = document.querySelector('#advice')
const adviceID = document.querySelector('#advice-id')
const adviceButton = document.querySelector('#advice-button')

const getAdvice = async () => {
    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${getRandomNumber(1, 100)}`);
        if(!response.ok) {
          throw new Error(response.status)
        }
        const json = await response.json();
        return json.slip;
    }
    catch(error) {
        console.log(error.message)
        throw error
    }
}

const displayAdvice = async () => {
  
    try {
      adviceParagraph.textContent = 'Ładowanie...'
      const advice = await getAdvice();
      adviceParagraph.textContent = `"${advice.advice}"`
      adviceID.textContent = `advice #${advice.id}`
      
    }catch (error) {
      adviceID.textContent = "#"
      adviceParagraph.textContent = 'Nie udało się pobrać'
    }
}


adviceButton.addEventListener('click', displayAdvice)