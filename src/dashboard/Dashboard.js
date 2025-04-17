import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import RecentOrders from "../components/RecentOrders";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Revenue" value="$89,421.63" change="+12.5%" />
          <StatCard title="Orders" value="1,832" change="+8.2%" />
          <StatCard title="Customers" value="4,591" />
          <StatCard title="Products" value="312" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-2">
            <SalesChart />
          </div>
          <CategoryPieChart />
        </div>
        <div className="mt-6">
          <RecentOrders />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
