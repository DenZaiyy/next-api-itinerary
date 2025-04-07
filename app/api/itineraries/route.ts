import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET() {
    try {
        const itineraries = await db.itinerary.findMany();

        if (!itineraries) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json(itineraries);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_GET] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const { title, description, locations } = await req.json();

    console.log('Locations: ', locations)

    if (!title || !description) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    try {
        const itinerary = await db.itinerary.create({
            data: {
                title: title,
                description: description,
                LocationItinerary: {
                    create: Object.values(locations).map((location) => {
                        return ({
                            order: location.order,
                            mustToSee: location.mustToSee || false,
                            location: {
                                connect: {
                                    id: location.location
                                }
                            }
                        });
                    })
                }
            },
            include: {
                LocationItinerary: {
                    include: {
                        location: true
                    }
                }
            }
        });

        return NextResponse.json(itinerary);
    } catch (err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_POST] ", err.message);
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
