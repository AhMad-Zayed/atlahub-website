'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleLogin(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // In a real app, you'd query the 'users' table and hash/compare passwords
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    cookies().set('admin_session', 'authenticated', { httpOnly: true, path: '/' });
    redirect('/admin/dashboard');
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function handleLogout() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}

export async function addPortfolioItem(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const image_url = formData.get('image_url');
  const type = formData.get('type');
  const result = formData.get('result');

  const query = 'INSERT INTO portfolio (title, description, image_url, type, result) VALUES (?, ?, ?, ?, ?)';
  await db.query(query, [title, description, image_url, type, result]);

  revalidatePath('/admin/dashboard');
  revalidatePath('/api/portfolio');
}

export async function deletePortfolioItem(id) {
  if (!id) return;
  const query = 'DELETE FROM portfolio WHERE id = ?';
  await db.query(query, [id]);

  revalidatePath('/admin/dashboard');
  revalidatePath('/api/portfolio');
}