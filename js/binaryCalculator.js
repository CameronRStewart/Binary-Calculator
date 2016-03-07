var putDisp = function() {
  var e = window.event;
  var btn = e.target || e.srcElement;

  var resultDisplay = document.getElementById('res')

  resultDisplay.innerHTML = resultDisplay.innerHTML + btn.innerHTML;

}

var handleKeydown = function(e) {
  var keynum;
  var resultDisplay = document.getElementById('res');

  if(window.event) { // IE
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera
    keynum = e.which;
  }

  // '0, 1, +, -, *, /' respectively.
  if(keynum == 48 || keynum == 49 || keynum == 43 || keynum == 45 || keynum == 42 || keynum == 47) {
    resultDisplay.innerHTML = resultDisplay.innerHTML + String.fromCharCode(keynum);
  }
  // Enter pressed - assume finished.
  if(keynum == 13) {
    calc();
  }
}

var calc = function() {
  var resultDisplay = document.getElementById('res');
  var operation = resultDisplay.innerHTML;
  var add = 0;
  var subtract = 0;
  var multiply = 0;
  var divide = 0;

  if(operation.indexOf("+") > -1) {
    var operands = operation.split("+");
    add = 1;
  } else if (operation.indexOf("-") > -1) {
    var operands = operation.split("-");
    subtract = 1;
  } else if (operation.indexOf("*") > -1) {
    var operands = operation.split("*");
    multiply = 1;
  } else if (operation.indexOf("/") > -1) {
    var operands = operation.split("/");
    divide = 1;
  } else {
    alert("There is no operator with which to do a calculation.");
  }

  if(operands.length <= 0) {
    alert("You must have TWO operands to perform a calculation.")
  }

  operands = normalizeOperandLength(operands);
  indexLength = operands[0].length;

  var sum = 0;
  var op_res = [];
  var result = [];

  if(add){
    var carry = 0;
    for (var i = (indexLength - 1); i >= 0; i--) {
      op_res = binaryAdd(operands[0][i], operands[1][i], carry);
      sum = op_res[0];
      carry = op_res[1];
      result.unshift(sum);
    }
    if (carry == 1) { result.unshift(carry);}

  } else if (subtract) {
    var borrow = 0;
    for (var i = (indexLength - 1); i >= 0; i--) {
      op_res = binarySub(operands[0][i], operands[1][i], borrow);
      difference = op_res[0];
      borrow = op_res[1];
      result.unshift(difference);
    }


  } else if (multiply) {

  } else if (divide) {

  } else {

  }

  resultDisplay.innerHTML = result.join('');

}

var clear = function() {
  var resultDisplay = document.getElementById('res');
  resultDisplay.innerHTML = "";
}

var normalizeOperandLength = function(operands) {
  var len0 = operands[0].length;
  var len1 = operands[1].length;

  if (len0 > len1) {
    operands[1] = zeroPad(operands[1], (len0 - len1));
  }
  if (len1 > len0) {
    operands[0] = zeroPad(operands[0], (len1 - len0));
  }
  return operands;
}

var binaryAdd = function(n1,n2,carry) {
  ret = [];
  if (carry == 1) {
    if(n1 == 1 && n2 == 1) {
      ret = [1,1];
    } else if (n1 == 0 && n2 == 0) {
      ret = [1,0];
    } else {
      ret = [0,1];
    }
  } else {
    if (n1 == 1 && n2 == 1) {
      ret = [0,1];
    } else if (n1 == 0 && n2 == 0) {
      ret = [0,0];
    } else {
      ret = [1,0];
    }
  }
  return ret;
}

var binarySub = function(n1, n2, borrow) {
  ret = [];
  if (borrow == 0) {
    if(n1 == 1 && n2 == 1) {
      ret = [0,0];
    } else if (n1 == 0 && n2 == 0) {
      ret = [0,0]
    } else if (n1 == 1 && n2 == 0) {
      ret = [1,0];
    } else {
      ret = [1, 1];
    }
  } else { // borrow == 1
    if(n1 == 1 && n2 == 1) {
      ret = [1, 1];
    } else if (n1 == 0 && n2 == 0) {
      ret = [1, 1];
    } else if (n1 == 1 && n2 == 0) {
      ret = [0, 0];
    } else {
      ret = [0, 1];
    }
  }
  return ret;
}

var zeroPad = function(arr, n) {
  var zeros = "";
  for (var i = 0; i < n; i++) {
    zeros += '0';
  }
  return zeros + arr;
}
document.onkeypress = handleKeydown;
document.getElementById('btn0').onclick = putDisp;
document.getElementById('btn1').onclick = putDisp;
document.getElementById('btnClr').onclick = clear;
document.getElementById('btnEql').onclick = calc;
document.getElementById('btnSum').onclick = putDisp;
document.getElementById('btnSub').onclick = putDisp;
document.getElementById('btnMul').onclick = putDisp;
document.getElementById('btnDiv').onclick = putDisp;
