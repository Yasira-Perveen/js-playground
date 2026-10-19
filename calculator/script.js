 let calculation = localStorage.getItem('calculation')||'';
  displayCalculation();
  

  function displayCalculation() {
    document.querySelector('.js-calculation')
    .innerHTML = `${calculation}`;
    
  }

    
    function updateCalculation(string) {
      calculation = calculation + string;
      //console.log(calculation);
      localStorage.setItem('calculation',calculation);
      displayCalculation();
    }
  