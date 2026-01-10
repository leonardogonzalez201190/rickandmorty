import { useApi } from "../context/ApiContext";

const GENDERS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Genderless", value: "genderless" },
    { label: "Unknown", value: "unknown" },
];

const SPECIES = [
    { label: "Human", value: "human" },
    { label: "Humanoid", value: "humanoid" },
    { label: "Alien", value: "alien" },
    { label: "Animal", value: "animal" },
    { label: "Robot", value: "robot" },
    { label: "Mythological", value: "mythological creature" },
    { label: "Unknown", value: "unknown" },
];

const STATUS = [
    { label: "Alive", value: "alive" },
    { label: "Dead", value: "dead" },
    { label: "Unknown", value: "unknown" },
];


export function Filters() {
    
    const { queryParams, updateQueryParams } = useApi();

    return (
        <div className="filters__selects">
            <select name="gender" value={queryParams.gender} onChange={(e) => updateQueryParams({ gender: e.target.value, page: 1 })}>
                <option value="">All Gender</option>
                {GENDERS.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                        {gender.label}
                    </option>
                ))}
            </select>
            <select name="species" value={queryParams.species} onChange={(e) => updateQueryParams({ species: e.target.value, page: 1 })}>
                <option value="">All Species</option>
                {SPECIES.map((species) => (
                    <option key={species.value} value={species.value}>
                        {species.label}
                    </option>
                ))}
            </select>
            <select name="status" value={queryParams.status} onChange={(e) => updateQueryParams({ status: e.target.value, page: 1 })}>
                <option value="">All Status</option>
                {STATUS.map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))}
            </select>
            <select name="sort" value={queryParams.sort} onChange={(e) => updateQueryParams({ sort: e.target.value })}>
                <option value="">Sort</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </div>
    )
}