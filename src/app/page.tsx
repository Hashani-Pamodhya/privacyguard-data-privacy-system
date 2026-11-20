import Link from "next/link";
import { getDashboardStats } from "@/lib/db";

export default function DashboardPage() {
  const stats = getDashboardStats();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 sidebar">
          <h3 className="brand">PrivacyGuard</h3>

          <Link href="/" className="nav-link active">
            Dashboard
          </Link>
          <a href="#" className="nav-link">
            Data Inventory
          </a>
          <a href="#" className="nav-link">
            Risk Assessment
          </a>
          <a href="#" className="nav-link">
            Consent Management
          </a>
          <a href="#" className="nav-link">
            Privacy Incidents
          </a>
          <a href="#" className="nav-link">
            Reports
          </a>
        </nav>

        {/* Main Content */}
        <main className="col-md-10 main-content">
          <h2>Privacy Dashboard</h2>

          <p className="text-muted">
            Monitor and manage your organization&apos;s data privacy activities.
          </p>

          {/* Summary Cards */}
          <div className="row mt-4">
            <div className="col-md-3 mb-3">
              <div className="stat-card">
                <h6>Personal Data Records</h6>
                <h2>{stats.total_records}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="stat-card">
                <h6>Privacy Risks</h6>
                <h2>{stats.total_risks}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="stat-card">
                <h6>Open Incidents</h6>
                <h2>{stats.open_incidents}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="stat-card">
                <h6>Consent Records</h6>
                <h2>{stats.consent_records}</h2>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="welcome-card mt-4">
            <h4>Welcome to PrivacyGuard!</h4>
            <p>
              Manage personal information, assess privacy risks, monitor
              incidents, and support data protection activities from one place.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
