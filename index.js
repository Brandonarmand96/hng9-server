

const express = require('express');

const app = express();

//must when using a post request
app.use(express.json());
app.use(express.urlencoded());
const PORT = process.env.PORT || 3000;

const requestListener = function(req, res) {
  res.status(200).json({ "slackUsername": "LeRoi Vladimir", "backend": true, "age": 26, "bio": "Love playing fifa game"});
};


const calculate = (operation_type, x, y) => {
  const operationArr = operation_type.split(' ');
  //console.log(operationArr);
  operationArr.map((i) => {
    if (Number.isNaN(parseInt(i)) !== true && (x === 0 || y === 0)) {
      if (x === 0) {
        x = parseInt(i)
      } else {
        y = parseInt(i)
      }
    }
  })
  let result = 0
  let operation =""
  if (operationArr.includes("addition") || operationArr.includes("add")) {
    result = x + y;
    operation = "addition"
  } else if (operationArr.includes("subtraction") || operationArr.includes("substract")) {
    result = x - y;
    operation="subtraction"
  } else if (operationArr.includes("multiplication") || operationArr.includes("multiply")) {
    result = x * y;
    operation = "multiplication"
  }
  return ({result:result, operation_type: operation})
}

//console.log(calculate(operation_type, x, y))

app.get('/', requestListener);

app.post('/calculate', (req, res) => {
  const { operation_type = "add", x = 0, y = 0 } = req.body
  result = calculate(operation_type, x, y)
  res.status(200).json({
    "slackUsername": "LeRoi Vladimir",
    "result":result.result,
    "operation_type": result.operation_type
  })
  //console.log(calculate(operation_type, number1, number2))
});

app.listen(PORT, () => console.log('Serving on port', PORT))