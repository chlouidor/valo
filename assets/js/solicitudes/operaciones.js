export const getPersonajes =async()=>{

    try{
     const response = await fetch("https://valorant-api.com/v1/agents")
     const data = await response.json();
 
     return data.data;
    }catch(error){
     console.log(`el error es : ${error}`);
    }
 
 }
 