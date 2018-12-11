const numberGenerator = (function () {
  
  let showOutputContainer = false;
  let randomCounter = 0;
  
  function init() {
    const config = {
      minRandomRange: 1,
      maxRandomRange: 49,
      numberCount: 6,
      list: document.querySelector('#numbersResultList'),
      randomCounterOutput: document.querySelector('#js-randomCounter'),
      outputContainer: document.querySelector('#js-outputDataWrapper'), //optional, comment or delete this line to remove feature
    }
    if('outputContainer' in config) {
      config.outputContainer.classList.add('outputDataWrapper--hidden');
    }
    const startBtn = document.querySelector('#js-randomizeBtn');
    startBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    randomCounter++;
    writeRandomNumbers(config);
  });
    
    const resetBtn = document.querySelector('#js-resetBtn');
    resetBtn.addEventListener('click', () => {
      clearList(config);
    });
  };
  
  
  const randomNumbers = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  function changeDisplayOutputContainer(config) {
    if(showOutputContainer === true) {
      config.outputContainer.classList.add('outputDataWrapper--visible');
    }
    if(showOutputContainer === false) {
      config.outputContainer.classList.remove('outputDataWrapper--visible');
    }
  }
    
  function writeRandomNumbers(config) {
    if('outputContainer' in config) {
      showOutputContainer = true;
      changeDisplayOutputContainer(config)
    }
    const noDuplicateSet = new Set();
    while (noDuplicateSet.size < config.numberCount) {
      const rndNumber = randomNumbers(config.minRandomRange, config.maxRandomRange);
      noDuplicateSet.add(rndNumber);
    }
    const numbersArray = [...noDuplicateSet];
    const StringArray = numbersArray.map(i => i);
    StringArray.toString();
    const listElement = document.createElement('li');
    listElement.textContent = StringArray.join(' | ');
    listElement.classList.add('randomNumbersList__number');
    config.list.appendChild(listElement);
    config.list.scrollTop = config.list.scrollHeight;
    
    config.randomCounterOutput.textContent = randomCounter;
    
    writeFitNumbers(compareNumbers(numbersArray))
  }  
  
  function compareNumbers(numbersArray) {
    const numberInputs = document.querySelectorAll("[data-id='numberInput']");
    const numberInputsValues = [];
    
    for (let i = 0; i < numberInputs.length; i++) {
      numberInputsValues.push(numberInputs[i].value)
    }
    
    let numberInputsValuesInt = numberInputsValues.map(function(item) {
      return parseInt(item, 10)
    })
    
    let fitNumbers = numbersArray.filter(function(numbers) {
      return numberInputsValuesInt.includes(numbers);
    });
     return fitNumbers;
  }
  
  function writeFitNumbers(fitnumbers) {
    const luckyNumbersOutput = document.querySelector('#luckyNumbers');
    luckyNumbersOutput.textContent = fitnumbers.join(' | ');
  }
  
  function clearList(config) {
    while( config.list.firstChild ){
      config.list.removeChild( config.list.firstChild );
    }
    const luckyNumbersOutput = document.querySelector('#luckyNumbers');
    luckyNumbersOutput.textContent = '';
    randomCounter = 0;
    config.randomCounterOutput.textContent = randomCounter;
  }
    
  
  return {
    init: init,
  };
})()

numberGenerator.init();