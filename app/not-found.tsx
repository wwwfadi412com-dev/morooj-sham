import Link from "next/link";
import { SearchFilter } from "@/components/SearchFilter";

export default function NotFound() {
  return (
    <div className="container max-w-3xl py-20 text-center">
      <p className="font-latin text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 text-2xl font-extrabold md:text-3xl">الصفحة غير موجودة</h1>
      <p className="mt-3 text-muted">ربما تغيّر الرابط. جرّب البحث عن عقارك مباشرة:</p>
      <div className="mt-8 text-right">
        <SearchFilter compact />
      </div>
      <Link href="/" className="btn-outline mt-8">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
