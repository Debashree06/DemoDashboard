
const UserDashboard = () => {
  const userName = "User"; 

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-500 mb-4">
          Welcome, {userName}!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is your dashboard. You can see an overview of your data and access various features here.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;