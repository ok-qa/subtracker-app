import { Box, Chip, Typography } from "@mui/material";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const CategoryFilter = () => {
  const {
    categories: { categoriesData, categoryFilters },
    setCategories,
  } = useSubscriptions();

  const toggleCategory = (filterId) => {
    setCategories((prev) => ({
      ...prev,
      categoryFilters: prev.categoryFilters.includes(filterId)
        ? prev.categoryFilters.filter((id) => id !== filterId)
        : [...prev.categoryFilters, filterId],
    }));
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1,
          mt: 2,
          color: "#64748B",
          fontWeight: 700,
          fontSize: "0.9rem",
          textTransform: "uppercase",
        }}
      >
        Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {categoriesData.map((cat) => {
          const selected = categoryFilters.includes(cat.filterId);

          const getChipColor = (theme, selected) => {
            const isDarkMode = theme.palette.mode === "dark";

            if (isDarkMode) {
              return {
                color: selected ? "#6566ef" : "#64748B",
                borderColor: selected ? "#6566ef" : "#64748B",
                bgcolor: selected ? "#4e46e515" : "none",
              };
            }
            return {
              color: selected ? "#4F46E5" : "#64748B",
              borderColor: selected ? "#4F46E5" : "#64748B",
              bgcolor: selected ? "#4e46e515" : "none",
            };
          };

          return (
            <Chip
              key={cat.filterId}
              label={cat.name}
              sx={(theme) => ({
                fontWeight: 700,
                ...getChipColor(theme, selected),
              })}
              clickable
              variant="outlined"
              onClick={() => toggleCategory(cat.filterId)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default CategoryFilter;
