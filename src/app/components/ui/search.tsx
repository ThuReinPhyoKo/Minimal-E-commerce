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
        sx={{
          flex: 1,
          "& .MuiInputBase-root": {
            height: "48px", // match h-12
            background: "transparent",
            color: "#d1d5db", // text-gray-300
            paddingLeft: "8px",
          },
          "& .MuiAutocomplete-listbox": {
            backgroundColor: "#1D4ED8", // dropdown background blue
            color: "#fff",
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
