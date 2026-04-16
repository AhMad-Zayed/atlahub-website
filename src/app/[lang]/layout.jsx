export default async function LangLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang;
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>{children}</div>
  );
}