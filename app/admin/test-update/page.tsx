'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestUpdatePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [carId, setCarId] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const testUpdate = async () => {
    if (!carId || !newPrice) {
      alert('Bitte geben Sie eine Auto-ID und einen neuen Preis ein');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('Teste Update für Auto ID:', carId);
      console.log('Neuer Preis:', newPrice);

      const { data, error } = await supabase
        .from('cars')
        .update({ price_per_day: parseInt(newPrice) })
        .eq('id', carId)
        .select();

      console.log('Update Response:', { data, error });

      if (error) {
        setResult({
          success: false,
          error: error.message,
          details: error,
          code: error.code,
        });
      } else {
        // Prüfe ob die Daten wirklich aktualisiert wurden
        const { data: verifyData } = await supabase
          .from('cars')
          .select('*')
          .eq('id', carId)
          .single();

        setResult({
          success: true,
          message: 'Update erfolgreich!',
          updatedData: data,
          verifiedData: verifyData,
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        error: err.message,
        details: err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Update-Test</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Auto ID (UUID):</label>
              <input
                type="text"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                placeholder="z.B. 5313035b-d6ec-4013-b367-7a3e09c2bac5"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Neuer Preis (€):</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="z.B. 100"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            <button
              onClick={testUpdate}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Teste...' : 'Update testen'}
            </button>
          </div>
        </div>

        {result && (
          <div className={`p-6 rounded-lg border ${
            result.success 
              ? 'bg-green-500/20 border-green-500/50' 
              : 'bg-red-500/20 border-red-500/50'
          }`}>
            <h2 className="text-xl font-semibold mb-2">
              {result.success ? '✅ Erfolgreich' : '❌ Fehler'}
            </h2>
            
            {result.success ? (
              <div className="space-y-4">
                <p className="text-green-300">{result.message}</p>
                <div>
                  <h3 className="font-semibold mb-2">Aktualisierte Daten:</h3>
                  <pre className="text-xs bg-gray-900 p-4 rounded overflow-auto">
                    {JSON.stringify(result.updatedData, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Verifizierte Daten aus DB:</h3>
                  <pre className="text-xs bg-gray-900 p-4 rounded overflow-auto">
                    {JSON.stringify(result.verifiedData, null, 2)}
                  </pre>
                </div>
                <p className="text-green-300">
                  Preis in DB: €{result.verifiedData?.price_per_day}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-300 mb-2">Fehler: {result.error}</p>
                {result.code && (
                  <p className="text-red-300 mb-2">Fehlercode: {result.code}</p>
                )}
                {result.code === '42501' && (
                  <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded">
                    <p className="text-yellow-300 font-semibold">RLS-Policy-Fehler!</p>
                    <p className="text-yellow-300 text-sm mt-2">
                      Bitte führen Sie die SQL-Befehle aus <code>supabase-fix-policies.sql</code> im Supabase SQL Editor aus.
                    </p>
                  </div>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer text-red-300">Details</summary>
                  <pre className="mt-2 text-xs bg-gray-900 p-4 rounded overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

