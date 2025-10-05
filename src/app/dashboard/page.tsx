"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  DollarSign,
  Download,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import OverviewTab from "./OverviewTab";

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 40000, profit: 27000 },
  { month: "Jul", revenue: 72000, expenses: 42000, profit: 30000 },
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
  const [searchQuery, setSearchQuery] = useState("");

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
            <OverviewTab recentSales={recentSales} revenueData={revenueData} />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales Transactions</CardTitle>
                    <CardDescription>
                      Complete list of all sales and invoices
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search sales..."
                        className="pl-9 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.items}</TableCell>
                        <TableCell className="font-bold text-emerald-600">
                          ${sale.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sale.status === "Completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              sale.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : ""
                            }
                          >
                            {sale.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inventory Management</CardTitle>
                    <CardDescription>
                      Track and manage your product inventory
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        className="pl-9 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{item.stock}</p>
                            <Progress
                              value={(item.stock / item.reorderLevel) * 50}
                              className="h-1.5 w-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{item.reorderLevel}</TableCell>
                        <TableCell className="font-medium">
                          ${item.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "In Stock"
                                ? "default"
                                : item.status === "Low Stock"
                                ? "secondary"
                                : "destructive"
                            }
                            className={
                              item.status === "In Stock"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : item.status === "Low Stock"
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                : ""
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Low Stock Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                    8
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Items below reorder level
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-rose-900 dark:text-rose-100">
                    Critical Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-rose-900 dark:text-rose-100">
                    4
                  </div>
                  <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">
                    Items require immediate attention
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    Well Stocked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                    344
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                    Items with healthy stock levels
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Monthly sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        fill="#059669"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="expenses"
                        fill="#6b7280"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Profit Margin</CardTitle>
                  <CardDescription>Monthly profit analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key business indicators and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Average Order Value
                    </p>
                    <p className="text-2xl font-bold">$2,456</p>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">8.2%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Conversion Rate
                    </p>
                    <p className="text-2xl font-bold">3.24%</p>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">
                        12.5%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Customer Retention
                    </p>
                    <p className="text-2xl font-bold">87.5%</p>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">5.3%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Inventory Turnover
                    </p>
                    <p className="text-2xl font-bold">4.2x</p>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowDownRight className="h-4 w-4 text-rose-600" />
                      <span className="text-rose-600 font-medium">2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
