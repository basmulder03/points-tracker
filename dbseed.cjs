const admin = require("firebase-admin");

const projectId = 'points-tracker-929ca';

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099";

admin.initializeApp({ projectId });

const seedAuth = async () => {
    const auth = admin.auth();
    try {
        const user = await auth.createUser({
            email: 'user@test.com',
            password: 'password',
            emailVerified: true
        });
        console.log(`Successfully created user: ${user.email}`);
    }
    catch (error) {
        console.error("Seeding auth Failed");
    }
}

const seedFirestore = async () => {
    const db = admin.firestore();

    try {
        // Seed events
        const events = [];
        for (let i = 1; i <= 3; i++) {
            const ref = await db.collection('events').add({
                name: `Event ${i}`,
                isActive: i === 1
            });
            console.log(`Added event with id: ${ref.id}`);

            // Seed games
            const gameIds = []
            for (let j = 1; j <= 12; j++) {
                const gameRef = await db.collection('games').add({
                    eventDocumentId: ref.id,
                    name: `Game ${j}`
                });
                gameIds.push(gameRef.id);
                console.log(`Game ID: ${gameRef.id}`);
            }

            // Seed teams
            const teamIds = [];
            for (let j = 1; j <= 12; j++) {
                const teamRef = await db.collection('teams').add({
                    eventDocumentId: ref.id,
                    name: `Team ${j}`
                });
                teamIds.push(teamRef.id);
                console.log(`Team ${teamRef.id}`);
            }

            // Seed points
            for (let j = 0; j < gameIds.length; j++) {
                if (Math.random() * 100 <= 50) continue;

                const shuffledTeams = shuffle(teamIds);

                for (let k = 0; k < shuffledTeams.length; k++) {
                    const pointRef = await db.collection('points').add({
                        eventDocumentId: ref.id,
                        gameDocumentId: gameIds[j],
                        teamDocumentId: teamIds[k],
                        amount: k + 1
                    });
                    console.log(`Added points ${pointRef.id} for team: ${teamIds[k]} on game: ${gameIds[j]}`);
                }
            }
        }
    }
    catch (error) {
        console.error("Seeding firestore failed");
    }
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

(async () => {
    await seedAuth();
    await seedFirestore();
})();
