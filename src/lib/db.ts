export interface DataInventoryRecord {
  id: number;
  dataName: string;
  dataCategory: string;
  collectionPurpose: string;
  storageLocation: string;
  retentionPeriod?: string;
  accessLevel?: string;
  createdAt: string;
}

export interface PrivacyRiskRecord {
  id: number;
  riskName: string;
  description?: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  riskLevel: string;
  mitigation?: string;
  status: string;
  createdAt: string;
}

export interface ConsentRecord {
  id: number;
  dataSubject: string;
  purpose: string;
  consentStatus: string;
  consentDate?: string;
  createdAt: string;
}

export interface PrivacyIncidentRecord {
  id: number;
  incidentTitle: string;
  description?: string;
  severity: string;
  incidentDate?: string;
  status: string;
  correctiveAction?: string;
  createdAt: string;
}

export interface DashboardStats {
  total_records: number;
  total_risks: number;
  open_incidents: number;
  consent_records: number;
}

// MOCKED — in-memory data store replacing SQLite (data lost on container sleep)
const dataInventory: DataInventoryRecord[] = [];
const privacyRisks: PrivacyRiskRecord[] = [];
const consentRecords: ConsentRecord[] = [];
const privacyIncidents: PrivacyIncidentRecord[] = [];

export function initializeDatabase(): void {
  // In-memory arrays are ready on module initialization
}

export function getDashboardStats(): DashboardStats {
  initializeDatabase();

  return {
    total_records: dataInventory.length,
    total_risks: privacyRisks.length,
    open_incidents: privacyIncidents.filter((item) => item.status === "Open").length,
    consent_records: consentRecords.length,
  };
}
