# Portfolio Website - Tugas JDA 

## Halaman yang Telah Dibuat adalah crud project

cara akses fitur adalah dengan localhost:3000/crud

## Environment Variables Required

You need to add both URLs to your `.env` file:

# Direct URL (for migrations)
DIRECT_URL="postgresql://postgres:postgres@localhost:51214/template1?sslmode=disable"
```

## Setup 

1. **Tambahkan .env ke local

2. **Generate Prisma Client:**
  
   npx prisma generate

3. **Run Database Migration:**
 
   npm run db:migrate

4. **Seed the Database:**
  
   npm run db:seed

5. **Start the Development Server:**
  
   npm run dev

