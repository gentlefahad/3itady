import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<any>(null);
  const [gear, setGear] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchPlayer() {
      const { data: playerData } = await supabase.from('players').select('*').eq('id', id).single();
      setPlayer(playerData);

      const { data: gearData } = await supabase.from('gear').select('*').eq('player_id', id);
      setGear(gearData || []);
    }

    fetchPlayer();
  }, [id]);

  if (!player) return <p className="text-white p-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-neutral-900 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <Image src={player.image_url} alt={player.name} width={120} height={120} className="rounded-xl object-cover" />
          <div>
            <h1 className="text-4xl font-bold">{player.name}</h1>
            <p className="text-neutral-400 text-lg">{player.game}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Gear</h2>
        <div className="space-y-4">
          {gear.map((item, index) => (
            <div key={index} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">{item.type}: <span className="text-neutral-300">{item.name}</span></p>
              </div>
              <a href={item.affiliate_link} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl text-sm font-medium">Buy</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
