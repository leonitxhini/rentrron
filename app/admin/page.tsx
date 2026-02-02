'use client';

import { useState, useEffect } from 'react';
import { supabase, type Car, type Transmission, type Fuel } from '@/lib/supabase';
import { Plus, Edit, Trash2, Car as CarIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({
    slug: '',
    name: '',
    brand: '',
    model: '',
    year: undefined,
    color: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    horsepower: 0,
    ac: true,
    price_per_day: 0,
    status: 'available',
    location_availability: [],
    images: [],
    featured: false,
    tags: [],
    description: '',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Prüfe ob Supabase konfiguriert ist
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase ist nicht konfiguriert. Bitte .env.local Datei mit NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY erstellen.');
      }
      
      // Teste die Verbindung zuerst
      console.log('Supabase URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NICHT GESETZT');
      console.log('Supabase Key vorhanden:', !!supabaseKey);
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase ist nicht konfiguriert. Bitte .env.local Datei mit NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY erstellen und Server neu starten.');
      }
      
      // Timeout für die Abfrage (10 Sekunden)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Zeitüberschreitung: Die Datenbankabfrage hat zu lange gedauert. Bitte prüfen Sie Ihre Supabase-Verbindung und die RLS-Policies.')), 10000)
      );
      
      console.log('Starte Datenbankabfrage...');
      // Lade ALLE Autos - Supabase hat ein Standard-Limit von 1000, daher explizit erhöhen
      const queryPromise = supabase
        .from('cars')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(10000); // Sehr hohes Limit um sicherzustellen, dass alle geladen werden

      const result = await Promise.race([queryPromise, timeoutPromise]) as any;
      console.log('Abfrage-Ergebnis:', result);
      const { data, error: queryError, count } = result;

      if (queryError) {
        throw new Error(queryError.message || 'Fehler beim Laden der Daten');
      }
      
      console.log('Geladene Autos:', data?.length || 0, 'von', count || 'unbekannt', 'Gesamt');
      
      if (data && count && data.length < count) {
        console.warn(`⚠️ WARNUNG: Nur ${data.length} von ${count} Autos wurden geladen!`);
      }
      
      setCars(data || []);
    } catch (error: any) {
      console.error('Fehler beim Laden der Fahrzeuge:', error);
      setError(error.message || 'Unbekannter Fehler beim Laden der Fahrzeuge');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Bereinige formData - entferne undefined Werte und konvertiere Arrays
      const cleanData: any = {};
      
      // Kopiere alle definierten Werte
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof Car];
        if (value !== undefined && value !== null && value !== '') {
          cleanData[key] = value;
        }
      });

      // Stelle sicher, dass Arrays vorhanden sind
      cleanData.location_availability = formData.location_availability || [];
      cleanData.images = formData.images || [];
      cleanData.tags = formData.tags || [];
      
      // Stelle sicher, dass Pflichtfelder vorhanden sind
      if (!cleanData.slug || !cleanData.name || !cleanData.brand || !cleanData.model || 
          !cleanData.transmission || !cleanData.fuel || !cleanData.seats || 
          !cleanData.horsepower || cleanData.price_per_day === undefined) {
        throw new Error('Bitte füllen Sie alle Pflichtfelder aus');
      }

      // Entferne id, created_at, updated_at aus cleanData (werden automatisch verwaltet)
      delete cleanData.id;
      delete cleanData.created_at;
      delete cleanData.updated_at;

      console.log('Speichere Daten:', cleanData);
      console.log('Editing Car ID:', editingCar?.id);

      if (editingCar) {
        // Update - prüfe zuerst, ob das Auto existiert
        console.log('Versuche Update für Auto ID:', editingCar.id);
        console.log('Zu aktualisierende Daten:', JSON.stringify(cleanData, null, 2));
        
        const { data, error } = await supabase
          .from('cars')
          .update(cleanData)
          .eq('id', editingCar.id)
          .select();

        console.log('Update Response:', { data, error });

        if (error) {
          console.error('Update-Fehler Details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // Spezielle Behandlung für RLS-Fehler
          if (error.code === '42501' || error.message.includes('policy') || error.message.includes('RLS')) {
            throw new Error('RLS-Policy-Fehler: Bitte führen Sie die SQL-Befehle aus supabase-fix-policies.sql im Supabase SQL Editor aus!');
          }
          
          throw new Error(`Update-Fehler: ${error.message}${error.details ? ' - ' + error.details : ''}`);
        }
        
        if (!data || data.length === 0) {
          console.warn('Update gab keine Daten zurück - prüfe ob Auto existiert...');
          
          // Prüfe ob das Auto noch existiert
          const { data: checkData } = await supabase
            .from('cars')
            .select('id')
            .eq('id', editingCar.id)
            .single();
            
          if (!checkData) {
            throw new Error('Das Auto existiert nicht mehr in der Datenbank.');
          }
          
          throw new Error('Update wurde ausgeführt, aber keine Daten zurückgegeben. Prüfen Sie die RLS-Policies in Supabase.');
        }
        
        console.log('Update erfolgreich - neue Daten:', data[0]);
        
        // Aktualisiere die Liste direkt mit den neuen Daten
        setCars(prevCars => {
          const updated = prevCars.map(car => car.id === editingCar.id ? data[0] : car);
          console.log('Aktualisierte Liste:', updated);
          return updated;
        });
      } else {
        // Create
        const { data, error } = await supabase
          .from('cars')
          .insert([cleanData])
          .select();

        if (error) {
          console.error('Insert-Fehler Details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw new Error(`Insert-Fehler: ${error.message}${error.details ? ' - ' + error.details : ''}`);
        }
        
        if (!data || data.length === 0) {
          throw new Error('Keine Daten wurden erstellt. Prüfen Sie die RLS-Policies in Supabase.');
        }
        
        console.log('Insert erfolgreich:', data);
        
        // Füge das neue Auto zur Liste hinzu
        setCars(prevCars => [data[0], ...prevCars]);
      }

      // Lade die Daten neu, um sicherzustellen, dass alles synchronisiert ist
      await fetchCars();
      
      setShowModal(false);
      setEditingCar(null);
      resetForm();
      
      // Erfolgsmeldung
      alert(editingCar ? 'Fahrzeug erfolgreich aktualisiert!' : 'Fahrzeug erfolgreich erstellt!');
    } catch (error: any) {
      console.error('Fehler beim Speichern:', error);
      const errorMessage = error.message || 'Unbekannter Fehler beim Speichern der Daten';
      setError(errorMessage);
      alert(`Fehler: ${errorMessage}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Fahrzeug wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCars();
    } catch (error: any) {
      console.error('Fehler beim Löschen:', error);
      alert(`Fehler: ${error.message}`);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      slug: car.slug,
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      color: car.color,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      horsepower: car.horsepower,
      ac: car.ac,
      price_per_day: car.price_per_day,
      status: car.status,
      location_availability: car.location_availability,
      images: car.images,
      featured: car.featured,
      tags: car.tags,
      description: car.description,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      brand: '',
      model: '',
      year: undefined,
      color: '',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      horsepower: 0,
      ac: true,
      price_per_day: 0,
      status: 'available',
      location_availability: [],
      images: [],
      featured: false,
      tags: [],
      description: '',
    });
    setEditingCar(null);
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
            <CarIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            <span className="break-words">Admin Panel - Fahrzeugverwaltung</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Verwalten Sie Ihre Fahrzeugflotte
            {cars.length > 0 && (
              <span className="ml-2 text-blue-400">
                ({cars.length} {cars.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'})
              </span>
            )}
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Fahrzeuge suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Neues Fahrzeug</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mb-6">
            <h3 className="text-red-400 font-bold mb-2">⚠️ Fehler beim Laden der Daten</h3>
            <p className="text-red-300 text-sm mb-4">{error}</p>
            <button
              onClick={fetchCars}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        )}
        
        {!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-6 mb-6">
            <h3 className="text-yellow-400 font-bold mb-2">⚠️ Supabase nicht konfiguriert</h3>
            <p className="text-yellow-300 text-sm">
              Bitte füllen Sie die .env.local Datei mit folgenden Werten aus:
            </p>
            <pre className="mt-2 text-xs bg-gray-900 p-3 rounded border border-gray-700">
{`NEXT_PUBLIC_SUPABASE_URL=ihre_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr_anon_key`}
            </pre>
            <p className="text-yellow-300 text-sm mt-2">
              Nach dem Speichern bitte den Server neu starten (Strg+C und dann npm run dev).
            </p>
          </div>
        ) : null}

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-gray-400">Lade Fahrzeuge...</p>
          </div>
        ) : filteredCars.length === 0 && !loading ? (
          <div className="text-center py-20 bg-gray-800/30 rounded-lg border border-gray-700">
            <CarIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Keine Fahrzeuge gefunden</p>
            <p className="text-gray-500 text-sm mt-2">Fügen Sie ein neues Fahrzeug hinzu, um zu beginnen.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold truncate">{car.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{car.brand} {car.model}</p>
                    <p className="text-gray-500 text-xs mt-1 font-mono truncate" title="Auto ID - Kopieren für Tests">
                      ID: {car.id.substring(0, 8)}...
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    car.status === 'available' ? 'bg-green-500/20 text-green-400' :
                    car.status === 'reserved' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {car.status}
                  </span>
                </div>

                {car.images && car.images.length > 0 && (
                  <div className="mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gray-900">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-24 sm:h-32 object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Preis/Tag:</span>
                    <span className="font-semibold">€{car.price_per_day?.toLocaleString('de-DE') || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Getriebe:</span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kraftstoff:</span>
                    <span>{car.fuel}</span>
                  </div>
                  {car.featured && (
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleEdit(car)}
                    className="flex-1 px-3 sm:px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Bearbeiten</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="px-3 sm:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(car.id);
                    alert('ID kopiert: ' + car.id);
                  }}
                  className="w-full px-2 py-1.5 bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors"
                  title="Klicken zum Kopieren der vollständigen ID"
                >
                  📋 ID kopieren
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingCar ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug hinzufügen'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Marke *</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Modell *</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Jahr</label>
                    <input
                      type="number"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Farbe</label>
                    <input
                      type="text"
                      value={formData.color || ''}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Status *</label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Car['status'] })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="available">Verfügbar</option>
                      <option value="reserved">Reserviert</option>
                      <option value="maintenance">Wartung</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Getriebe *</label>
                    <select
                      required
                      value={formData.transmission}
                      onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="Automatic">Automatik</option>
                      <option value="Manual">Manuell</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Kraftstoff *</label>
                    <select
                      required
                      value={formData.fuel}
                      onChange={(e) => setFormData({ ...formData, fuel: e.target.value as Fuel })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="Petrol">Benzin</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Elektrisch</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Sitze *</label>
                    <input
                      type="number"
                      required
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">PS *</label>
                    <input
                      type="number"
                      required
                      value={formData.horsepower}
                      onChange={(e) => setFormData({ ...formData, horsepower: parseInt(e.target.value) })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Preis/Tag (€) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                      <input
                        type="number"
                        required
                        min="0"
                        step="1"
                        value={formData.price_per_day || ''}
                        onChange={(e) => setFormData({ ...formData, price_per_day: e.target.value ? parseInt(e.target.value) : 0 })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Standorte (kommagetrennt)</label>
                  <input
                    type="text"
                    value={formData.location_availability?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, location_availability: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    placeholder="Ferizaj, Prishtina Airport, Skopje Airport"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bilder (URLs, kommagetrennt)</label>
                  <input
                    type="text"
                    value={formData.images?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    placeholder="/cars/example.png, /cars/example2.png"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (kommagetrennt)</label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    placeholder="premium, airport, popular"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Beschreibung</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <label htmlFor="featured" className="text-xs sm:text-sm">Featured</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="ac"
                    checked={formData.ac}
                    onChange={(e) => setFormData({ ...formData, ac: e.target.checked })}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <label htmlFor="ac" className="text-xs sm:text-sm">Klimaanlage</label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                  >
                    {editingCar ? 'Aktualisieren' : 'Hinzufügen'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

