import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            password: await bcrypt.hash("password", 10),
        },
    });


    console.log('Seeded users:', { user1 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });