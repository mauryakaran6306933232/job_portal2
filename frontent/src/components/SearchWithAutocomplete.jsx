import { API_V1 } from '../utils/constant';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserSlice } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Clock, X, TrendingUp } from 'lucide-react';
import { debounce } from 'lodash';

export default function SearchWithAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector(store => store?.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = debounce(async (searchText) => {
    if (searchText.trim().length < 2) { setSuggestions([]); return; }
    try {
      const res = await axios.get(`${API_V1}/job/autocomplete?query=${searchText}`, { withCredentials: true });
      if (res.data.success) setSuggestions(res.data.suggestions);
    } catch (error) {
      console.log("Autocomplete error:", error);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    fetchSuggestions(value);
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.post(`${API_V1}/user/save-search`, { searchQuery }, { withCredentials: true });
      if (res.data.success && user) {
        let updatedSearches = user.recentSearches.filter(s => s !== searchQuery);
        updatedSearches.push(searchQuery);
        if (updatedSearches.length > 5) updatedSearches.shift();
        dispatch(setUserSlice({ ...user, recentSearches: updatedSearches }));
      }
    } catch (error) {
      console.log("Save search error:", error);
    }
    navigate(`/browse?keyword=${searchQuery}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      <div className='flex shadow-lg rounded-full overflow-hidden border border-gray-200 bg-white'>
        <div className='flex-1 flex items-center pl-4 sm:pl-6'>
          <Search className='text-gray-400 mr-2 sm:mr-3 shrink-0' size={20} />
          <input
            type="text"
            placeholder="Search by title, skill..."
            className='w-full py-3 sm:py-4 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base'
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleSearch(); }}
          />
        </div>
        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] rounded-none rounded-r-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shrink-0" onClick={() => handleSearch()}>
          Search
        </Button>
      </div>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {user?.recentSearches?.length > 0 && query.length === 0 && (
            <div className="p-3 border-b">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Recent</p>
              {user.recentSearches.slice().reverse().map((search, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group" onClick={() => { setQuery(search); handleSearch(search); }}>
                  <div className="flex items-center gap-2 text-gray-700 text-sm"><Clock size={14} className="text-gray-400" /> {search}</div>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
          {suggestions.length > 0 && query.length > 0 && (
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Suggestions</p>
              {suggestions.map((suggestion, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 hover:bg-indigo-50 rounded-lg cursor-pointer" onClick={() => { setQuery(suggestion); handleSearch(suggestion); }}>
                  <TrendingUp size={14} className="text-indigo-500" /> {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}