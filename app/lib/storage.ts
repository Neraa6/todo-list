// helpers/storage.ts
export const STORAGE_KEY = 'todo.boards.v1';

export function loadBoards(): any | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('loadBoards error', e);
    return null;
  }
}

export function saveBoards(data: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('saveBoards error', e);
  }
}
