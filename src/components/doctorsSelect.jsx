import React, { useState } from 'react';

// Destructure the required props: doctors, selectedDoctor, and onSelect
function DoctorSelect({ doctors, selectedDoctor, onSelect,withImg }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle clicking an option
  const handleOptionClick = (doctor) => {
    onSelect(doctor); // Call the function passed from the parent
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (

    <div className="input-container">

      <label htmlFor="">Doctor</label>
      <button 
        type="button" 
        className="special w-full flex items-center justify-between p-3 
                   bg-[#242424] border border-gray-700 rounded-lg 
                   focus:ring-2 focus:ring-green-500"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center gap-2">
        {
            withImg && (
                     <img className='img' src="src/assets/searchIcon.png" alt="full name" />
            )
        }

          
          <div className="flex items-center gap-2 selected-doctor-container">

                       <img 
              src={selectedDoctor.imgUrl} 
              alt={selectedDoctor.name} 
              className="w-7 h-7 rounded-full object-cover"
            />
              {selectedDoctor.name}
          </div>
        </div>
        
        
     <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 0.75L7.45711 6.04289C7.06658 6.43342 6.43342 6.43342 6.04289 6.04289L0.75 0.750001" stroke="#B6F09C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </button>

      {isDropdownOpen && (
        <div 
          className="absolute z-10 mt-1 w-full rounded-lg shadow-lg 
                     bg-[#242424] border border-gray-700 max-h-60 overflow-y-auto"
        >
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`flex items-center gap-3 p-3 cursor-pointer mb-3 transition-colors
                          ${doctor.id === selectedDoctor.id ? 'bg-gray-700 text-green-400' : 'hover:bg-gray-700 text-white'}`}
              onClick={() => handleOptionClick(doctor)}
            >
              <img 
                src={doctor.imgUrl} 
                alt={doctor.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorSelect;