import { useApi } from "../context/ApiContext";
import { debounce } from "../utils/debounce";


export function Header() {
    
    const { updateQueryParams } = useApi();

    const clearAllFilters = () => {
        updateQueryParams({
            page: 1,
            name: "",
            sort: "none",
            status: "",
            species: "",
            gender: "",
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQueryParams({
            page: 1,
            name: e.target.value,
            sort: "none",
            status: "",
            species: "",
            gender: "",
        });
    };  

    return (
        <nav className="header__nav">
            <h1 className="header__title">Rick and Morty</h1>
            <input type="search" placeholder="Search" autoFocus={true} onChange={debounce(handleSearch, 500)} />
            <button onClick={clearAllFilters}>Clear All</button>
        </nav>
    )
}