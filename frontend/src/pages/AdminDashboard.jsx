import React, { useContext ,useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
export default function AdminDashboardPage() {
  const { user } = useContext(AuthContext);

  // --- NEW STATE FOR SCHEDULING ---
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [scheduleResult, setScheduleResult] = useState({ message: null, type: null });
  const [error,setError]=useState(false); // type: 'success' or 'danger'
  // --- END NEW STATE ---

  // Helper to reset the result message after a delay
  const clearResult = () => {
    setTimeout(() => setScheduleResult({ message: null, type: null }), 6000);
  };

  // --- NEW HANDLER ---
  async function handleScheduleTrigger(e) {
    e.preventDefault();
    if (!scheduleDate) {
      setScheduleResult({ message: "Please select a date.", type: 'danger' });
      clearResult();
      return;
    }

    setScheduling(true);
    setScheduleResult({ message: "Triggering scheduling...", type: 'info' });
    setError(null);

    try {
      // API call: POST /admin/run?date=YYYY-MM-DD
      const response = await api.post(`/admin/scheduling/run?date=${scheduleDate}`);

      setScheduleResult({
        message: response.data,
        type: 'success'
      });
    } catch (err) {
      console.error("Scheduling API Error:", err);

      // Handle backend returning 500 with a body
      const errorMessage = err.response?.data || err.message || "Unknown error occurred.";

      setScheduleResult({
        message: `Scheduling Failed: ${errorMessage}`,
        type: 'danger'
      });
    } finally {
      setScheduling(false);
      clearResult();
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user && (
        <p className="lead">
          Welcome, <strong>{user.emailId || 'Admin'}</strong>!
        </p>
      )}

      <p>This is the central control panel. You can manage users, view system statistics, and access all administrative functions from here.</p>

      <hr /><div className="card mb-4 p-4 border-info">
        <h3 className="card-title text-info">Appointment Scheduling Runner</h3>
        <p className="card-text">Trigger the system to automatically schedule appointments for a specific date based on existing booking requests.</p>

        {/* Result Alert */}
        {scheduleResult.message && (
          <div className={`alert alert-${scheduleResult.type} mt-3`}>
            {scheduleResult.message}
          </div>
        )}

        <form onSubmit={handleScheduleTrigger} className="input-group mt-3" style={{ maxWidth: '400px' }}>
          <input
            type="date"
            className="form-control"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            required
            disabled={scheduling}
          />
          <button
            type="submit"
            className="btn btn-info"
            disabled={scheduling}
          >
            {scheduling ? 'Running...' : 'Run Scheduler'}
          </button>
        </form>
      </div>


      <h3>Admin Tools</h3>
      <div className="list-group">
        {/* These links are just examples. To make them work, you must:
          1. Create a component for each page (e.g., AdminDoctorsPage)
          2. Add the routes in your App.jsx (e.g., <Route path="admin/doctors" ... />)
        */}
        <Link
          to="/admin/employees"
          className="list-group-item list-group-item-action"
        >
          Manage Employees
        </Link>

        <Link
          to="/admin/appointments"
          className="list-group-item list-group-item-action"
        >
          View All Appointments
        </Link>
        <Link
          to="/admin/raw-materials"
          className="list-group-item list-group-item-action"
        >
          Manage Raw Materials
        </Link>
        <Link
          to="/admin/transactions"
          className="list-group-item list-group-item-action"
        >
          Manage Transactions
        </Link>
        <Link
          to="/admin/camps"
          className="list-group-item list-group-item-action"
        >
          Manage Camps
        </Link>
        <Link
          to="/admin/implants"
          className="list-group-item list-group-item-action"
        >
          Manage Implants
        </Link>
        <Link
          to="/admin/implant-business"
          className="list-group-item list-group-item-action"
        >
          Manage Implant Businesses
        </Link>
        <Link
          to="/admin/camp-employees"
          className="list-group-item list-group-item-action"
        >
          Manage Camp Employees
        </Link>
      </div>
    </div>
  );
}