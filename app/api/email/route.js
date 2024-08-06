import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

const LoadDB = async ()=>{
    await ConnectDB()
}


LoadDB()



// Api to delete a email from the database
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return NextResponse.json({ success: false, msg: 'Invalid email ID format' }, { status: 400 });
        }

        const email = await EmailModel.findById(id);

        if (!email) {
            return NextResponse.json({ success: false, msg: 'Email not found' }, { status: 404 });
        }

        await EmailModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true, msg: 'Email Deleted' });
    } catch (error) {
        console.error("Error deleting email:", error);
        return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
    }
}
// Api to add email to the database
export async function POST(request) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');

        if (!email) {
            return NextResponse.json({ success: false, msg: 'Email is required' }, { status: 400 });
        }

        const emailData = { email };

        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: 'Email Subscribed' });

    } catch (error) {
        console.error("Error subscribing email:", error);
        return NextResponse.json({ success: false, msg: 'Failed to subscribe email' }, { status: 500 });
    }
}


export async function GET(request){
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}