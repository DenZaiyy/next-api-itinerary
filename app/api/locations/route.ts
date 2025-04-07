import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const locations = await db.location.findMany({
            orderBy: {
                name: "asc"
            }
        });

        if (!locations) {
            return new NextResponse("Locations Not Found", { status: 404 });
        }

        return NextResponse.json(locations);
    } catch (err) {
        if (err instanceof Error) {
            console.error('[LOCATION_GET] ', err.message);
        }
        return new NextResponse('Internal Error', { status: 500});
    }
}

export async function POST(req: NextRequest) {
    const { name, description, longitude, latitude, address } = await req.json();

    if (!name || !description || !longitude || !latitude || !address) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    try {
        const location = await db.location.create({
            data: {
                name: name,
                description: description,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                address: address
            }
        });

        return NextResponse.json(location);
    } catch (err) {
        if (err instanceof Error) {
            console.error("[LOCATION_POST] ", err.message);
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}