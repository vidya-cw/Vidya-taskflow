import UserTable from '../features/user-table/components/UserTable';

function App() {
	return (
		<div className="min-h-screen bg-white p-6">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">User Data</h1>
			<UserTable />
		</div>
	);
}

export default App;
