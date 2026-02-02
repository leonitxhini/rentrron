'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        const { data, error } = await supabase
          .from('cars')
          .select('count')
          .limit(1);

        console.log('Result:', { data, error });

        if (error) {
          setResult({ success: false, error: error.message, details: error });
        } else {
          const { count } = await supabase
            .from('cars')
            .select('*', { count: 'exact', head: true });
          
          setResult({ 
            success: true, 
            message: 'Verbindung erfolgreich!',
            count: count || 0
          });
        }
      } catch (err: any) {
        setResult({ success: false, error: err.message, details: err });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Teste Supabase-Verbindung...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Supabase-Verbindungstest</h1>
        
        <div className={`p-6 rounded-lg border ${
          result?.success 
            ? 'bg-green-500/20 border-green-500/50' 
            : 'bg-red-500/20 border-red-500/50'
        }`}>
          <h2 className="text-xl font-semibold mb-2">
            {result?.success ? '✅ Erfolgreich' : '❌ Fehler'}
          </h2>
          
          {result?.success ? (
            <div>
              <p className="text-green-300 mb-2">{result.message}</p>
              <p className="text-green-300">Anzahl Fahrzeuge: {result.count}</p>
            </div>
          ) : (
            <div>
              <p className="text-red-300 mb-2">Fehler: {result?.error}</p>
              <details className="mt-4">
                <summary className="cursor-pointer text-red-300">Details</summary>
                <pre className="mt-2 text-xs bg-gray-800 p-4 rounded overflow-auto">
                  {JSON.stringify(result?.details, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Umgebungsvariablen:</h3>
          <pre className="text-xs">
            NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Gesetzt' : '❌ Nicht gesetzt'}
            {'\n'}
            NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Gesetzt' : '❌ Nicht gesetzt'}
          </pre>
        </div>
      </div>
    </div>
  );
}

