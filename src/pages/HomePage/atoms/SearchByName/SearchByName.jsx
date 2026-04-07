import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const SearchByName = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
    setDebouncedSearchValue,
    handleSearch,
  } = useSubscriptions();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, setDebouncedSearchValue]);

  useEffect(() => {
    if (handleSearch) {
      handleSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, handleSearch]);

  return (
    <TextField
      fullWidth
      label="Search by Name"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      sx={{ mt: 3 }}
      //   error={!name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setSearchValue("");
                handleSearch("");
              }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchByName;
