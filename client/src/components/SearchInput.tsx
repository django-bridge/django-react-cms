import { Close, Search } from "@mui/icons-material";
import Input from "@mui/joy/Input";
import { SxProps } from "@mui/joy/styles/types";

export interface SearchInputProps {
  sx?: SxProps
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function SearchInput({ sx, searchValue, setSearchValue }: SearchInputProps) {
  return <Input
    sx={sx}
    startDecorator={<Search />}
    endDecorator={searchValue && <Close sx={{"&:hover": {"cursor": "pointer"}}} onClick={() => setSearchValue("")} />}
    placeholder="Search"
    value={searchValue}
    onChange={e => setSearchValue(e.target.value)} />;
}
