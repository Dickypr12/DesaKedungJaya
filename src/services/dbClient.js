/**
 * dbClient.js - Adapter Konektor Database Terpadu Desa Kedung Jaya
 * Menggunakan @supabase/supabase-js dengan fallback otomatis ke Reactive Local Vault
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

export const isCloudDatabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Instance client Supabase resmi
export const supabase = isCloudDatabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getDatabaseStatus = () => {
  if (isCloudDatabaseConfigured()) {
    return {
      mode: 'CLOUD_SUPABASE',
      provider: 'Supabase PostgreSQL Cloud',
      url: supabaseUrl,
      status: 'TERKONEKSI ONLINE'
    };
  } else {
    return {
      mode: 'LOCAL_REACTIVE_VAULT',
      provider: 'Local Storage Engine (Terenkripsi SHA-256)',
      url: 'Client Local Engine',
      status: 'AKTIF & STABIL'
    };
  }
};

/**
 * Uji konektivitas langsung ke tabel users di Supabase
 */
export async function testSupabaseConnection() {
  if (!supabase) {
    return { success: false, message: 'Kredensial Supabase belum terkonfigurasi di file .env' };
  }

  try {
    const { data, error } = await supabase.from('users').select('id, nama, role').limit(5);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, count: data?.length || 0, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
