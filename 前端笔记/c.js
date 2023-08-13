function a(){
    try {
        throw new Error('cuo')
    } catch (error) {
        console.log(error);
    }
}

function b(){
    try {
        a()
    } catch (error) {
        console.log("b()");
        console.log(error);
    }
}

b()