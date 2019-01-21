//Array.includes判断
function arrayInclude(a,b) {
    /*a:Array
  b:!array*/
    if(a.includes(b)){
        return true
    }
}

// Set 与去重
// 数组去重
function uniqueArray(array) {
    /*array:Array*/
    return Array.from(new Set(array));
}
function uniqueStr(str) {
    // str:String
    return[...new Set(str).join("")]
}

//并集
function union(a,b) {
    /*a:Array
      b:Array*/
   return new Set([...a,...b])
}
//交集
function intersect(a,b) {
    /*a:Array
  b:Array*/
    return new Set([...a].filter(x=>b.has(x)));
}

//差集
function difference (a,b) {
    /*a:Array
  b:Array*/
    return new Set([...a].filter(x=>!b.has(x))) ;
}

// compose 与函数组合
/*const compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};*/
