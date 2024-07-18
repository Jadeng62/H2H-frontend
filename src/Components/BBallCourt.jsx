import { useEffect, useState } from 'react';

const URL = import.meta.env.VITE_BASE_URL;

const BBallCourt = () => {
  const [data, setData] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/bball`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching basketball court data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCourtChange = (event) => {
    const courtId = event.target.value;
    const selected = data.find((court) => court.Prop_ID === courtId);
    setSelectedCourt(selected);
  };

  return (
    <div className='bg-white'>
      <div>
        <select onChange={handleCourtChange}>
          <option value="">Select a basketball court</option>
          {data && data.map((court, index) => (
            <option key={index} value={court.Prop_ID}>
              {court.Name}
            </option>
          ))}
        </select>
      </div>
      {selectedCourt && (
        <div>
          {/* <h2>{selectedCourt.Name}</h2> */}
          <p><strong>Location:</strong> {selectedCourt.Location}</p>
          {/* maybe add google map since api also gives logitude and latitude values */}
        </div>
      )}
    </div>
  );
};

export default BBallCourt;
