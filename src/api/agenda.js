export const API_BASE = 'https://playground.4geeks.com/contact/agendas';

export async function ChechkAgenda(slug) {
  const { agendas } = await fetch(`${API_BASE}?offset=0&limit=100`, {
    headers: { accept: 'application/json' }
  }).then(r => r.json());
  if (!agendas.some(a => a.slug === slug)) {
    await fetch(`${API_BASE}/${slug}`, {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: ''
    });
  }
}

export async function fetchContacts(slug) {
  const { contacts } = await fetch(`${API_BASE}/${slug}/contacts`, {
    headers: { accept: 'application/json' }
  }).then(r => r.json());
  return contacts;
}

export async function deleteContactApi(slug, id) {
  const res = await fetch(`${API_BASE}/${slug}/contacts/${id}`, {
    method: 'DELETE',
    headers: { accept: 'application/json' }
  });
  return res.ok;
}
