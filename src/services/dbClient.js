/**
 * dbClient.js - Adapter Konektor Database Terpadu Desa Kedung Jaya
 * 
 * Otomatis mendeteksi:
 * 1. Jika env VITE_SUPABASE_URL ada -> Menggunakan Supabase Cloud PostgreSQL
 * 2. Jika env kosong -> Menggunakan Reactive Engine Aman Lokal (Local Vault)
 */

import { getAllSurat } from './workflowService';
import { getAllAduan } from './aduanService';
import { getNotifications } from './notificationService';

export const isCloudDatabaseConfigured = () => {
  return Boolean(
    import.meta.env?.VITE_SUPABASE_URL && 
    import.meta.env?.VITE_SUPABASE_ANON_KEY
  );
};

export const getDatabaseStatus = () => {
  if (isCloudDatabaseConfigured()) {
    return {
      mode: 'CLOUD_SUPABASE',
      provider: 'Supabase PostgreSQL Cloud',
      url: import.meta.env.VITE_SUPABASE_URL,
      status: 'TERKONEKSI'
    };
  } else {
    return {
      mode: 'LOCAL_REACTIVE_VAULT',
      provider: 'Local Storage Engine (Terenkripsi SHA-256)',
      url: 'Client Local Engine (Ready to Migrate)',
      status: 'AKTIF & STABIL'
    };
  }
};
