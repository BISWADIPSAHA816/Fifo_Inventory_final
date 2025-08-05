const API_URL = process.env.REACT_APP_API_URL || 'https://fifo-inventory-final.onrender.com';

export async function fetchInventory() {
  const res = await fetch(`${API_URL}/inventory`);
  return await res.json();
}

export async function fetchLedger() {
  const res = await fetch(`${API_URL}/ledger`);
  return await res.json();
}
