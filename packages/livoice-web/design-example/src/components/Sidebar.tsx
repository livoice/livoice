import { Home, Settings, Users, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r-2 border-slate-200">
      {/* Logo */}
      <div className="p-6 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <LayoutDashboard className="size-6 text-white" />
          </div>
          <span className="font-semibold text-slate-900">MyApp</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-900 border-l-4 border-violet-600 hover:bg-slate-200 transition-all"
            >
              <Home className="size-5" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 border-l-4 border-transparent hover:bg-slate-100 hover:border-indigo-400 hover:text-slate-900 transition-all"
            >
              <Users className="size-5" />
              <span>Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 border-l-4 border-transparent hover:bg-slate-100 hover:border-indigo-400 hover:text-slate-900 transition-all"
            >
              <Settings className="size-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}