"use server";
export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="m-8 md:m-16">{children}</div>
        </div>
    );
}
