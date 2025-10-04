"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Download,
  Package,
  Plus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 40000, profit: 27000 },
  { month: "Jul", revenue: 72000, expenses: 42000, profit: 30000 },
];

const salesByCategory = [
  { name: "Electronics", value: 35, amount: 125000 },
  { name: "Furniture", value: 25, amount: 89000 },
  { name: "Office Supplies", value: 20, amount: 71000 },
  { name: "Equipment", value: 15, amount: 53000 },
  { name: "Other", value: 5, amount: 18000 },
];

const inventoryData = [
  {
    id: "PRD-001",
    name: "Wireless Mouse",
    category: "Electronics",
    stock: 145,
    reorderLevel: 50,
    price: 29.99,
    status: "In Stock",
    lastUpdated: "2025-04-08",
  },
  {
    id: "PRD-002",
    name: "Office Chair",
    category: "Furniture",
    stock: 23,
    reorderLevel: 25,
    price: 249.99,
    status: "Low Stock",
    lastUpdated: "2025-04-07",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    category: "Office Supplies",
    stock: 8,
    reorderLevel: 20,
    price: 49.99,
    status: "Critical",
    lastUpdated: "2025-04-09",
  },
  {
    id: "PRD-004",
    name: "USB-C Hub",
    category: "Electronics",
    stock: 67,
    reorderLevel: 30,
    price: 39.99,
    status: "In Stock",
    lastUpdated: "2025-04-08",
  },
  {
    id: "PRD-005",
    name: "Desk Lamp",
    category: "Office Supplies",
    stock: 12,
    reorderLevel: 15,
    price: 34.99,
    status: "Low Stock",
    lastUpdated: "2025-04-06",
  },
];

const recentSales = [
  {
    id: "INV-1234",
    customer: "Acme Corporation",
    amount: 2450.0,
    items: 12,
    date: "2025-04-09",
    status: "Completed",
  },
  {
    id: "INV-1235",
    customer: "TechStart Inc",
    amount: 1890.5,
    items: 8,
    date: "2025-04-09",
    status: "Completed",
  },
  {
    id: "INV-1236",
    customer: "Global Solutions",
    amount: 3200.0,
    items: 15,
    date: "2025-04-08",
    status: "Pending",
  },
  {
    id: "INV-1237",
    customer: "Innovation Labs",
    amount: 1560.75,
    items: 6,
    date: "2025-04-08",
    status: "Completed",
  },
  {
    id: "INV-1238",
    customer: "Future Enterprises",
    amount: 4100.0,
    items: 20,
    date: "2025-04-07",
    status: "Completed",
  },
];

const topProducts = [
  { name: "Wireless Mouse", sold: 234, revenue: 7014.66, trend: 12 },
  { name: "USB-C Hub", sold: 189, revenue: 7558.11, trend: 8 },
  { name: "Office Chair", sold: 156, revenue: 38998.44, trend: -3 },
  { name: "Desk Lamp", sold: 142, revenue: 4968.58, trend: 15 },
  { name: "Laptop Stand", sold: 128, revenue: 6398.72, trend: 5 },
];

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1 mt-2">
          <TrendIcon
            className={`h-4 w-4 ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  useEffect(() => {
    document.title = "Business Dashboard - Inventory & Sales Management";
  }, []);

  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Business Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Inventory & Sales Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Today</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Sale</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Revenue"
            value="$72,450"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Total Sales"
            value="1,234"
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Inventory Items"
            value="356"
            change="-2.4%"
            icon={Package}
            trend="down"
          />
          <StatCard
            title="Low Stock Alerts"
            value="12"
            change="+3"
            icon={AlertTriangle}
            trend="down"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-background"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                className="data-[state=active]:bg-background"
              >
                Sales
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-background"
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-background"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="overview" className="space-y-6">

          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
