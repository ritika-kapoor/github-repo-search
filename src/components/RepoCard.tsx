import type { Repo } from "../api/github";

interface Props {
    repo: Repo;
}

function RepoCard({ repo }: Props) {
    return (
        <li className="repo-card">
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
                <a href={repo.html_url} target="_blank">
                    {repo.full_name}
                </a>
                {repo.description && <p>{repo.description}</p>}
                <div className="repo-meta">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                    <span>Forks: {repo.forks_count}</span>
                </div>
            </div>
        </li>
    );
}

export default RepoCard;
