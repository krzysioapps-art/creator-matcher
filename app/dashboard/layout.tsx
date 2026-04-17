// app/dashboard/layout.tsx
import DashboardSidebar from "@/components/dashboard/Sidebar"
import DashboardHeader from "@/components/dashboard/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50/30">
      {/* HEADER - fixed at top */}
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - fixed, no scroll */}
        <DashboardSidebar />
        
        {/* MAIN CONTENT - scrollable */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  )
}