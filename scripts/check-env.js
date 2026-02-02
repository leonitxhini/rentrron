#!/usr/bin/env node

/**
 * Prüft, ob alle erforderlichen Umgebungsvariablen gesetzt sind
 */

const fs = require('fs');
const path = require('path');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔍 Prüfe Umgebungsvariablen...\n');

// Lade .env.local falls vorhanden
const envPath = path.join(process.cwd(), '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

// Prüfe sowohl process.env als auch .env.local
let allSet = true;
const results = {};

requiredVars.forEach(varName => {
  const value = process.env[varName] || envVars[varName];
  if (value) {
    // Zeige nur die ersten und letzten Zeichen für Sicherheit
    const masked = value.length > 20 
      ? `${value.substring(0, 10)}...${value.substring(value.length - 10)}`
      : '***';
    results[varName] = { set: true, masked };
  } else {
    results[varName] = { set: false };
    allSet = false;
  }
});

// Zeige Ergebnisse
requiredVars.forEach(varName => {
  const result = results[varName];
  if (result.set) {
    console.log(`✅ ${varName}: ${result.masked}`);
  } else {
    console.log(`❌ ${varName}: NICHT GESETZT`);
  }
});

console.log('\n' + '='.repeat(50));

if (allSet) {
  console.log('✅ Alle Umgebungsvariablen sind gesetzt!');
  console.log('\n📋 Für Vercel:');
  console.log('   Diese Variablen müssen auch in Vercel gesetzt werden:');
  console.log('   Settings → Environment Variables');
  process.exit(0);
} else {
  console.log('❌ Einige Umgebungsvariablen fehlen!');
  console.log('\n📝 Bitte setze die fehlenden Variablen in:');
  console.log('   - Lokal: .env.local Datei');
  console.log('   - Vercel: Settings → Environment Variables');
  console.log('\n📖 Siehe VERCEL_DEPLOYMENT.md für Details');
  process.exit(1);
}

