import { useState } from "react";
import type { FormEvent } from "react";
import type { SortOption } from "../api/github";

interface Props {
    sort: SortOption;
    onSearch: (query: string) => void;
    onSortChange: (sort: SortOption) => void;
}

function SearchBar({ sort, onSearch, onSortChange }: Props) {
    const [text, setText] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (text.trim()) {
            onSearch(text.trim());
        }
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search repositories, e.g. react"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)}>
                <option value="best-match">Best match</option>
                <option value="stars">Most stars</option>
                <option value="forks">Most forks</option>
                <option value="updated">Recently updated</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
