-- Füge fehlende Autos in Supabase ein
-- Führen Sie diese SQL-Befehle im Supabase SQL Editor aus

-- Prüfe zuerst, welche Autos bereits existieren
-- SELECT slug FROM cars;

-- Füge fehlende Autos ein (nur wenn sie noch nicht existieren)
INSERT INTO cars (slug, name, brand, model, year, color, transmission, fuel, seats, horsepower, ac, price_per_day, location_availability, images, featured, tags, description, status)
VALUES
  ('vw-golf-7-black', 'VW Golf 7', 'Volkswagen', 'Golf 7', 2015, 'Black', 'Automatic', 'Petrol', 5, 140, true, 45, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/vw-golf-7-black.png'], false, ARRAY['popular'], 'VW Golf 7 - Black - Automatic', 'available'),
  ('vw-golf-7-grey', 'VW Golf 7', 'Volkswagen', 'Golf 7', 2015, 'Grey', 'Automatic', 'Petrol', 5, 140, true, 45, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/vw-golf-7-grey.png'], false, ARRAY['popular'], 'VW Golf 7 - Grey - Automatic', 'available'),
  ('vw-golf-7-light-grey', 'VW Golf 7', 'Volkswagen', 'Golf 7', 2015, 'Light Grey', 'Automatic', 'Petrol', 5, 140, true, 45, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/vw-golf-7-light-grey.png'], false, ARRAY['popular'], 'VW Golf 7 - Light Grey - Automatic', 'available'),
  ('peugeot-308-2020-grey', 'Peugeot 308', 'Peugeot', '308', 2020, 'Grey', 'Automatic', 'Diesel', 5, 130, true, 45, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/peugeot-308-2020-grey.png'], false, ARRAY['popular'], 'Peugeot 308 2020 - Grey - Automatic', 'available'),
  ('peugeot-308-2019-grey', 'Peugeot 308', 'Peugeot', '308', 2019, 'Grey', 'Automatic', 'Diesel', 5, 130, true, 45, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/peugeot-308-2019-grey.png'], false, ARRAY['popular'], 'Peugeot 308 2019 - Grey - Automatic', 'available'),
  ('peugeot-208-2016-green', 'Peugeot 208', 'Peugeot', '208', 2016, 'Green', 'Manual', 'Petrol', 5, 100, true, 40, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/peugeot-208-2016-green.png'], false, ARRAY['popular'], 'Peugeot 208 2016 - Green - Manual', 'available'),
  ('citroen-c4-2015-grey', 'Citroen C4', 'Citroen', 'C4', 2015, 'Grey', 'Automatic', 'Petrol', 5, 120, true, 40, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/citroen-c4-2015-grey.png'], false, ARRAY[]::TEXT[], 'Citroen C4 2015 - Grey - Automatic', 'available'),
  ('citroen-c4-2015-white', 'Citroen C4', 'Citroen', 'C4', 2015, 'White', 'Manual', 'Petrol', 5, 120, true, 40, ARRAY['Ferizaj', 'Prishtina Airport', 'Skopje Airport'], ARRAY['/cars/citroen-c4-2015-white.png'], false, ARRAY[]::TEXT[], 'Citroen C4 2015 - White - Manual', 'available')
ON CONFLICT (slug) DO NOTHING;

-- Hinweis: Ford Fiesta hat kein Bild, daher nicht eingefügt
-- Falls Sie es trotzdem einfügen möchten, können Sie es manuell über das Admin-Panel hinzufügen

-- Prüfe die Anzahl der Autos nach dem Einfügen
-- SELECT COUNT(*) FROM cars;

