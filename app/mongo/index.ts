import mongoose from "mongoose";

let isConnected = false;

export async function connectToDb(){

   try{

        if(isConnected){

            console.log('already connected');

            return;
        }

        await mongoose.connect(process.env.DATABASE_URL as string, {
            dbName: 'Cluster0'
        });

        isConnected = true;

    }catch(error){

        console.log(error);

    }

}