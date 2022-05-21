var inp=document.querySelector("input"),cont=document.querySelector(".container"),zero=document.querySelector(".zero"),mc=document.querySelector(".mc"),mr=document.querySelector(".mr"),mp=document.querySelector(".mp"),mm=document.querySelector(".mm"),ms=document.querySelector(".ms"),letterM=document.querySelector(".let_m"),memorySum=0,percent=document.querySelector(".percent"),pow=document.querySelector(".pow"),multiply=document.querySelector(".multiply"),minus=document.querySelector(".minus"),plus=document.querySelector(".plus"),divide=document.querySelector(".divide"),dot=document.querySelector(".dot-btn"),equal=document.querySelector(".equal"),square=document.querySelector(".sqrt"),invprop=document.querySelector(".invprop"),changeSign=document.querySelector(".negative"),ce=document.querySelector(".inp-clear"),c=document.querySelector(".clear"),del=document.querySelector(".delete"),expAnyLastNumber=/(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/,expLastNum=/(\d+)$/,expPosNum=/(\d+\.\d+)$|(\d+)$/,expNegNum=/(-\d+)$/,expPowStr=/((\d+|\d+\.\d+) (□) (\d+))$/,expPow=/(□ \d+)$/,expLastSpace=/(\s)$/,expLastZero=/^(0)$|(\s0)$/;function checkLastZero(e,n){if(expLastZero.test(n))return!0;inp.value=n+e.target.innerText}function countingMemory(e,n){if(expAnyLastNumber.test(n)){var t=n.match(expAnyLastNumber),u=parseFloat(t[0]);"+"===e?memorySum+=u:memorySum-=u}}function saveMemoryHelper(e){var n=e.match(expAnyLastNumber);memorySum=parseFloat(n[0]),letterM.style.display="block"}function countingPow(e){if(expPowStr.test(e)){var n=e.match(expPowStr);inp.value=e.substring(0,e.length-n[0].length)+Math.pow(parseInt(n[2]),parseInt(n[4]))}}function checkResLength(e,n){var t=inp.value.length,u=e.length;n.toString().length>=2?inp.value=inp.value.substring(0,t-u)+n.toFixed(2):inp.value=inp.value.substring(0,t-u)+n}function checkLastNum(e){return 0===e.length||(!!expLastSpace.test(e)||void 0)}function enteringNum(e){if(inp.value.length>=16)return!0;e.target.classList.contains("num_btn")&&checkLastZero(e,inp.value)}function enteringZero(e){if(inp.value.length>=16)return!0;checkLastZero(e,inp.value)}function enteringDot(){return inp.value.length>=16||(!!expPow.test(inp.value)||void(expLastNum.test(inp.value)&&!/(\d+\.\d+)$|(\d+\.)$/.test(inp.value)&&(inp.value=inp.value+".")))}function clearMemory(){memorySum=0,letterM.style.display="none"}function plusMemory(){!0===expAnyLastNumber.test(inp.value)&&"none"===getComputedStyle(letterM).display&&saveMemoryHelper(inp.value),countingMemory("+",inp.value)}function minusMemory(){countingMemory("-",inp.value)}function saveMemory(){expAnyLastNumber.test(inp.value)&&saveMemoryHelper(inp.value)}function readMemory(){inp.value=Math.round(100*memorySum)/100}function enteringSign(e,n){if(inp.value.length>=16)return!0;countingPow(n),expLastNum.test(n)&&n.length>0&&(inp.value=inp.value+" "+e+" ")}function countingSquare(){if(expPosNum.test(inp.value)){var e=inp.value.match(expAnyLastNumber);if(parseInt(e[0])<0)return!0;var n=Math.sqrt(parseFloat(e[0]));checkResLength(e[0],n)}}function countingInvprop(){if(expPosNum.test(inp.value)){var e=inp.value.match(expPosNum),n=1/parseInt(e[0]);checkResLength(e[0],n)}}function changingSign(){if(expPosNum.test(inp.value)){var e=inp.value.match(expAnyLastNumber),n=inp.value.length,t=e[0].length;parseInt(e[0])>0?inp.value=inp.value.substring(0,n-t)+-1*parseFloat(e[0]):parseInt(e[0])<0&&(inp.value=inp.value.substring(0,n-t)+Math.abs(parseFloat(e[0])))}}function clearInp(){inp.value=""}function clearAll(){clearInp(),"block"===getComputedStyle(letterM).display&&clearMemory()}function clearOneSign(){var e=inp.value.length;if(expLastSpace.test(inp.value)&&(inp.value=inp.value.substring(0,e-2)),expNegNum.test(inp.value)){var n=inp.value.match(expNegNum);inp.value=inp.value.substring(0,e-n[1].length)}inp.value=inp.value.substring(0,e-1)}function equalListener(){if(expLastSpace.test(inp.value))return!0;countingPow(inp.value);inp.value.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g),inp.value.match(/[-+%×÷]/g)}cont.onclick=enteringNum,zero.onclick=enteringZero,dot.onclick=enteringDot,mc.onclick=clearMemory,mr.onclick=readMemory,mp.onclick=plusMemory,mm.onclick=minusMemory,ms.onclick=saveMemory,percent.onclick=function(){enteringSign("%",inp.value)},pow.onclick=function(){enteringSign("□",inp.value)},divide.onclick=function(){enteringSign("÷",inp.value)},multiply.onclick=function(){enteringSign("×",inp.value)},minus.onclick=function(){enteringSign("-",inp.value)},plus.onclick=function(){enteringSign("+",inp.value)},square.onclick=countingSquare,invprop.onclick=countingInvprop,changeSign.onclick=changingSign,ce.onclick=clearInp,c.onclick=clearAll,del.onclick=clearOneSign,equal.onclick=equalListener;var pressed=[];function twoKeys(e,n){if(checkLastNum(n))return!0;(pressed.includes("Shift")&&pressed.includes("+")||pressed.includes("%")||pressed.includes("*"))&&(inp.value=n+" "+e+" ")}function minusDivide(e,n,t){if("-"===e.key||"/"===e.key){if(checkLastNum(t))return!0;inp.value=t+" "+n+" "}}function checkLengthArr(){var e=pressed.length;e>0&&(pressed.length=e-1)}function keyDown(e){if(inp.value.length>=16)return!0;if("Backspace"===e.key&&clearOneSign(),pressed.includes(e.key)||pressed.push(e.key),"0"===e.key||"1"===e.key||"2"===e.key||"3"===e.key||"4"===e.key||"5"===e.key||"6"===e.key||"7"===e.key||"8"===e.key||"9"===e.key){if(expLastZero.test(inp.value))return!0;inp.value=inp.value+e.key}"-"===e.key&&minusDivide(e,"-",inp.value),"/"===e.key&&minusDivide(e,"÷",inp.value),"+"===e.key&&twoKeys("+",inp.value),"%"===e.key&&twoKeys("%",inp.value),"*"===e.key&&twoKeys("×",inp.value),"="!==e.key&&"Enter"!==e.key||equalListener(),"."===e.key&&dot()}document.onkeydown=keyDown,document.onkeyup=checkLengthArr;
//# sourceMappingURL=Calculator.js.map