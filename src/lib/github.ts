import { Queries } from "@/types/github";

export const getPinnedRepos = async () => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    cache: "force-cache",
    body: JSON.stringify({
      query: `#graphql
{
  repositoryOwner(login: "${process.env.GITHUB_USER_NAME}") {
    ... on User {
      repos: pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            descriptionHTML
            forkCount
            homepageUrl
            id
            stargazerCount
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            url
          }
        }
      }

      gists: gists(first: 6, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          createdAt
          description
          id
          name
          stargazerCount
          url
          files {
            text
            name
          }
        }
      }
    }
  }
}
      `,
    }),
  });

  const data = (await res.json()) as {
    data: {
      repositoryOwner: {
        repos: Queries["repositoryOwner"]["pinnedItems"];
        gists: Queries["repositoryOwner"]["pinnedItems"];
      };
    };
  };

  return data;
};
