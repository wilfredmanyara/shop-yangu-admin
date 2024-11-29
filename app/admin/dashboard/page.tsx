"use client";

import CardDataStats from "@/components/CardStats";
import StockStatusDistribution from "@/components/StockStatusDistribution";
import TopShopsByStock from "@/components/TopShopsByStock";
import React, { useEffect, useState } from "react";
import { FaStore, FaCube, FaDollarSign, FaBox } from "react-icons/fa";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalShops: 0,
    totalProducts: 0,
    totalValue: 0,
    totalStock: 0,
  });

  useEffect(() => {
    fetch("/api/metrics")
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error("Error fetching metrics:", error));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        <CardDataStats
          title="Total Shops"
          total={metrics.totalShops}
          rate="+12%"
          levelUp
          icon={FaStore}
        />
        <CardDataStats
          title="Total Products"
          total={metrics.totalProducts}
          rate="-5%"
          levelDown
          icon={FaCube}
        />
        <CardDataStats
          title="Total Value"
          total={`$${metrics.totalValue.toFixed(2)}`}
          rate="+10%"
          levelUp
          icon={FaDollarSign}
        />
        <CardDataStats
          title="Total Stock"
          total={metrics.totalStock}
          rate="0%"
          icon={FaBox}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1">
          <StockStatusDistribution />
        </div>

        <div className="col-span-1">
          <TopShopsByStock />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
