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

//标准的compose函数

function compose(...funcs){
  if (funcs.length === 0){
      return arg => arg
  }

  if (funcs.length === 1 ){
      return funcs[0]
  }

  return funcs.reduce((a,b)=>(...args) => a(b(...args)))
}

/*有了这个函数，我们可以随意组合无数个函数。现在我们增加需求，组合出一个lastAndUpper函数，内容是先reverse 反转列表， head 取列表中的第一个元素, 最后toUpperCase大写。*/

const head = arr => arr[0];
const reverse = arr => [].concat(arr).reverse();
const toUpperCase = str => str.toUpperCase();

const last = compose(head, reverse);

const lastAndUpper = compose(toUpperCase, head, reverse,);

console.log(last(["jumpkick", "roundhouse", "uppercut"]));
// "uppercut"
console.log(lastAndUpper(["jumpkick", "roundhouse", "uppercut"]))
// "UPPERCUT"
