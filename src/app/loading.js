export default function Loading() {
    return (
        <div className="flex h-screen items-center flex-col gap-8 justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-3 border-primary dark:border-white"></div>
            <p className="text-primary dark:text-white font-bold">جاري التحميل...</p>
            <p className="text-primary dark:text-white text-xs">يرجي الانتظار حتي تحميل البيانات.</p>
        </div>
    );
}