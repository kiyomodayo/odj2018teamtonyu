{\rtf1\ansi\ansicpg932\cocoartf1671\cocoasubrtf200
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 "use strict";\
\
var head;\
window.addEventListener(\
  "load",\
  function() \{\
    head = document.querySelector("#head");\
    mainFunction();\
  \},\
    false\
);\
\
async function mainFunction() \{\
  try \{\
    var i2cAccess = await navigator.requestI2CAccess();\
    var port = i2cAccess.ports.get(1);\
    var adt7410 = new ADT7410(port, 0x48);\
    await adt7410.init();\
    while (1) \{\
      var value = await adt7410.read()+10;\
	// console.log('value:', value);\
	head.innerHTML = value ? value : head.innerHTML;\
	if (value <= 35.8||value >=38)\{\
	    document.getElementById('face').src='worstplus.png';\
	\}\
	else if (value < 36.2||value > 37.3)\{\
	    document.getElementById('face').src='worse.png';\
	\}\
	else if (value >= 36.8 && value<=36.9)\{\
	    document.getElementById('face').src='smileplus.png';\
	\}\
	else \{\
	    document.getElementById('face').src='smile.png';\
	\}\
      await sleep(1000);\
    \}\
  \} catch (error) \{\
    console.error("error", error);\
  \}\
\}\
\
function sleep(ms) \{\
  return new Promise(function(resolve) \{\
    setTimeout(resolve, ms);\
  \});\
\}}