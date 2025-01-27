'use client'; // Mark as a Client Component
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Idea Vote App!</h1>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          router.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}