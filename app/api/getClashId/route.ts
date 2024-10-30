import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("api side")

    const body = await req.json();

    const prisma = new PrismaClient();

    try{

        const user = await prisma.dbUser.findFirst({
            where: {
                email: body
            }
        });

        if(!user){
            console.log('No user');
            return NextResponse.json({error: 'No user with provided email'},{status:404})
        }

        const clashId = user.clashId;

        return NextResponse.json({clashId: clashId})

    }catch(error){

    }

}