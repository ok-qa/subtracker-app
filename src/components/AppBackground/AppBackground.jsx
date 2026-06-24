import { Box, useTheme } from "@mui/material";

function AppBackground({ children, childrenWrapperStyles, isAuth }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const bgFrom = isDark ? "#0B1020" : "#EEF2FF";
  const bgTo = isDark ? "#0F1530" : "#F5F7FB";
  const auroraA = isDark ? "rgba(99,102,241,0.28)" : "rgba(99,102,241,0.18)";
  const auroraB = isDark ? "rgba(56,189,248,0.18)" : "rgba(56,189,248,0.14)";
  const dotColor = isDark ? "rgba(230,233,245,0.03)" : "rgba(15,23,42,0.03)";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowY: "auto",
        background: `linear-gradient(180deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      }}
    >
      {isAuth && (
        <>
          {/* Aurora blob 1 — indigo, top-left */}

          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: "-15%",
              left: "-10%",
              width: 520,
              height: 520,
              borderRadius: "50%",
              filter: "blur(80px)",
              backgroundColor: auroraA,
              pointerEvents: "none",
            }}
          />
          {/* Aurora blob 2 — cyan, bottom-right */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              bottom: "-20%",
              right: "-10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              filter: "blur(90px)",
              backgroundColor: auroraB,
              pointerEvents: "none",
            }}
          />
          {/* Subtle dot grid */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              pointerEvents: "none",
              backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </>
      )}

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...childrenWrapperStyles,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AppBackground;
