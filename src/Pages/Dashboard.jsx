import React from "react";
import { Sales } from "./Dashboard/Sales(Line)";
import { Units } from "./Dashboard/Units(Line)";
import { Order } from "./Dashboard/Order(Doughnut)";

const Dashboard = () => {
  return (
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
    </div>
  );
};

export default Dashboard;
