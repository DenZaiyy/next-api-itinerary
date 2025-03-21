import { db } from "../lib/db";

const locationsData = [
    // Paris
    { city: "Paris", name: "Tour Eiffel", latitude: 48.8584, longitude: 2.2945, description: "Symbole de la France, offrant une vue imprenable sur Paris.", mustToSee: true },
    { city: "Paris", name: "Musée du Louvre", latitude: 48.8606, longitude: 2.3376, description: "Le plus grand musée d'art du monde, abritant la Joconde.", mustToSee: true },
    { city: "Paris", name: "Cathédrale Notre-Dame", latitude: 48.8530, longitude: 2.3499, description: "Chef-d'œuvre gothique célèbre.", mustToSee: true },
    { city: "Paris", name: "Quartier Latin", latitude: 48.8500, longitude: 2.3430, description: "Quartier historique connu pour ses ruelles animées.", mustToSee: false },

    // Lyon
    { city: "Lyon", name: "Basilique de Fourvière", latitude: 45.7622, longitude: 4.8227, description: "Vue panoramique sur la ville.", mustToSee: true },
    { city: "Lyon", name: "Vieux Lyon", latitude: 45.7626, longitude: 4.8270, description: "Quartier historique avec traboules secrètes.", mustToSee: true },
    { city: "Lyon", name: "Parc de la Tête d'Or", latitude: 45.7840, longitude: 4.8527, description: "Grand parc avec zoo et lac.", mustToSee: true },
    { city: "Lyon", name: "Halles de Lyon-Paul Bocuse", latitude: 45.7641, longitude: 4.8622, description: "Temple de la gastronomie lyonnaise.", mustToSee: false },

    // Marseille
    { city: "Marseille", name: "Basilique Notre-Dame de la Garde", latitude: 43.2841, longitude: 5.3717, description: "Offre une vue panoramique sur Marseille.", mustToSee: true },
    { city: "Marseille", name: "Vieux-Port", latitude: 43.2965, longitude: 5.3609, description: "Centre animé de la ville.", mustToSee: true },
    { city: "Marseille", name: "Calanques", latitude: 43.2171, longitude: 5.4351, description: "Paysages magnifiques aux eaux turquoise.", mustToSee: true },
    { city: "Marseille", name: "Plage des Catalans", latitude: 43.2903, longitude: 5.3536, description: "Plage proche du centre-ville.", mustToSee: false },

    // Toulouse
    { city: "Toulouse", name: "Capitole", latitude: 43.6045, longitude: 1.4440, description: "Hôtel de ville et place emblématique.", mustToSee: true },
    { city: "Toulouse", name: "Cité de l'Espace", latitude: 43.5865, longitude: 1.4870, description: "Parc dédié à l'exploration spatiale.", mustToSee: true },
    { city: "Toulouse", name: "Basilique Saint-Sernin", latitude: 43.6086, longitude: 1.4425, description: "Église romane célèbre.", mustToSee: true },
    { city: "Toulouse", name: "Canal du Midi", latitude: 43.5993, longitude: 1.4487, description: "Balades agréables en bord de canal.", mustToSee: false },

    // Nice
    { city: "Nice", name: "Promenade des Anglais", latitude: 43.6955, longitude: 7.2642, description: "Célèbre avenue longeant la mer.", mustToSee: true },
    { city: "Nice", name: "Colline du Château", latitude: 43.6945, longitude: 7.2782, description: "Vue panoramique sur Nice et la mer.", mustToSee: true },
    { city: "Nice", name: "Vieux-Nice", latitude: 43.6975, longitude: 7.2710, description: "Quartier coloré et animé.", mustToSee: true },
    { city: "Nice", name: "Musée Matisse", latitude: 43.7235, longitude: 7.2768, description: "Musée consacré à l'œuvre du peintre Henri Matisse.", mustToSee: false },

    // Nantes
    { city: "Nantes", name: "Château des Ducs de Bretagne", latitude: 47.2173, longitude: -1.5534, description: "Forteresse médiévale au cœur de Nantes.", mustToSee: true },
    { city: "Nantes", name: "Machines de l'île", latitude: 47.2064, longitude: -1.5644, description: "Éléphants mécaniques et structures incroyables.", mustToSee: true },
    { city: "Nantes", name: "Passage Pommeraye", latitude: 47.2146, longitude: -1.5584, description: "Galerie marchande du XIXe siècle.", mustToSee: true },
    { city: "Nantes", name: "Jardin des Plantes", latitude: 47.2214, longitude: -1.5428, description: "Jardin botanique idéal pour se détendre.", mustToSee: false },

    // Strasbourg
    { city: "Strasbourg", name: "Cathédrale Notre-Dame", latitude: 48.5818, longitude: 7.7509, description: "Chef-d'œuvre gothique impressionnant.", mustToSee: true },
    { city: "Strasbourg", name: "Petite France", latitude: 48.5793, longitude: 7.7414, description: "Quartier pittoresque aux maisons à colombages.", mustToSee: true },
    { city: "Strasbourg", name: "Parlement Européen", latitude: 48.5976, longitude: 7.7704, description: "Centre politique européen.", mustToSee: true },
    { city: "Strasbourg", name: "Orangerie", latitude: 48.5893, longitude: 7.7766, description: "Grand parc agréable à visiter.", mustToSee: false },
];

async function main() {
    await db.locationItinerary.deleteMany();
    await db.location.deleteMany();
    await db.itinerary.deleteMany();

    const itineraries = [];
    const groupedLocations: { [key: string]: any[] } = {};

    for (const data of locationsData) {
        if (!groupedLocations[data.city]) {
            groupedLocations[data.city] = [];
        }
        groupedLocations[data.city].push(data);
    }

    for (const city in groupedLocations) {
        const itinerary = await db.itinerary.create({
            data: {
                title: `Découverte de ${city}`,
                description: `Explorez les lieux incontournables et secrets de ${city}.`,
            },
        });

        itineraries.push(itinerary);

        for (const loc of groupedLocations[city]) {
            const location = await db.location.create({
                data: {
                    name: loc.name,
                    description: loc.description,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    address: `${loc.name}, ${city}, France`,
                },
            });

            await db.locationItinerary.create({
                data: {
                    mustToSee: loc.mustToSee,
                    order: groupedLocations[city].indexOf(loc) + 1,
                    locationId: location.id,
                    itineraryId: itinerary.id,
                },
            });
        }
    }
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });