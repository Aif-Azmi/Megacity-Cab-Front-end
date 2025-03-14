import React, { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  CarIcon,
} from 'lucide-react';
import { useAuth } from '../Utils/AuthContext';

// Define libraries array as a constant outside the component
const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
};

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const BookingPage = () => {
  const location = useLocation();
  const selectedVehicle = location.state?.vehicle || null;
  const { user } = useAuth();

  const [pickupPlace, setPickupPlace] = useState('');
  const [dropPlace, setDropPlace] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  // Use the libraries constant in useLoadScript
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAe8qybKlyLJc7fAC3s-0NwUApOPYRILCs',
    libraries, // Pass the libraries constant here
  });

  const isPastDateTime = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime < currentDateTime;
  };

  const isPhoneNumberValid = (phone) => {
    return phone.length === 10;
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handlePickupChange = (e) => {
    setPickupPlace(e.target.value);
  };

  const handleDropChange = (e) => {
    setDropPlace(e.target.value);
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
      const distanceText = response.routes[0].legs[0].distance.text;
      const durationText = response.routes[0].legs[0].duration.text;
      setDistance(distanceText);
      setDuration(durationText);
      const distanceValue = response.routes[0].legs[0].distance.value / 1000;
      const calculatedFare = calculateFare(distanceValue);
      setEstimatedFare(calculatedFare);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPastDateTime(pickupDate, pickupTime)) {
      setError('Pickup date and time cannot be in the past.');
      return;
    }

    if (!isPhoneNumberValid(customerPhone)) {
      setError('Phone number must be exactly 10 characters long.');
      return;
    }

    if (!isEmailValid(customerEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (
      customerName &&
      customerEmail &&
      customerPhone &&
      pickupPlace &&
      dropPlace &&
      pickupDate &&
      pickupTime
    ) {
      const bookingData = {
        customerId: user.userId,
        customerName,
        customerEmail,
        customerPhone,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        pickupLocation: pickupPlace,
        dropOffLocation: dropPlace,
        rideStatus: 'PENDING',
        totalFare: estimatedFare || calculateFare(parseFloat(distance)),
        isActive: true,
        destination: dropPlace,
        isDriverAccepted: false,
        paymentStatus: 'UNPAID',
        vehicleId: selectedVehicle?.id || null,
      };

      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post(
          'http://localhost:8080/auth/createbooking',
          bookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookingStatus(
          'Booking successful! A driver will be assigned to you shortly.',
        );
        setError('');
      } catch (err) {
        setError('Failed to create booking. Please try again.');
        setBookingStatus('');
        console.error(err);
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  const calculateFare = (distanceInKm) => {
    const baseFare = 5.0;
    const ratePerKm = selectedVehicle?.pricePerKm || 2.0;
    return (baseFare + distanceInKm * ratePerKm).toFixed(2);
  };

  const onPickupLoad = (autocomplete) => {
    pickupAutocompleteRef.current = autocomplete;
  };

  const onDropLoad = (autocomplete) => {
    dropAutocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = (type) => {
    const autocomplete =
      type === 'pickup'
        ? pickupAutocompleteRef.current
        : dropAutocompleteRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        if (type === 'pickup') {
          setPickupPlace(place.formatted_address);
        } else {
          setDropPlace(place.formatted_address);
        }
      }
    }
  };

  if (loadError)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-red-600">
          Error loading maps. Please check your internet connection.
        </div>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl">Loading Maps...</div>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="lg:w-1/2 bg-white p-6 lg:p-8 rounded-2xl shadow-lg mb-6 lg:mb-0 lg:mr-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Ride</h1>
          <p className="text-gray-600 mt-2">
            Fast, reliable transportation at your fingertips
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" /> {/* Changed to blue */}
                Pickup Location
              </label>
              <Autocomplete
                onLoad={onPickupLoad}
                onPlaceChanged={() => onPlaceChanged('pickup')}
                options={{
                  componentRestrictions: { country: 'lk' },
                }}
              >
                <input
                  type="text"
                  value={pickupPlace}
                  onChange={handlePickupChange}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                />
              </Autocomplete>
            </div>
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" /> 
                Drop-off Location
              </label>
              <Autocomplete
                onLoad={onDropLoad}
                onPlaceChanged={() => onPlaceChanged('drop')}
                options={{
                  componentRestrictions: { country: 'lk' },
                }}
              >
                <input
                  type="text"
                  value={dropPlace}
                  onChange={handleDropChange}
                  placeholder="Enter drop-off location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                />
              </Autocomplete>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" /> 
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                />
                {pickupDate && pickupTime && isPastDateTime(pickupDate, pickupTime) && (
                  <p className="text-red-500 text-sm mt-1">
                    Pickup date and time cannot be in the past.
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <ClockIcon className="w-4 h-4 mr-2 text-blue-500" /> 
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">
              Customer Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              {customerEmail && !isEmailValid(customerEmail) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
              {customerPhone && !isPhoneNumberValid(customerPhone) && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number must be exactly 10 characters long.
                </p>
              )}
            </div>
          </div>
          {selectedVehicle && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <CarIcon className="w-5 h-5 mr-2 text-blue-500" /> 
                Selected Vehicle
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={selectedVehicle.vehicleImage}
                  alt={selectedVehicle.model}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    Model: <span className="font-semibold">{selectedVehicle.model}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Transmission: <span className="font-semibold">{selectedVehicle.transmission}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Fuel Type: <span className="font-semibold">{selectedVehicle.fuelType}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Price per km: <span className="font-semibold">LKR {selectedVehicle.pricePerKm}.00</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {(distance || duration || estimatedFare) && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <CarIcon className="w-5 h-5 mr-2 text-blue-500" /> 
                Ride Details
              </h3>
              <div className="space-y-2">
                {distance && (
                  <p className="text-sm text-gray-700">
                    Distance: <span className="font-semibold">{distance}</span>
                  </p>
                )}
                {duration && (
                  <p className="text-sm text-gray-700">
                    Duration: <span className="font-semibold">{duration}</span>
                  </p>
                )}
                {estimatedFare && (
                  <p className="text-sm text-gray-700">
                    Estimated Fare:{' '}
                    <span className="font-semibold">LKR {estimatedFare}</span>
                  </p>
                )}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center" 
          >
            Book Ride
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </form>
        {bookingStatus && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{bookingStatus}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
      <div className="lg:w-1/2 h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {pickupPlace && dropPlace && (
            <DirectionsService
              options={{
                destination: dropPlace,
                origin: pickupPlace,
                travelMode: 'DRIVING',
              }}
              callback={directionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: '#3B82F6', // Changed to blue
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default BookingPage;