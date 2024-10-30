import { User } from "@clerk/nextjs/server";


export async function createDbUser(userObj : any){

    console.log("strating function");
    
    try{

        const response = await fetch('/api/createDbUser', {

            headers: {
                'Content-Type': 'application/json'
            },

            method: 'POST',

            body: JSON.stringify(userObj)
        });

        if(!response.ok){

            const error = await response.json();

            console.log(error.error);

            return;

        }

        const resObj = await response.json();

        if(resObj){
            console.log('success');
        }


    }catch(error){

        console.log(error);

        throw new Error('error while creating db user');

    }

}

export async function getClashId(email: string | undefined){

    if(email === undefined){
        return;
    }

    console.log('checking');

    try{

        const response = await fetch('/api/getClashId', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(email)

        })

        if(!response.ok){

            const error = await response.json();

            console.log(error.error);

            throw new Error('Error finding clash id', error.error);

        }

        const resObj = await response.json();

        const clashId  = resObj.clashId;

        return clashId;

    }catch(error){

        console.log(error);

    }

}