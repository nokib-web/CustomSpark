
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.$connect()
        console.log('Successfully connected to the database')

        // Optional: Try to query users to ensure schema matches
        const count = await prisma.user.count()
        console.log(`Connection verified. Found ${count} users.`)

    } catch (e) {
        console.error('Error connecting to database:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
