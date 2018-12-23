// EMI = [P x R x (1+R)^N]/[(1+R)^N-1],

// In this formula, the letter stands for:

// EMI is the equated monthly installment

// P is the principal or the amount that is borrowed as a loan

// R is the rate of interest that is levied on the loan amount (the interest rate should be a monthly rate)

// N is the tenure of repayment of the loan or the number of monthly installments that you will pay (tenure should be in months)

document.querySelector('.input-box').addEventListener('submit', function(e) {
  // first hide results and show the loader
  document.getElementById('results').style.display = 'none';
  document.getElementById('loader').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate Results
function calculateResults() {
  const VARamount = document.querySelector('.amount');
  const VARinterest = document.querySelector('.interest');
  const VARrepayment = document.querySelector('.repayment');
  const VARmonthlyPayment = document.getElementById('monthly-payment');
  const VARtotalPayment = document.getElementById('total-payment');
  const VARtotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(VARamount.value);
  const calculatedInterest = parseFloat(VARinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(VARrepayment.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    VARmonthlyPayment.value = monthly.toFixed(2);
    VARtotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    VARtotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );

    // this results will be dispalyed on setTimout function to delay for 2secs .

    document.getElementById('loader').style.display = 'none';
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Check your numbers..');
  }
}

function showError(error) {
  // if nothing is there, on clicking calculate button... then hide both loader and results
  document.getElementById('results').style.display = 'none';
  document.getElementById('loader').style.display = 'none';
  //create a div
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger w-75 m-auto text-center p-3';
  errorDiv.appendChild(document.createTextNode(error));

  //get elements
  const displayHeading = document.querySelector('.display-4');
  const container = document.querySelector('.container');

  container.insertBefore(errorDiv, displayHeading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
