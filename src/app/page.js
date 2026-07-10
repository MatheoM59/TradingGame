'use client';
import { Header } from '@/components/header/Header';
import { Login } from '@/components/login/Login';
export default function Home() {
  return (
    <div>
      <Header />
      <h1>Trading Game</h1>
      <Login />
    </div>
  );
}
