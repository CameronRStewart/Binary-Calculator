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

  var op_res = [];
  var result = [];

  if(add){
    var result = iterateOperation(operands, 'a');
  } else if (subtract) {
    var result = iterateOperation(operands, 's');
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

var iterateOperation = function(operands, mode) {
  operands = normalizeOperandLength(operands);
  indexLength = operands[0].length;

  var op_res = [];
  var result = [];

  var carry_or_borrow = 0;
  for (var i = (indexLength - 1); i >= 0; i--) {
    if(mode == 'a') {
      op_res = binaryAdd(operands[0][i], operands[1][i], carry_or_borrow);
    } else if (mode == 's') {
      op_res = binarySub(operands[0][i], operands[1][i], carry_or_borrow)
    }

    sum_or_diff = op_res[0];
    carry_or_borrow = op_res[1];
    result.unshift(sum_or_diff);
  }
  // This should only apply to addition - needs refactor.
  if (carry_or_borrow == 1) { result.unshift(carry_or_borrow);}

  return result;
}

var iterateMultiplication(operands) {
  op_i = operands[0];
  op_j = operands[1];
  len0 = op_i.length;
  len1 = op_j.length;
  results_to_add = [];

  /**
  *   0110 - i
  *    011 - j
  *   ----
  *   0110
  *  01100
  * 000000
  *=010010
  **/

  for(var j = 0; j < len1; j++) {
    results_to_add[j] = [];
    // pad results_to_add[j] with j zeros to facilitate multiplication.
    results_to_add[j] = zeroPad(results_to_add[j], j);
    for(var i = 0; i < len0; i++) {
      results_to_add[j].unshift(op_i[(len0 - i)] * op_j[(len1 - j)]);
    }
  }
  // Now add each result in the results_to_add array
  rta_len = results_to_add.length;
  tmp = results_to_add[0];
  for(var k = 1; k < rta_len; k++) {
    tmp = iterateOperation(tmp, results_to_add[k], 'a');
  }
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
