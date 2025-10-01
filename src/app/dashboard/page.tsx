"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Download,
  Package,
  Plus,
  TrendingDown,
  TrendingUp
} from "lucide-react"
import { useEffect } from "react"

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => {
  const isPositive = trend === "up"
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1 mt-2">
          <TrendIcon className={`h-4 w-4 ${isPositive ? "text-emerald-600" : "text-rose-600"}`} />
          <span className={`text-sm font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>{change}</span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  useEffect(() => {
    document.title = "Business Dashboard - Inventory & Sales Management"
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Business Dashboard</h1>
              <p className="text-xs text-muted-foreground">Inventory & Sales Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Today</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Sale</span>
            </Button>
          </div>
        </div>
      </header>

    </div>
  )
}
