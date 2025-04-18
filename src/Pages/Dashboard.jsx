import React from "react";
import { Sales } from "./Dashboard/Sales(Line)";
import { Units } from "./Dashboard/Units(Line)";
import { Order } from "./Dashboard/Order(Doughnut)";
import VendorInsights from "./Dashboard/VendorInsights";
import { OrdersCustomersChart } from "./Dashboard/OrdersCustomersChart";
import BestProductsOverview from "./Dashboard/BestProductsOverview";

const Dashboard = () => {
  return (
    <div>
      <div className="pb-5 p-4  ">
        <VendorInsights />
      </div>
      <div className="grid md:grid-cols-2 my-4 pb-5 w-full gap-4 px-4">
        <div className="flex-1 min-w-[300px]">
          <Sales />
        </div>
        <div className="flex-1 min-w-[300px]">
          <Units />
        </div>
        <div className="flex-1 min-w-[300px]">
          <Order />
        </div>
        <div className="flex-1 min-w-[300px]">
          <OrdersCustomersChart />
        </div>
      </div>

      <div>
        <BestProductsOverview />
      </div>
    </div>
  );
};

export default Dashboard;
