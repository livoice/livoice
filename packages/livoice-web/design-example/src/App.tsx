import { Sidebar } from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

const items = [
  {
    id: 1,
    title: "Project Alpha",
    description: "Complete the initial design mockups and gather feedback from the team.",
    status: "Active",
    date: "Dec 4, 2025"
  },
  {
    id: 2,
    title: "Marketing Campaign",
    description: "Launch the new social media campaign for Q1 2026.",
    status: "Pending",
    date: "Dec 3, 2025"
  },
  {
    id: 3,
    title: "Client Meeting",
    description: "Discuss project requirements and timeline with the new client.",
    status: "Active",
    date: "Dec 2, 2025"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review and approve pull requests from the development team.",
    status: "Completed",
    date: "Dec 1, 2025"
  },
  {
    id: 5,
    title: "Documentation Update",
    description: "Update API documentation with the latest endpoints and examples.",
    status: "Pending",
    date: "Nov 30, 2025"
  },
  {
    id: 6,
    title: "Team Workshop",
    description: "Organize a workshop on new development tools and best practices.",
    status: "Active",
    date: "Nov 29, 2025"
  }
];

export default function App() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1>Dashboard</h1>
              <p className="text-slate-500">Manage your items and tasks</p>
            </div>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
              <Input 
                placeholder="Search items..." 
                className="pl-10 bg-white border-slate-200 shadow-sm"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-xl border-2 border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-slate-200 hover:bg-transparent">
                  <TableHead className="text-slate-700">Title</TableHead>
                  <TableHead className="text-slate-700">Description</TableHead>
                  <TableHead className="text-slate-700">Status</TableHead>
                  <TableHead className="text-slate-700">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const statusColor = item.status === "Active" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-500" : "bg-gray-400";
                  
                  return (
                    <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0">
                      <TableCell className="text-slate-900">{item.title}</TableCell>
                      <TableCell className="text-slate-600">{item.description}</TableCell>
                      <TableCell>
                        <Badge className={statusColor}>{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">{item.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}