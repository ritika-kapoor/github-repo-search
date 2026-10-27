export interface Repo {
    id: number;
    full_name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

export interface SearchResponse {
    total_count: number;
    items: Repo[];
}

export type SortOption = "best-match" | "stars" | "forks" | "updated";

export const PER_PAGE = 10; // number of repos per page

export const MAX_RESULTS = 1000; // GitHub only returns the first 1000 results

export async function searchRepos(query: string, page: number, sort: SortOption): Promise<SearchResponse> {
    const params = new URLSearchParams({
        q: query,
        page: String(page),
        per_page: String(PER_PAGE),
    });

    if (sort !== "best-match") {
        params.set("sort", sort);
        params.set("order", "desc");
    }

    const res = await fetch(`https://api.github.com/search/repositories?${params}`);

    if (res.status === 403) {
        throw new Error("Rate limit reached. Please wait a minute and try again.");
    }
    if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
    }

    return res.json();
}
