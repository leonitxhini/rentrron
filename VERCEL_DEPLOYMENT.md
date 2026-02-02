# Vercel Deployment Checkliste

## ✅ Umgebungsvariablen für Vercel

Die folgenden Umgebungsvariablen müssen in deinem Vercel-Projekt gesetzt werden:

### Erforderliche Variablen:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Wert: `https://itoiruumiyhhwocqlblv.supabase.co`
   - Typ: Plain Text
   - Environment: Production, Preview, Development

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Wert: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0b2lydXVtaXloaHdvY3FsYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTE0OTQsImV4cCI6MjA4NTYyNzQ5NH0.bpcGfKUc6kmP4qexjeM3lLvOZc5yAYnYJcFSmIwIlpI`
   - Typ: Plain Text
   - Environment: Production, Preview, Development

## 📋 So setzt du die Variablen in Vercel:

1. Gehe zu deinem Vercel Dashboard
2. Wähle dein Projekt aus
3. Gehe zu **Settings** → **Environment Variables**
4. Füge beide Variablen hinzu:
   - Klicke auf **Add New**
   - Gib den Namen ein (z.B. `NEXT_PUBLIC_SUPABASE_URL`)
   - Gib den Wert ein
   - Wähle alle Environments (Production, Preview, Development)
   - Klicke auf **Save**
5. Wiederhole für die zweite Variable

## 🔄 Nach dem Setzen der Variablen:

1. Gehe zu **Deployments**
2. Klicke auf das Menü (drei Punkte) des letzten Deployments
3. Wähle **Redeploy**
4. Oder pushe einen neuen Commit, um automatisch zu deployen

## ✅ Prüfung:

Nach dem Deployment kannst du prüfen, ob alles funktioniert:
- Öffne deine Vercel-URL
- Gehe zu `/admin` - sollte das Admin Panel laden
- Gehe zu `/fleet` - sollte alle Autos anzeigen
- Gehe zu `/` - sollte die Homepage mit allen Autos anzeigen

## 🐛 Troubleshooting:

Falls die Variablen nicht funktionieren:
1. Prüfe, ob die Variablen in Vercel gesetzt sind
2. Stelle sicher, dass alle Environments ausgewählt sind
3. Redeploy das Projekt nach dem Setzen der Variablen
4. Prüfe die Browser-Konsole auf Fehler

