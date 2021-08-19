var romanToInt = function(s) {
    let j = 0;
    var dict = {
        "I":1,
        "":0,
        "IV": 4,
        "V":5,
        "IX": 9,
        "X":10,
        "XL": 40,
        "L":50,
        "XC": 90,
        "C":100,
        "CD": 400,
        "D":500,
        "CM": 900,
        "M":1000    
    }
    if(s.includes("IV")){
        j = j + 4
        s = s.replace(/IV/g, '')
    }
    if(s.includes("IX")){
        j = j + 9
        s = s.replace(/IX/g, '')
    }
    if(s.includes("XL")){
        j = j + 40
        s = s.replace(/XL/g, '')
    }
    if(s.includes("XC")){
        j = j + 90
        s = s.replace(/XC/g, '')
    }
    if(s.includes("CD")){
        j = j + 400
        s = s.replace(/CD/g, '')
    }
    if(s.includes("CM")){
        j = j + 900
        s = s.replace(/CM/g, '')
    }
    console.log(s)
    for(let i = 0; i < s.length; i ++){
        var key = s[i] 
        console.log(key)
        j = j + dict[key]
    }
    console.log(j)
    return j;
};

romanToInt('IV')