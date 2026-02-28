// AppAutocomplete.tsx
import { Autocomplete, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { AutocompleteProps } from "@mui/material/Autocomplete";

type AppAutocompleteProps = Omit<
  AutocompleteProps<string, false, false, true>, // freeSolo = true
  "renderInput"
>;

export default function AppAutocomplete(props: AppAutocompleteProps) {


  return (
    <div
      id="search-bar"
      className="bg-black/40 backdrop-blur-md border border-white/10 w-96 h-12 rounded-full flex items-center"
    >
      <Search className="text-gray-300 ml-5" />

      <Autocomplete
        {...props}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#424242", // dark background for dropdown
              color: "#eeeeee", // light text color
            }
          },
          listbox: {
            sx: {
              "& .MuiAutocomplete-option": {
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2) ", // hover color for options
                }
              },
              "& .MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.2) ", // focused option color
              },
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#757575",
                borderRadius: "4px",
              }
            }
          }
        }}
        sx={{
          flex: 1,
          "& .MuiInputBase-root": {
            height: "48px", // match h-12
            background: "transparent",
            color: "#eeeeee",
            paddingLeft: "8px",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "#eeeeee",
          },
          "& fieldset": {
            border: "none", // remove MUI’s default border
          },
        }}
        autoComplete
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search products..."
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
