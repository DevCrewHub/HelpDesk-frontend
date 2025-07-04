
const RequirementItem = ({ isMet, text }) => (
  <div className={`flex items-center text-xs ${isMet ? 'text-green-600' : 'text-red-500'}`}>
    <span className="mr-1">{isMet ? '✓' : '✗'}</span>
    {text}
  </div>
);

const PasswordRequirements = ({ requirements }) => {
  if (!requirements) return null;

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
      <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
      <div className="space-y-1">
        <RequirementItem isMet={requirements.minLength} text="At least 8 characters" />
        <RequirementItem isMet={requirements.hasUpperCase} text="One uppercase letter" />
        <RequirementItem isMet={requirements.hasLowerCase} text="One lowercase letter" />
        <RequirementItem isMet={requirements.hasNumbers} text="One number" />
        <RequirementItem isMet={requirements.hasSpecialChar} text="One special character" />
      </div>
    </div>
  );
};

export default PasswordRequirements;
