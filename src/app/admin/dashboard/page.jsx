import { db } from '@/lib/db';
import { addPortfolioItem, deletePortfolioItem, handleLogout } from '../actions';
import { revalidatePath } from 'next/cache';

async function getPortfolioItems() {
    const [rows] = await db.query('SELECT * FROM portfolio ORDER BY id DESC');
    return rows;
}

async function getContactMessages() {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows;
}

export default async function DashboardPage() {
    const portfolioItems = await getPortfolioItems();
    const contactMessages = await getContactMessages();

    return (
        <div className="min-h-screen bg-gray-100 font-cairo p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-brand-blue">Admin Dashboard</h1>
                    <form action={handleLogout}>
                        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Logout</button>
                    </form>
                </div>

                {/* Portfolio Management */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Manage Portfolio</h2>
                    <form action={addPortfolioItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border-b pb-8">
                        <input name="title" placeholder="Project Title" className="p-2 border rounded" required />
                        <input name="type" placeholder="Project Type (e.g., Web App)" className="p-2 border rounded" required />
                        <input name="image_url" placeholder="Image URL" className="p-2 border rounded" required />
                        <input name="result" placeholder="The Result (e.g., +200% ROI)" className="p-2 border rounded" required />
                        <textarea name="description" placeholder="Challenge & Solution" className="p-2 border rounded md:col-span-2" rows="3" required></textarea>
                        <button type="submit" className="bg-brand-blue text-white p-2 rounded-lg font-semibold hover:bg-brand-blue-light transition md:col-span-2">Add Portfolio Item</button>
                    </form>

                    <div className="space-y-4">
                        {portfolioItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-bold">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.type}</p>
                                </div>
                                <form action={async () => {
                                    'use server';
                                    await deletePortfolioItem(item.id);
                                    revalidatePath('/admin/dashboard');
                                }}>
                                    <button type="submit" className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Messages */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
                    <div className="space-y-4">
                        {contactMessages.map(msg => (
                            <div key={msg.id} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">{msg.name} <span className="font-normal text-gray-600">&lt;{msg.email}&gt;</span></p>
                                        <p className="text-sm text-brand-blue font-semibold">Service: {msg.service}</p>
                                        {msg.phone && <p className="text-sm text-gray-500">Phone: {msg.phone}</p>}
                                    </div>
                                    <p className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</p>
                                </div>
                                <p className="mt-4 bg-white p-3 rounded">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}