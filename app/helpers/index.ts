import { User } from "@clerk/nextjs/server";


export async function createDbUser(userObj : any){
    
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

export async function checkForDbUser(email: string){

    try{

        const response = await fetch('/api/checkDbUser', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(email)

        })

        if(!response.ok){

            const error = await response.json();

            console.log(error);

            throw new Error('error checking user. ', error);

        }

    }catch(error){

        console.log(error);

    }

}