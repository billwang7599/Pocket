"use server";

export default async function SettingsPage() {
    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600 mt-1">
                    Manage your account preferences
                </p>
            </div>

            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                        Account
                    </h2>
                    <a href="/auth/logout">Logout</a>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                        Appearance
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Appearance settings coming soon...
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                        Notifications
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Notification preferences coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
}
