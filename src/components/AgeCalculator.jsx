import { useState } from 'react';
import '../components/AgeCalculator.css';
import { Calendar, Info } from 'lucide-react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDateObj = new Date(birthDateString);
    
    if (birthDateObj > today) {
      setError('Birth date cannot be in the future');
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDateObj.getDate());
      days += Math.floor((today - prevMonth) / (1000 * 60 * 60 * 24));
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birthDateObj) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: calculateNextBirthday(birthDateObj, today)
    });
    setError('');
    setShowDetails(true);
  };

  const calculateNextBirthday = (birthDate, today) => {
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!birthDate) {
      setError('Please enter a birth date');
      return;
    }
    calculateAge(birthDate);
  };

  return (
    <div className="age-calculator-container">
      <div className="calculator-header">
        <Calendar className="w-6 h-6 text-gradient" />
        <h1 className="calculator-title">Advanced Age Calculator</h1>
      </div>

      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label htmlFor="birthdate" className="form-label">
            Enter Your Birth Date
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="date-input"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="calculate-button"
        >
          Calculate Age
        </button>
      </form>

      {age && (
        <div className={`results-container ${showDetails ? 'visible' : ''}`}>
          <div className="detail-stats">
            <div className="stats-header">
              <h2 className="stats-title">Your Age Breakdown</h2>
            </div>
            <div className="results-grid">
              <div className="result-card">
                <div className="result-value">{age.years}</div>
                <div className="result-label">Years</div>
              </div>
              <div className="result-card">
                <div className="result-value">{age.months}</div>
                <div className="result-label">Months</div>
              </div>
              <div className="result-card">
                <div className="result-value">{age.days}</div>
                <div className="result-label">Days</div>
              </div>
            </div>
          </div>

          <div className="detail-stats">
            <div className="stats-header">
              <Info className="w-5 h-5 text-gradient" />
              <h2 className="stats-title">Detailed Statistics</h2>
            </div>
            <div className="results-grid">
              <div className="result-card">
                <div className="result-value">{age.totalMonths}</div>
                <div className="result-label">Total Months</div>
              </div>
              <div className="result-card">
                <div className="result-value">{age.totalWeeks}</div>
                <div className="result-label">Total Weeks</div>
              </div>
              <div className="result-card">
                <div className="result-value">{age.totalDays}</div>
                <div className="result-label">Total Days</div>
              </div>
              <div className="result-card">
                <div className="result-value">{age.nextBirthday}</div>
                <div className="result-label">Days to Birthday</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;