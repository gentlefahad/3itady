import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: playersData, error } = await supabase.from('players').select('*');
      if (error) console.error(error);
      else setPlayers(playersData);
    }
    fetchData();
  }, []);

  return (
    <main className="bg-neutral-950 min-h-screen text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-12 text-center">Pro Player Setups</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {players.map(player => (
            <Link key={player.id} href={`/player/${player.id}`} className="block bg-neutral-900 rounded-2xl shadow-lg p-6 transition hover:scale-105">
              <div className="flex flex-col items-center">
                <Image src={player.image_url} alt={player.name} width={160} height={160} className="rounded-xl object-cover" />
                <h2 className="text-2xl font-bold mt-4">{player.name}</h2>
                <p className="text-neutral-400">{player.game}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
