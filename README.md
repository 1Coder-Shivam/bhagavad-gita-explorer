# Bhagavad Gita Explorer

A modern web application built with Next.js for exploring the Bhagavad Gita, featuring chapter-wise verses with Sanskrit text, transliterations, meanings, and detailed explanations.

## Features

- Clean and intuitive user interface
- Chapter-wise organization of verses
- Sanskrit text with transliteration
- Verse meanings and detailed explanations
- Easy navigation between chapters and verses
- Responsive design for all devices

## Tech Stack

- Next.js
- TypeScript
- Firebase Authentication
- CSS Modules

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── components/     # React components
│   ├── styles/         # CSS styles
│   └── pages/          # Next.js pages
├── public/
│   └── jsonData/       # Chapter-wise verse data
└── types/              # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
