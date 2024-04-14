console.log(globalThis.a, a);//undefined undefined
{
  console.log(globalThis.a, a);//undefined function a(){}
  function a() { };
  console.log(globalThis.a, a)//function a(){} function a(){}
}
console.log(globalThis.a, a);//function a(){} function a(){}