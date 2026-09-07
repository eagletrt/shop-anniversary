# E-AGLE Trento Racing Team - Shop Anniversary

Piattaforma web sviluppata per la vetrina e la gestione dei pre-ordini del merchandising celebrativo per il decimo anniversario del team.
Il sito permette di raccogliere gli ordini a scopo di fundraising senza processare transazioni online dirette.

## 🛠 Stack Tecnologico

- **Framework**: Next.js (React 19)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **State Management**: Zustand
- **Database**: PostgreSQL con Prisma ORM
- **Email**: Nodemailer (per conferme e notifiche)

## 📋 Requisiti

- Node.js (v26.0.0 o superiore)
- pnpm (consigliato v10+)
- Un'istanza di database PostgreSQL attiva

## 🚀 Setup e Installazione Locale

1. **Installazione dipendenze:**
   ```bash
   pnpm install
   ```

2. **Configurazione variabili d'ambiente:**
   Copia il file di esempio per creare la tua configurazione locale:
   ```bash
   cp .env.example .env
   ```
   Dovrai compilare il file `.env` inserendo la stringa di connessione a PostgreSQL (`DATABASE_URL`) e le eventuali credenziali SMTP per l'invio delle email.

3. **Inizializzazione del Database:**
   Per applicare lo schema al tuo database vuoto, esegui:
   ```bash
   pnpm exec prisma db push
   # oppure, per applicare le migrazioni esistenti:
   pnpm exec prisma migrate dev
   ```

4. **Popolamento del database (Seeding) - Opzionale:**
   Per inserire i prodotti di base, usa lo script di seeding:
   ```bash
   pnpm exec tsx prisma/seed.ts
   ```

5. **Avvio dell'ambiente di sviluppo:**
   ```bash
   pnpm dev
   ```
   Il sito sarà disponibile all'indirizzo `http://localhost:3000`.

## 📜 Script Principali

- `pnpm dev`: Avvia il server di sviluppo locale.
- `pnpm build`: Compila l'applicazione ottimizzata per la produzione.
- `pnpm start`: Avvia l'applicazione in modalità produzione.
- `pnpm check`: Esegue l'analisi statica (linting) e controlla la formattazione.
- `pnpm fix`: Corregge automaticamente gli errori di linting e formatta il codice.

## 🐳 Docker

Il progetto è predisposto per la containerizzazione. Puoi utilizzare il `Dockerfile` o il file `docker-compose.yml` inclusi per configurare rapidamente un ambiente di produzione o testing isolato per l'applicazione web.

## 📝 Note di Sviluppo

- **Gestione Immagini:** Le immagini dei prodotti devono essere collocate in una directory accessibile pubblicamente (ad es. in `public/` o su un bucket cloud). I campi del database `imageNeutral` e `imageLifestyle` relativi ai prodotti devono contenere l'URL o il percorso dell'immagine.
- **Flusso Ordini:** Poiché il sistema è pensato per i **pre-ordini** (fundraising), non viene processato alcun pagamento diretto. Quando un utente completa la procedura, l'ordine viene registrato a database con lo stato di default `PENDING`.
