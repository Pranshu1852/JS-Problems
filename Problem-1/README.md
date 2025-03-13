# Problem Definition
create a waitForElement function that uses a MutationObserver to wait for an element to appear in the DOM
ex:
```js
 waitForElement("#my-element").then(el => {
    console.log("Element found!", el);
  }).catch(err => {
    console.error(err);
  });
```
if element is not there function will wait for that DOM element to be appear and after timeout it will throw an error if no element found in the dom
PS: For testing purpose you can inject the element in the DOM using the setTimeout

## How I approach this problem
- So first i need to inject the element into DOM so i use ```window.onload``` to create the element at loading and i use ```setTimeout``` to create and inject that after 1 second.

Code:-
```js
window.onload=()=>{
    setTimeout(()=>{
        const divele=document.createElement('div');
        // divele.id="my-element";
        divele.className="my-element3";
        divele.innerText="This is new div";
        document.body.append(divele)

        const divele2=document.createElement('div');
        divele2.id="my-element2";
        divele2.innerText="This is new div2";
        document.body.append(divele2)

        const divele3=document.createElement('div');
        divele3.id="my-element";
        divele3.className="my-element";
        divele3.innerText="This is new div3";
        document.body.append(divele3)
    },1000)
}
```

- Then for the ```waitForElement``` function i am returning a promise what this function will we are write one MutationObserver with callback function and initializing the observer in which we are assigning ```childList:true```,```subtree: true``` so it will run if we have any changes in the child or in decendants node. we are taking parent as body.
- MutationObserver callback function we are checking if there are any element exists with the queryselector using ```document.querySelector``` if it exists we are resolving the promise if not then we are rejecting it.
- Also we are providing one ```flag``` outside of MutationObserver by default it is false and when it MutationObserver run it will be true. This is to check if the MutationObserver run or not. If it don't run then we are providing one ```setTimeout``` this will run if ```flag``` is false and it wait for 5 seconds to element to come.

Code:-
```js
function waitForElement(id){
    return new Promise(function(resolve,reject){
        let flag=false;
        let observer=new MutationObserver((e)=>{
            flag=true;
            console.log();
            let ele=document.querySelector(id);
            if(ele){  
                resolve(ele);
            }
            reject("Element not Found.");
        })
        observer.observe(document.body,{
            childList:true,
            subtree: true
        })

        setTimeout(()=>{
            if(!flag){
                reject("Element not Found.")
            }
        },3000)
    });

}

waitForElement("div.my-element").then(el=>{
    console.log("Element found!",el)
}).catch(err=>{
    console.error(err);
})
```