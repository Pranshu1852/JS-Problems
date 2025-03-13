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