import { useEffect, useState } from "react";
import { searchRepos, PER_PAGE, MAX_RESULTS } from "./api/github";
import type { Repo, SortOption } from "./api/github";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import Pagination from "./components/Pagination";

function App() {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<SortOption>("best-match");
    const [page, setPage] = useState(1);

    const [repos, setRepos] = useState<Repo[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;

        async function loadRepos() {
            setLoading(true);
            setError("");
            try {
                const data = await searchRepos(query, page, sort);
                setRepos(data.items);
                setTotalCount(data.total_count);
            } catch (err) {
                setError((err as Error).message);
                setRepos([]);
            }
            setLoading(false);
        }

        loadRepos();
    }, [query, page, sort]);

    function handleSearch(newQuery: string) {
        setQuery(newQuery);
        setPage(1);
    }

    function handleSortChange(newSort: SortOption) {
        setSort(newSort);
        setPage(1);
    }

    const totalPages = Math.ceil(Math.min(totalCount, MAX_RESULTS) / PER_PAGE);

    return (
        <div className="container">
            <h1>GitHub Repositories Search</h1>

            <SearchBar sort={sort} onSearch={handleSearch} onSortChange={handleSortChange} />

            {loading && <p className="message">Loading...</p>}
            {error && <p className="message error">{error}</p>}

            {!loading && query && repos.length === 0 && !error && (
                <p className="message">No repositories found.</p>
            )}

            {!loading && repos.length > 0 && (
                <>
                    <p>{totalCount} repositories found</p>
                    <ul className="repo-list">
                        {repos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </ul>
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
}

export default App;
