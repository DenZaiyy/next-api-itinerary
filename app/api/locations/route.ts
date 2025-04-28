import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch all locations from the database
        const locations = await db.location.findMany({
            orderBy: {
                name: "asc"
            }
        });

        // Check if locations are found
        if (!locations) {
            return new NextResponse("Locations Not Found", { status: 404 });
        }

        // Return the locations as a JSON response
        return NextResponse.json(locations);
    } catch (err) {
        if (err instanceof Error) {
            console.error('[LOCATION_GET] ', err.message);
        }
        return new NextResponse('Internal Error', { status: 500});
    }
}

export async function POST(req: NextRequest) {
    // Get the request body as JSON
    const { name, description, longitude, latitude, address } = await req.json();

    // Validate the request body
    if (!name || !description || !longitude || !latitude || !address) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    try {
        // Create a new location in the database with the provided data
        const location = await db.location.create({
            data: {
                name: name,
                description: description,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                address: address
            }
        });

        // If the location was created successfully, return it as a JSON response
        return NextResponse.json(location);
    } catch (err) {
        if (err instanceof Error) {
            console.error("[LOCATION_POST] ", err.message);
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}