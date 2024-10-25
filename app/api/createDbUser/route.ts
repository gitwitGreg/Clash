import { User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";


export async function POST(req: NextRequest){


    const body = await req.json()

    const user: User = body.user;

    const clashId: string = body.clashId

    const prisma =  new PrismaClient();

    await connectToDb();


    try{
        
        const existingAccount = await prisma.dbUser.findFirst({
            where: {
                email: user.primaryEmailAddress?.emailAddress,
                
            }
        });

        if(existingAccount){
            return;
        }

        const newDbAccount = await prisma.dbUser.create({
            data: {
                name: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                clashId: clashId
            }
        });

        if(!newDbAccount){
            return NextResponse.json({error: 'Internal error adding user to db'});
        }

        return NextResponse.json({message: 'success'}, {status: 200});


    }catch(error){

        console.log(error);

        return NextResponse.json({error: error}, {status: 400});

    }

}
