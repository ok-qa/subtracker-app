import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const SearchByName = () => {
  const {
    searchName: { searchValue, debouncedSearchValue },
    setSearchName,
    handleSearch,
  } = useSubscriptions();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchName({ searchValue, debouncedSearchValue: searchValue });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, setSearchName]);

  useEffect(() => {
    if (handleSearch) {
      handleSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, handleSearch]);

  return (
    <Box>
      <Typography
        sx={{
          color: "#64748B",
          fontWeight: 700,
          fontSize: "0.9rem",
          textTransform: "uppercase",
        }}
      >
        Search by Name
      </Typography>
      <TextField
        fullWidth
        placeholder="Search..."
        value={searchValue}
        onChange={(e) =>
          setSearchName({
            searchValue: e.target.value,
            debouncedSearchValue: searchValue,
          })
        }
        sx={{ mt: 1 }}
        //   error={!name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#64748B" }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setSearchName({
                    searchValue: "",
                    debouncedSearchValue: "",
                  });
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchByName;
